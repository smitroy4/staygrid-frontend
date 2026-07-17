# StayGrid Frontend

A modern hotel booking platform frontend built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Goober
- **Routing:** React Router
- **Deployment:** Vercel

## Features

- Hotel search and filtering
- Room booking interface
- User-friendly reservation system
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/smitroy4/staygrid-frontend.git

# Navigate to project directory
cd staygrid-frontend

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create a production build
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets (images, favicon, etc.)
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies and scripts
```

## Configuration Files

- `vite.config.ts` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `vercel.json` - Vercel deployment configuration

## Deployment

This project is configured for automatic deployment on Vercel. Simply push to the `main` branch to trigger a new deployment.

**Live Demo:** [stay-grid.vercel.app](https://stay-grid.vercel.app)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linter (if configured)

## Environment Variables

Create a `.env.local` file in the root directory if needed:

```env
VITE_API_BASE_URL=your_api_endpoint_here
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## Contact

For questions or feedback, reach out via GitHub issues or visit [smitroy.com](https://smitroy.com)
