# DevLaunch AI

DevLaunch AI helps aspiring developers discover entry-level software jobs, compare their skills with job requirements, identify skill gaps, and follow personalized learning roadmaps.

## Features

- Search live job listings by role and location.
- Compare your skills with job descriptions.
- Identify missing or in-demand skills.
- Explore suggested learning roadmaps and resources.
- Save interesting jobs for later.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- SerpApi

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and add your SerpApi key:

   ```text
   SERPAPI_KEY=your_serpapi_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

## Security

Keep `.env.local` private. Never commit API keys to GitHub or expose them in client-side code. Configure `SERPAPI_KEY` in your deployment platform's environment variables.