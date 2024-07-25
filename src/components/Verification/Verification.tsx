import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, LinkedinIcon, DownloadIcon, MessageCircleIcon, LogInIcon } from 'lucide-react';

export function Verification() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <LogInIcon className="w-6 h-6" />
          <span className="text-xl font-semibold">Authentimate</span>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex justify-center mb-8">
          <img src="/placeholder.svg" alt="Certificate" className="border rounded-md shadow-md" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4">
            <Card className="p-4">
              <CardHeader>
                <CardTitle>ISSUED TO</CardTitle>
                <CardDescription>Manish Bulchandani</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <LinkedinIcon className="w-4 h-4 mr-2" />
                    Add to LinkedIn
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircleIcon className="w-4 h-4 text-muted-foreground" />
                  <Button variant="link" className="text-blue-600">
                    Contact Issuer
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader>
                <CardTitle>CREDENTIAL VERIFICATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Issue date: June 7, 2024</p>
                <Button className="w-full" variant="default">
                  Verify Credential
                </Button>
                <p className="text-xs text-muted-foreground">ID: c2b509f9-9d28-4320-9ba6-6d1a509f9b4c</p>
              </CardContent>
            </Card>
          </div>
          <Card className="p-4 lg:col-span-2">
            <CardHeader>
              <CardTitle>ISSUED BY</CardTitle>
              <CardDescription>Authentimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">No information provided for this award.</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}