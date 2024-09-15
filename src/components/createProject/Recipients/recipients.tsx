import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import CertificatePreview from "@/components/editor/CertificatePreview";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type Recipient = {
  recipientName: string;
  recipientEmail: string;
};

export function Recipients() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageForSheet, setErrorMessageForSheet] = useState("");
  const [errorMessageForValidSheet, setErrorMessageForValidSheet] = useState("");
  const [uploadStats, setUploadStats] = useState<{ total: number; unique: number } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { projectId } = useParams();
  const { components } = useSelector((state: RootState) => state.project);
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

  const isEmailDuplicate = (recipientEmail: string) => {
    return recipients.some(r => r.recipientEmail.toLowerCase() === recipientEmail.toLowerCase());
  };

  const isValidEmail = (recipientEmail: string): boolean => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.[A-Za-z]{2,4}$/;
    return reg.test(recipientEmail);
  };

  const handleSubmitRecipient = () => {
    if (newRecipientName && newRecipientEmail) {
      if (isEmailDuplicate(newRecipientEmail)) {
        setErrorMessage("Error: This email already exists in the recipients list.");
      } else if (!isValidEmail(newRecipientEmail)) {
        setErrorMessage("Error: Recipient Email is not valid.");
      } else {
        setRecipients([
          ...recipients,
          {
            recipientName: newRecipientName,
            recipientEmail: newRecipientEmail,
          },
        ]);
        setNewRecipientName("");
        setNewRecipientEmail("");
        setErrorMessage("");
        setHasUnsavedChanges(true);
      }
    }
  };

  const parseSpreadsheet = (file: File): Promise<Recipient[]> => {
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
          recipientName: row[nameIndex] || "",
          recipientEmail: row[emailIndex] || "",
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
        const validUniqueData: Recipient[] = [];
        let duplicateCount = 0;
  
        // Create a Set of emails that are already in the recipients state
        const existingEmails = new Set(recipients.map(r => r.recipientEmail.toLowerCase()));
        let invalidcount = 0;
        parsedData.forEach(recipient => {
          const emailLower = recipient.recipientEmail.toLowerCase();
          if (!isValidEmail(emailLower)) {
            invalidcount=invalidcount+1;
            setErrorMessageForValidSheet(`Error: Email for  ${invalidcount} ${invalidcount>1?'recipients are' : 'recipient is'} not valid.`);
          } else if (existingEmails.has(emailLower)) {
            duplicateCount++;
          } else {
            validUniqueData.push(recipient);
            existingEmails.add(emailLower);  // Add new unique email to the Set
          }
        });
  
        setRecipients([...recipients, ...validUniqueData]);
        setUploadStats({
          total: parsedData.length,
          unique: validUniqueData.length,
        });
        setHasUnsavedChanges(true);
  
        if (duplicateCount > 0) {
          setErrorMessageForSheet(`Error: ${duplicateCount} duplicate entries were found and skipped.`);
        }
      } catch (error) {
        console.error("Error parsing spreadsheet:", error);
        setErrorMessage("Error parsing spreadsheet. Please try again.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      console.log(isUploading);
    }
  };
  
  

  const handleSubmit = () => {
    sessionStorage.setItem("recipients", JSON.stringify(recipients));
    setHasUnsavedChanges(false);
    setIsSubmitted(true);
    setSaveStatus("Changes saved successfully!");

    setTimeout(() => {
      setSaveStatus("");
      navigate(`/finalize/${projectId}`);
    }, 10);
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

  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
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
            <td className="border p-2">{recipient.recipientName}</td>
            <td className="border p-2">{recipient.recipientEmail}</td>
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

    const PreviewModal = () => (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
            onClick={closePreview}
          >
            <div
              className="bg-white rounded-lg relative overflow-hidden w-full h-full max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
              variant="ghost"
                onClick={closePreview}
                className="absolute top-4 right-4 text-black hover:text-gray-700 z-10"
              >
                ✕
              </Button>
              <div className="p-6 w-full h-full overflow-auto">
                <h3 className="text-xl font-bold mb-4">Preview</h3>
                <div className="border border-gray-300 rounded w-full h-[calc(100%-3rem)] overflow-auto flex justify-center align-center">
                  {/* Add your canvas content here */}
                  <CertificatePreview design={components} />
                  {/* <p className="text-center mt-20">Your canvas content goes here</p> */}
                </div>
              </div>
            </div>
          </div>
        );

    return (
      <section className="w-full max-w-6xl mx-auto py-8 md:py-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Add Recipients</h2>
            <p className="text-muted-foreground">Choose how you'd like to add recipients to your campaign.</p>
          </div>
          <div className="flex space-x-4">
            {/* Left side - Manually */}
            <div className="w-1/2 border rounded-lg p-4 space-y-2">
              <div>
                <h3 className="font-semibold">Manually</h3>
                <p className="text-sm text-muted-foreground">Add recipients one by one</p>
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
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
            </div>

            {/* Right side - Via Spreadsheet Upload */}
            <div className="w-1/2 border rounded-lg p-4 space-y-2">
              <div>
                <h3 className="font-semibold">Via Spreadsheet Upload</h3>
                <p className="text-sm text-muted-foreground">Upload a spreadsheet with recipient information</p>
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
              <p className="text-sm text-muted-foreground">Accepted file types: .csv, .xlsx, .xls</p>
              {uploadStats && (
                <p className="text-sm text-muted-foreground">
                  Uploaded {uploadStats.unique} unique entries out of {uploadStats.total} total entries.
                </p>
              )}

  {errorMessageForSheet && <p className="text-red-500 text-sm">{errorMessageForSheet}</p>}
  {errorMessageForValidSheet && <p className="text-red-500 text-sm">{errorMessageForValidSheet}</p>}            
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
            <div className="text-green-600 font-semibold mb-2">
              {saveStatus}
            </div>
          )}

          {/* Preview and Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button onClick={handlePreview}>
              Preview
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={recipients.length === 0}
            >
              Submit and Continue
            </Button>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && <PreviewModal />}
      </section>
    );
  }
