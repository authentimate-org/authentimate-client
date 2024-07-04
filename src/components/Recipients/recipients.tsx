import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import * as XLSX from 'xlsx';

export function Recipients() {
  const [manualRecipients, setManualRecipients] = useState<{ name: string; email: string }[]>([]);
  const [uploadedRecipients, setUploadedRecipients] = useState<{ name: string; email: string }[]>([]);
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
    return manualRecipients.some(r => r.email === email) || uploadedRecipients.some(r => r.email === email);
  };

  const handleSubmitRecipient = () => {
    if (newRecipientName && newRecipientEmail) {
      if (isEmailDuplicate(newRecipientEmail)) {
        setErrorMessage("Error: This email already exists in the recipients list.");
      } else {
        setManualRecipients([...manualRecipients, { name: newRecipientName, email: newRecipientEmail }]);
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
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: ['name', 'email'] });
        resolve(jsonData as { name: string; email: string }[]);
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
          const x = acc.find(item => item.email === current.email);
          if (!x && !isEmailDuplicate(current.email)) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [] as { name: string; email: string }[]);

        setUploadedRecipients([...uploadedRecipients, ...uniqueData]);
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
    window.location.href = "/next-step";
  };

  const RecipientList = ({ recipients }: { recipients: { name: string; email: string }[] }) => (
    <div className="space-y-2">
      {recipients.map((recipient, index) => (
        <div key={index} className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>
              {recipient.name.charAt(0)}
              {recipient.name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{recipient.name}</p>
            <p className="text-sm text-muted-foreground">{recipient.email}</p>
          </div>
        </div>
      ))}
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
            <RecipientList recipients={manualRecipients} />
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
            <RecipientList recipients={uploadedRecipients} />
            {uploadStats && (
              <p className="text-sm text-muted-foreground">
                Uploaded {uploadStats.unique} unique entries out of {uploadStats.total} total entries.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </section>
  );
}