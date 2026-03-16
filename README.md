# CogniCode Writing Services

This is a **Next.js App Router project** built using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and enhanced with **Tailwind CSS, reusable components, and modular page architecture**.

The project structure follows modern **Next.js 13+ App Router patterns**, where routing is automatically handled through the `app` directory.

---

Open the application in your browser:

```
https://cognicode-writing-services.vercel.app/
```

---

# Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



The page will automatically reload when you edit files.

---

# Project Architecture Overview

The application follows a **component-driven architecture** using the Next.js App Router.

Main flow:

```
User Request
     │
     ▼
app/layout.tsx
     │
     ├── Header (Navigation)
     │
     ├── Page Route (app/page.tsx or nested routes)
     │       │
     │       ├── Sections (Hero, Services, Stats, FAQ, etc.)
     │       │
     │       └── UI Components (Buttons, Cards, etc.)
     │
     └── Footer
```

---

# Routing Flow

Next.js automatically generates routes from the **folder structure inside `app/`**.

| File                      | Route         |
| ------------------------- | ------------- |
| `app/page.tsx`            | `/`           |
| `app/about/page.tsx`      | `/about`      |
| `app/blog/page.tsx`       | `/blog`       |
| `app/contact/page.tsx`    | `/contact`    |
| `app/news/page.tsx`       | `/news`       |
| `app/global/uk/page.tsx`  | `/global/uk`  |
| `app/global/us/page.tsx`  | `/global/us`  |
| `app/global/uae/page.tsx` | `/global/uae` |

---

# Folder Structure

```
project-root
│
├ app/
│   ├ layout.tsx
│   ├ page.tsx
│   ├ globals.css
│   │
│   ├ about/
│   │   └ page.tsx
│   │
│   ├ blog/
│   │   └ page.tsx
│   │
│   ├ contact/
│   │   └ page.tsx
│   │
│   ├ news/
│   │   └ page.tsx
│   │
│   └ global/
│       ├ page.tsx
│       ├ uk/page.tsx
│       ├ us/page.tsx
│       └ uae/page.tsx
│
├ components/
│   ├ home/
│   │   ├ hero-section.tsx
│   │   ├ stats-section.tsx
│   │   ├ services-section.tsx
│   │   ├ why-choose-us-section.tsx
│   │   ├ testimonials-section.tsx
│   │   ├ faq-section.tsx
│   │   └ cta-section.tsx
│   │
│   ├ layout/
│   │   ├ header.tsx
│   │   └ footer.tsx
│   │
│   └ ui/
│       ├ button.tsx
│       ├ card.tsx
│       ├ badge.tsx
│       ├ accordion.tsx
│       ├ dropdown-menu.tsx
│       └ sheet.tsx
│
├ hooks/
│   └ use-mobile.ts
│
├ lib/
│   └ utils.ts
│
├ public/
│   ├ favicon.ico
│   └ images/
│
├ styles/
│
├ package.json
├ tsconfig.json
├ next.config.ts
└ postcss.config.mjs
```

---

# Component Architecture

The homepage is built using **modular sections** located in `components/home`.

Example flow for the homepage:

```
app/page.tsx
     │
     ├── Header
     │
     ├── HeroSection
     ├── StatsSection
     ├── ServicesSection
     ├── WhyChooseUsSection
     ├── TestimonialsSection
     ├── FAQSection
     ├── CTASection
     │
     └── Footer
```

Each section is designed as a reusable component.

---

# UI Components

Reusable UI components are located in:

```
components/ui/
```

These components provide the design system used across the project.

Examples:

| Component           | Usage               |
| ------------------- | ------------------- |
| `button.tsx`        | buttons and actions |
| `card.tsx`          | service cards       |
| `badge.tsx`         | labels and tags     |
| `accordion.tsx`     | FAQ section         |
| `dropdown-menu.tsx` | navigation dropdown |
| `sheet.tsx`         | mobile navigation   |

---

# Utility Functions

Utility helpers are located in:

```
lib/utils.ts
```

Example:

```
cn()
```

Used to merge Tailwind class names dynamically.

---

# Hooks

Custom React hooks are stored in:

```
hooks/
```

Example:

```
use-mobile.ts
```

Used for responsive behavior and device detection.

---

# Styling

The project uses:

* **Tailwind CSS**
* **Next.js font optimization**
* **Component-based styling**

Global styles are defined in:

```
app/globals.css
```

---

# Fonts

Fonts are loaded using:

```
next/font/google
```

Currently used fonts:

* Inter
* Merriweather

This ensures optimized font loading and improved performance.

---

# Deployment

The recommended deployment platform is **Vercel**.

Deploy instantly using:

https://vercel.com/new

For manual deployment:

```bash
npm run build
npm start
```

More details:

https://nextjs.org/docs/app/building-your-application/deploying

---

# Learn More

Resources to learn more about Next.js:

* https://nextjs.org/docs
* https://nextjs.org/learn
* https://github.com/vercel/next.js

---

# Author

Developed by **CogniCode Team**.

---

# License

This project is intended for academic writing services and internal development use.
