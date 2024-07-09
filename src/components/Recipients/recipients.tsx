import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from 'xlsx';

export function Recipients() {
  const [recipients, setRecipients] = useState<{ name: string; email: string }[]>([]);
  const [showAddRecipientForm, setShowAddRecipientForm] = useState(false);
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStats, setUploadStats] = useState<{ total: number; unique: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddRecipient = () => {
    setShowAddRecipientForm(true);
    setErrorMessage("");
  };

  const isEmailDuplicate = (email: string) => {
    return recipients.some(r => r.email === email);
  };

  const handleSubmitRecipient = () => {
    if (newRecipientName && newRecipientEmail) {
      if (isEmailDuplicate(newRecipientEmail)) {
        setErrorMessage("Error: This email already exists in the recipients list.");
      } else {
        setRecipients([...recipients, { name: newRecipientName, email: newRecipientEmail }]);
        setNewRecipientName("");
        setNewRecipientEmail("");
        setShowAddRecipientForm(false);
        setErrorMessage("");
      }
    }
  };

  const parseSpreadsheet = (file: File): Promise<{ name: string; email: string }[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

        // Check if the first row contains headers
        const hasHeaders = jsonData[0].some(cell => 
          typeof cell === 'string' && ['name', 'email'].includes(cell.toLowerCase())
        );

        // Start from the second row if headers are present
        const startRow = hasHeaders ? 1 : 0;

        const parsedData = jsonData.slice(startRow).map(row => ({
          name: row[0] || '',
          email: row[1] || ''
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
          unique: uniqueData.length
        });
      } catch (error) {
        console.error("Error parsing spreadsheet:", error);
        setErrorMessage("Error parsing spreadsheet. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = () => {
    // Save the recipients data to localStorage
    localStorage.setItem('recipients', JSON.stringify(recipients));
    // Navigate to the next page
    window.location.href = '/next-page'; // Replace with your actual next page URL
  };

  const RecipientTable = () => (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Recipient Name</th>
          <th className="border p-2 text-left">Recipient Email</th>
        </tr>
      </thead>
      <tbody>
        {recipients.map((recipient, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="border p-2">{recipient.name}</td>
            <td className="border p-2">{recipient.email}</td>
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
          <p className="text-muted-foreground">Choose how you'd like to add recipients to your campaign.</p>
        </div>
        <div className="flex space-x-4">
          {/* Left side - Manually */}
          <div className="w-1/2 border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Manually</h3>
                <p className="text-sm text-muted-foreground">Add recipients one by one</p>
              </div>
              <Button variant="ghost" onClick={handleAddRecipient}>
                Add Recipient
              </Button>
            </div>
            {showAddRecipientForm && (
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
            )}
          </div>

          {/* Right side - Via Spreadsheet Upload */}
          <div className="w-1/2 border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Via Spreadsheet Upload</h3>
                <p className="text-sm text-muted-foreground">Upload a spreadsheet with recipient information</p>
              </div>
              {isUploading ? (
                <Button variant="ghost" disabled>
                  Uploading...
                </Button>
              ) : (
                <Button variant="ghost" onClick={handleUploadClick}>
                  Upload sheet
                </Button>
              )}
              <input 
                ref={fileInputRef}
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload}
                accept=".csv,.xlsx,.xls"
              />
            </div>
            <p className="text-sm text-muted-foreground">Accepted file types: .csv, .xlsx, .xls</p>
            {uploadStats && (
              <p className="text-sm text-muted-foreground">
                Uploaded {uploadStats.unique} unique entries out of {uploadStats.total} total entries.
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

        {/* Submit Button */}
        {recipients.length > 0 && (
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>
              Submit and Continue
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}