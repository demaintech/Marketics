# Marketics

Marketics is a marketing studio website for founders and growing brands. It presents the studio’s services, approach, selected work, and client engagements, with dedicated case-study pages for each featured project.

## What’s included

- Studio landing page with an introduction, services, portfolio, research, engagements, and results.
- Six detailed case studies: Prepia, DragonSwap, Gamblino, Findit, Snipers Sale, and Dellgardo.
- Shared site navigation and footer across pages.
- Self-hosted brand fonts and locally stored project imagery and media.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4

## Getting started

### Prerequisites

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The development server refreshes as you edit the source files.

No environment variables are required for local development.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build locally. Run `npm run build` first. |
| `npm run lint` | Run ESLint. |

## Project structure

```text
app/
  page.tsx                 Landing page
  layout.tsx               Shared layout, fonts, and metadata
  work/<case>/page.tsx     Case-study routes
components/                Page sections and shared UI
content/cases/             Typed case-study content
public/images/             Brand and case-study imagery
public/video/              Case-study video assets
```

The case-study content is maintained separately from its shared presentation component. To update a case study, edit the corresponding file in `content/cases/`; the available case-study records and their order are defined in `content/cases/index.ts` and `content/cases/types.ts`.

## Routes

| Page | Path |
| --- | --- |
| Home | `/` |
| Prepia | `/work/prepia` |
| DragonSwap | `/work/dragonswap` |
| Gamblino | `/work/gamblino` |
| Findit | `/work/findit` |
| Snipers Sale | `/work/snipers-sale` |
| Dellgardo | `/work/dellgardo` |

## Production

Build and run the production site with:

```bash
npm run build
npm run start
```

For deployment options and platform-specific guidance, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
