  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { LinkIcon, LinkedinIcon, DownloadIcon, MessageCircleIcon, LogInIcon } from 'lucide-react';
  import { useVerifyCertificationQuery } from "@/api/verification/verificationApi";
  import { useNavigate, useParams } from "react-router-dom";
  import CertificatePreview from "../editor/CertificatePreview";
  import { useRef } from "react";

  export function Verification() {
    
    const {id}=useParams()
    const navigate=useNavigate()

    const {data,isLoading,error}=useVerifyCertificationQuery(id??"")
    const canvasRef=useRef(null)
    if(isLoading){
      return <div>Loading...</div>
    }
    if(error){
      setTimeout(()=>{
        navigate("/")
      },2000)
      return <div>Invalid Certification</div>
    }

    const handleDownload = () => {
      const canvas=document.getElementsByTagName("canvas")[0]
      
        const uri = canvas.toDataURL();
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-2">
            <LogInIcon className="w-6 h-6" />
            <span className="text-xl font-semibold">Authentimate</span>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <div id = "canvas_preview" className="flex justify-center mb-8 ">
            <CertificatePreview design={data.components} ref={canvasRef}/>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>ISSUED TO</CardTitle>
                  <CardDescription>{data?.recipientName}</CardDescription>
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
                    <Button className="flex-1" variant="outline" onClick={handleDownload}>
                      <DownloadIcon className="w-4 h-4 mr-2"  />
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
                  <p className="text-sm">Issue date: {data?.dateOfIssue}</p>
                  <Button className="w-full" variant="default">
                    Verify Credential
                  </Button>
                  <p className="text-xs text-muted-foreground">ID: {id}</p>
                </CardContent>
              </Card>
            </div>
            <Card className="p-4 lg:col-span-2">
              <CardHeader>
                <CardTitle>ISSUED BY</CardTitle>
                <CardDescription>{data?.issuedBy}</CardDescription>
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