# CAP Core (Coliving Asset Protocol)

CAP is a modern, tech-enabled coliving protocol designed for global citizens and digital nomads. It provides an "operating system" for managing premium residential nodes, processing subscriptions, and managing real estate assets.

## Features

- **Borderless Subscriptions:** Residents ("Citizens") can subscribe to anchor properties or purchase a Nomad Pass to roam across nodes globally.
- **CAP Invest:** A built-in platform allowing residents to stake capital to offset their monthly rent via yield generation.
- **Central Command (Admin):** A global operations dashboard for admins to manage nodes, occupancy rates, MRR, and citizen subscriptions.
- **Zero Day Experience:** Seamless arrival experience ensuring properties are fully equipped and ready for productive living from day one.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database / Auth:** [Supabase](https://supabase.com/)
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **Deployment:** Optimized for Nixpacks / Coolify

## Getting Started

1. **Install Dependencies:**
   ```bash
   cd cap-app
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.local.example` to `.env.local` and add your Supabase credentials.

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Coolify

This project is configured for out-of-the-box deployment with Coolify using Nixpacks.
- Set the **Base Directory** to `/cap-app`
- Set the **Build Command** to `npm run build`
- Set the **Start Command** to `npm run start`

## License
Proprietary / Closed Source
