export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export interface ProcessedContent {
  html: string
  charts?: Array<{
    type: string
    data: any
    options?: any
  }>
}