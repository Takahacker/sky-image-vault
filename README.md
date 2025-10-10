# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/506986d2-d4e1-4cb4-886d-71e86d3abd76

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/506986d2-d4e1-4cb4-886d-71e86d3abd76) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/506986d2-d4e1-4cb4-886d-71e86d3abd76) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deploy to AWS S3 (static site) and separate Clientes on EC2

If you want to host the main site on an S3 static website and keep the Clientes (customer area) on a separate EC2 instance, follow these steps:

1. Build the static site

```bash
npm run build
# or if you use pnpm: pnpm build, bun: bun build
```

2. Create an S3 bucket and enable static website hosting

- Create a bucket (name must be globally unique).
- Enable static website hosting and set index document to `index.html` and error document to `index.html` (for SPA routing).

3. Make the bucket public (or use CloudFront + OAI)

- For quick testing you can add a bucket policy to allow public GetObject. For production, prefer CloudFront with an Origin Access Identity and an ACM certificate for HTTPS.

4. Upload `dist/` to the bucket

```bash
# Configure AWS CLI first: aws configure
aws s3 sync dist/ s3://your-bucket-name --delete
```

5. Clients area on EC2

- Deploy your separate Clientes application (could be a server-rendered app, another SPA, or backend+frontend) to an EC2 instance and expose it at a public URL or behind a load balancer.

6. Point navigation links to the EC2 URL

- This project reads the clients URL from the Vite env var `VITE_CLIENTS_URL` at build time. Set it when building the site. Example:

```bash
# Unix/macOS (zsh)
VITE_CLIENTS_URL="https://clientes.yourdomain.com" npm run build

# or using cross-env
npx cross-env VITE_CLIENTS_URL="https://clientes.yourdomain.com" npm run build
```

- If `VITE_CLIENTS_URL` is an absolute URL (starts with http), the site will open it in a new tab. If it's a relative path (like `/clientes`), it will use a normal anchor.

Notes:

- We removed the internal `/clientes` React route from the main app; navigation now points to the external URL you provide at build time.
- Keep the file `src/pages/Clientes.tsx` in the repo if you want it for reference, or remove it if you no longer need the internal page.

### Deploy helper script

This repository includes a helper script `scripts/deploy-s3.sh` that automates building and syncing to an S3 bucket. Usage:

```bash
# make it executable (once)
chmod +x scripts/deploy-s3.sh

# Basic usage (set VITE_CLIENTS_URL if you need the clients link to point to EC2)
VITE_CLIENTS_URL="https://clientes.yourdomain.com" ./scripts/deploy-s3.sh your-bucket-name

# With CloudFront invalidation (optional)
VITE_CLIENTS_URL="https://clientes.yourdomain.com" ./scripts/deploy-s3.sh your-bucket-name --invalidate YOUR_CLOUDFRONT_DISTRO_ID
```

The script runs `npm run build`, syncs `dist/` to the given S3 bucket and optionally requests a CloudFront invalidation.
