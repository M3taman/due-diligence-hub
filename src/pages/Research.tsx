import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { useResearch } from "@/hooks/useResearch"

export function Research() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const { toast } = useToast()
  const { data: researchItems, isLoading, error } = useResearch(searchTerm)

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load research data"
    })
  }

  return (
    <>
      <Helmet>
        <title>Research - Due Diligence Hub</title>
        <meta name="description" content="Explore our comprehensive research documents." />
        <meta name="keywords" content="due diligence, research, market analysis, financial research" />
      </Helmet>

      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <Input
              placeholder="Search research..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search Research"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={category} onValueChange={setCategory} aria-label="Select Category">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="market">Market Analysis</SelectItem>
                <SelectItem value="company">Company Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8" aria-live="polite">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        ) : researchItems?.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {researchItems.map((item) => (
              <Card key={item.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <Icons.eye className="h-4 w-4" />
                      <span>{item.analytics?.views || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="space-y-3">
              <Icons.search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="font-semibold">No research found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}