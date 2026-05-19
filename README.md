# Voice AI Admission Assistant

A modern AI-powered Voice Admission Assistant built with Next.js 15, TypeScript, Tailwind CSS, and OpenAI APIs.

The assistant supports real-time voice conversations, speech recognition, AI-generated responses, and multilingual communication for admission and CRM workflows.

---

# Features

* Real-time Speech-to-Text (Voice Input)
* AI-powered Text Responses
* Text-to-Speech (AI Voice Output)
* Hindi and English language support
* Modern responsive UI
* Glassmorphism and animated interface
* Conversation history
* Error handling and retry support
* Mobile-friendly design
* Fast and lightweight architecture

---

# Tech Stack

* Next.js 15
* TypeScript
* Tailwind CSS
* OpenAI API
* Web Speech API
* SpeechSynthesis API

---

# Project Structure

```bash
src/
 ├── app/
 ├── components/
 ├── hooks/
 ├── services/
 ├── utils/
 └── styles/
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd voice-ai-assistant
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 4. Start Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# Voice Features

## Speech-to-Text

Uses the browser's native Web Speech API for real-time microphone input.

Supported browsers:

* Google Chrome
* Microsoft Edge

---

## Text-to-Speech

Uses the browser's built-in SpeechSynthesis API for AI voice responses.

Features:

* Real-time AI speaking
* Multi-language support
* Adjustable speech settings

---

# Supported Languages

* English
* Hindi

Additional languages can be added easily.

---

# Optional Integrations

* ElevenLabs Voice AI
* Laravel CRM Integration
* Twilio Calling Integration
* Database Chat Logging
* OpenAI Whisper API
* Real-time AI Agents

---

# Security Notes

* Never expose `.env.local`
* Keep API keys private
* Add rate limiting before production deployment
* Use backend API routes for OpenAI requests

---

# Production Recommendations

Before deploying to production:

* Enable authentication
* Add API request validation
* Add logging and monitoring
* Optimize speech handling
* Configure HTTPS
* Add environment-based configs

---

# Deployment

## Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/huroorkee2010/Aadi)

1. Sign in to Vercel and create a new project.
2. Import the GitHub repository and select the `main` branch.
3. Set environment variables in Vercel:

```text
OPENAI_API_KEY=your_openai_api_key_here
```

4. Deploy the project.
5. Vercel will provide a live URL for the app.

## GitHub Actions CI

To build and validate the app automatically on every push, add a GitHub Actions workflow.

Create `.github/workflows/ci.yml` with the following content:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
```

Add the following repository secret in GitHub as `OPENAI_API_KEY`.

## Local build

```bash
npm run build
npm run start
```

If you want a custom domain, configure it in Vercel and ensure HTTPS is enabled.

---

# Future Improvements

* Streaming AI responses
* AI memory/context
* Voice interruption handling
* CRM automation
* Multi-user sessions
* Live call assistant

---

# License

MIT License