import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export function Recipients() {
  const [recipients, setRecipients] = useState<
    { name: string; email: string }[]
  >([]);
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStats, setUploadStats] = useState<{
    total: number;
    unique: number;
  } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitted) {
        e.preventDefault();
        e.returnValue = "Changes you made may not be saved.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, isSubmitted]);

  const isEmailDuplicate = (email: string) => {
    return recipients.some((r) => r.email === email);
  };

  const handleSubmitRecipient = () => {
    if (newRecipientName && newRecipientEmail) {
      if (isEmailDuplicate(newRecipientEmail)) {
        setErrorMessage(
          "Error: This email already exists in the recipients list."
        );
      } else {
        setRecipients([
          ...recipients,
          { name: newRecipientName, email: newRecipientEmail },
        ]);
        setNewRecipientName("");
        setNewRecipientEmail("");
        setErrorMessage("");
        setHasUnsavedChanges(true);
      }
    }
  };

  const parseSpreadsheet = (
    file: File
  ): Promise<{ name: string; email: string }[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as string[][];

        const headerRow = jsonData[0];
        const nameIndex = headerRow.findIndex((cell) => cell === "Name");
        const emailIndex = headerRow.findIndex((cell) => cell === "Email");

        if (nameIndex === -1 || emailIndex === -1) {
          reject(
            new Error(
              "Invalid spreadsheet format. Please use the sample format."
            )
          );
          return;
        }

        const parsedData = jsonData.slice(1).map((row) => ({
          name: row[nameIndex] || "",
          email: row[emailIndex] || "",
        }));

        resolve(parsedData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const parsedData = await parseSpreadsheet(file);
        const uniqueData = parsedData.reduce((acc, current) => {
          if (current.email && !isEmailDuplicate(current.email)) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [] as { name: string; email: string }[]);

        setRecipients([...recipients, ...uniqueData]);
        setUploadStats({
          total: parsedData.length,
          unique: uniqueData.length,
        });
        setHasUnsavedChanges(true);
      } catch (error) {
        console.error("Error parsing spreadsheet:", error);
        setErrorMessage("Error parsing spreadsheet. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = () => {
    sessionStorage.setItem("recipients", JSON.stringify(recipients));
    setHasUnsavedChanges(false);
    setIsSubmitted(true);
    setSaveStatus("Changes saved successfully!");
    setSaveStatus("");
    navigate("/finalize");
  };

  const handleDeleteRecipient = (index: number) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
    setHasUnsavedChanges(true);
  };

  const downloadSampleSheet = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Name: "John Doe", Email: "john@example.com" },
      { Name: "Jane Smith", Email: "jane@example.com" },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Recipients");
    XLSX.writeFile(wb, "Sample.xlsx");
  };

  const RecipientTable = () => (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Recipient Name</th>
          <th className="border p-2 text-left">Recipient Email</th>
          <th className="border p-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {recipients.map((recipient, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="border p-2">{recipient.name}</td>
            <td className="border p-2">{recipient.email}</td>
            <td className="border p-2">
              <Button
                variant="destructive"
                onClick={() => handleDeleteRecipient(index)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section className="w-full max-w-6xl mx-auto py-8 md:py-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Add Recipients</h2>
          <p className="text-muted-foreground">
            Choose how you'd like to add recipients to your campaign.
          </p>
        </div>
        <div className="flex space-x-4">
          {/* Left side - Manually */}
          <div className="w-1/2 border rounded-lg p-4 space-y-2">
            <div>
              <h3 className="font-semibold">Manually</h3>
              <p className="text-sm text-muted-foreground">
                Add recipients one by one
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Recipient Name"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                />
                <Input
                  placeholder="Recipient Email"
                  value={newRecipientEmail}
                  onChange={(e) => setNewRecipientEmail(e.target.value)}
                />
                <Button variant="ghost" onClick={handleSubmitRecipient}>
                  Submit
                </Button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
          </div>

          {/* Right side - Via Spreadsheet Upload */}
          <div className="w-1/2 border rounded-lg p-4 space-y-2">
            <div>
              <h3 className="font-semibold">Via Spreadsheet Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload a spreadsheet with recipient information
              </p>
            </div>
            <div className="flex space-x-2">
              {isUploading ? (
                <Button variant="ghost" disabled>
                  Uploading...
                </Button>
              ) : (
                <Button variant="outline" onClick={handleUploadClick}>
                  Upload sheet
                </Button>
              )}
              <Button variant="ghost" onClick={downloadSampleSheet}>
                Download Sample Sheet
              </Button>
            </div>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".csv,.xlsx,.xls"
            />
            <p className="text-sm text-muted-foreground">
              Accepted file types: .csv, .xlsx, .xls
            </p>
            {uploadStats && (
              <p className="text-sm text-muted-foreground">
                Uploaded {uploadStats.unique} unique entries out of{" "}
                {uploadStats.total} total entries.
              </p>
            )}
          </div>
        </div>

        {/* Combined Recipients Table */}
        {recipients.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Recipients List</h3>
            <RecipientTable />
          </div>
        )}

        {/* Save Status Message */}
        {saveStatus && (
          <div className="text-green-600 font-semibold mb-2">{saveStatus}</div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={recipients.length === 0}>
            Submit and Continue
          </Button>
        </div>
      </div>
    </section>
  );
}
