# Due Diligence Hub

AI-powered financial analysis and due diligence platform for investment research.

## Features

- 🤖 AI-Driven Analysis
- 📊 Real-time Market Data
- 📑 Research Management
- 📈 Performance Tracking
- 🔒 Secure Authentication

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Supabase
- **AI/ML:** OpenAI, LangChain
- **Data:** Polygon.io, Alpha Vantage
- **Authentication:** Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git
- Supabase CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/due-diligence-hub.git

# Navigate to project directory
cd due-diligence-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev


VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_OPENAI_API_KEY=your_openai_key
VITE_POLYGON_API_KEY=your_polygon_key



npm run dev        # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run lint       # Lint code


src/
├── components/    # UI components
├── pages/         # Route pages
├── lib/          # Shared utilities
├── hooks/        # Custom React hooks
└── styles/       # Global styles


Authentication
OAuth providers (Google, GitHub)
Trial access system
Role-based authorization
Contributing
Create feature branch
Make changes
Submit pull request
License
MIT License - see LICENSE file for details

Support
Documentation: /docs
Issues: GitHub Issues
Email: support@dudil.com