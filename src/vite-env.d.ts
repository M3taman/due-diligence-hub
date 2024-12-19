/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_ALPHA_VANTAGE_KEY: string
  readonly VITE_FINVIZ_API_KEY: string
  readonly VITE_SEC_API_KEY: string
  readonly VITE_ESG_API_KEY: string
  readonly VITE_ENV: 'development' | 'production' | 'test'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: Record<string, any>
  export default content
}