# TechCollective MVP

A collaborative platform where laid-off tech professionals can form teams, find projects, and build sustainable careers together through democratic governance and profit sharing.

## 🚀 Features

- **User Authentication** - Secure sign-up and sign-in with Clerk
- **Profile Management** - Showcase skills, experience, and availability
- **Project Marketplace** - Browse and apply to premium projects
- **Team Formation** - Create and join collaborative teams
- **Member Directory** - Connect with other professionals
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended for easy setup)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd techcollective-mvp
npm install
```

### 2. Set up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your API keys from the dashboard
4. Create a `.env.local` file with your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 3. Set up Database

#### Option A: Supabase (Recommended for MVP)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > Database and copy your connection string
4. Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `techcollective`
3. Add to `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/techcollective"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data (optional)
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Project marketplace
│   ├── teams/             # Team formation
│   ├── members/           # Member directory
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── prisma/               # Database schema and migrations
```

## 🎨 Customization

### Theme Colors

The application uses CSS variables for theming. You can customize colors in `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Adding New Features

1. **New Pages**: Add to `src/app/` directory
2. **New Components**: Add to `src/components/`
3. **Database Changes**: Update `prisma/schema.prisma`
4. **API Routes**: Add to `src/app/api/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [Clerk documentation](https://clerk.com/docs)
3. Check the [Prisma documentation](https://www.prisma.io/docs)
4. Open an issue in this repository

## 🎯 Next Steps

After the MVP is complete, consider adding:

- Payment processing and profit distribution
- Advanced team matching algorithms
- Project management tools
- Video conferencing integration
- Mobile app development
- Advanced analytics and reporting
