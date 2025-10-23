# RedOffset Web Experience

Professional, dark-themed marketing site for the RedOffset cybersecurity red team agency.

## Tech Stack
- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com)
- [Heroicons](https://heroicons.com)

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npm run dev
   ```
3. Build for production
   ```bash
   npm run build
   ```
4. Preview the production build
   ```bash
   npm run preview
   ```

## Project Structure
```
src/
  components/   # Layout, navigation, shared UI
  hooks/        # Reusable hooks (SEO metadata)
  pages/        # Route-driven pages (Home, Services, About, Contact)
```

## Deployment
This site is optimized for static hosting providers such as Netlify or Vercel. The `npm run build` command outputs a static bundle in `dist/`.
