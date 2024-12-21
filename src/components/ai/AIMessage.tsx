import { Card } from "@/components/ui/card"
import type { Message } from "@/types/chat"
import { renderMarkdown } from "@/utils/aiUtils"
import { ChartProvider } from '../charts/ChartContext'
import { ChartRenderer } from '../charts/ChartRenderer'

interface AIMessageProps {
  message: Message
}

export const AIMessage = ({ message }: AIMessageProps) => {
  const processedContent = renderMarkdown(message.content)

  return (
    <ChartProvider>
      <Card className="p-4 my-2">
        <div 
          className="prose prose-slate max-w-none" 
          dangerouslySetInnerHTML={{ __html: processedContent.html }} 
        />
        {processedContent.charts?.map((chart, index) => (
          <ChartRenderer 
            key={index} 
            chartData={chart} 
          />
        ))}
      </Card>
    </ChartProvider>
  )
}