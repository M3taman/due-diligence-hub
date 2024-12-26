import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, BarChart2, Shield, Zap, Search } from 'lucide-react'

export function Index() {
  const navigate = useNavigate()

  const features = [
    {
      title: "Real-time Analysis",
      description: "Get instant insights with our AI-powered analysis engine",
      icon: <BarChart2 className="h-6 w-6" />
    },
    {
      title: "Comprehensive Coverage",
      description: "Deep dive into financial, market, and regulatory aspects",
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Risk Management",
      description: "Identify and assess potential risks early",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Fast Processing",
      description: "Quick and efficient due diligence process",
      icon: <Zap className="h-6 w-6" />
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Smart Due Diligence
              <br className="hidden sm:inline" />
              Made Simple
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Automate your due diligence process with AI-powered analysis and comprehensive reporting
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => navigate('/')}>
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/demo')}>
                View Demo
              </Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Index