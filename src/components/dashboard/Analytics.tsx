import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
export function Analytics() {
    return (
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Total Projects Created</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center flex-1">
              <div className="text-5xl font-bold">2,389</div>
              <div className="text-gray-500 dark:text-gray-400">Projects</div>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Total Certificates Generated</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center flex-1">
              <div className="text-5xl font-bold">12,345</div>
              <div className="text-gray-500 dark:text-gray-400">Certificates</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }