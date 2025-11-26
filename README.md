# ShopDemo (Next.js + NextAuth + Express)

A modern, full-featured e-commerce application built with Next.js (App Router), NextAuth.js, and Firebase. Includes authentication, product management, user profiles, and a responsive UI with DaisyUI and Tailwind CSS.

## 🌟 Features

- **Authentication**: NextAuth.js with credentials and Google OAuth login
- **Protected Routes**: Add/Manage products pages only accessible when logged in
- **Product Management**: Create, read, update, and delete products
- **User Profiles**: View user info, manage products, edit profile details
- **Responsive Design**: Mobile-first UI with consistent spacing and hover states
- **Real-time Updates**: Optimistic UI for product deletion with SweetAlert2 confirmation
- **Firebase Integration**: Social login and user management via Firebase
- **Search & Filter**: Product search with category filter UI
- **Modern Stack**: React 19, Next.js 16, Tailwind CSS 4, DaisyUI 5

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 16+ (or 18+)
- **npm** or **yarn** package manager
- A **Firebase** project (optional, for Google sign-in)
- A running **Express.js backend** at `http://localhost:5000` (or configure `NEXT_PUBLIC_SERVER`)

### 1. Clone & Install

```bash
cd movies-demo
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of `movies-demo/`:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Firebase (for social login)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Backend Server
NEXT_PUBLIC_SERVER=http://localhost:5000
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📋 Route Summary

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `page.js` | Landing page with hero, features, testimonials, and CTA |
| `/products` | `products/page.jsx` | Product listing with search and category filter |
| `/products/[id]` | `products/[id]/page.jsx` | Product details page |
| `/login` | `(auth)/login/page.jsx` | Login with credentials or Google OAuth |
| `/register` | `(auth)/register/page.jsx` | Registration form |

### Protected Routes (Login Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/profile` | `profile/page.jsx` | User profile with info and their products |
| `/add-product` | `add-product/page.jsx` | Create a new product (form) |
| `/manage-products` | `manage-products/page.jsx` | View, edit, and delete user's products |

### API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js authentication handler |

---

## 🛠️ Key Components & Modules

### Context & State Management

- **`AuthProvider.jsx`** – Firebase authentication provider with `user`, `googleSignIn`, `signOutUser`, and `loading` state
- **`ProductProvider.jsx`** – Product CRUD operations with fetch, add, delete, and filter functionality
- **`Context.jsx`** – Shared authentication context

### UI Components

- **`Navbar.jsx`** – Sticky navigation with responsive menu, user dropdown (login/register or profile)
- **`Footer.jsx`** – Footer with links and copyright
- **`Profile Page`** – User avatar, info, edit profile, and product list

### Pages Highlights

- **Home (`/`)** – Hero section, features cards, featured products grid, testimonials, CTA banner
- **Products (`/products`)** – Search bar, category filter (UI), responsive product grid with hover states
- **Add Product** – Form with title, description, price, priority, and image URL
- **Manage Products** – Table view with View/Delete actions, SweetAlert2 delete confirmation, optimistic UI
- **Product Details (`/products/[id]`)** – Large product image, full description, back button

---

## 🔐 Authentication Flow

1. **Credentials Login**
   - User enters email & password → `POST /api/auth/login` (backend)
   - NextAuth validates and creates session → Redirect to `/`

2. **Google OAuth**
   - User clicks "Continue with Google"
   - Firebase handles Google sign-in
   - Frontend posts user data to `POST /api/auth/firebase` (backend)
   - Redirect to `/`

3. **Protected Page Access**
   - Checks `useSession()` (NextAuth) and `AuthContext` (Firebase)
   - Waits for `auth.loading` to complete before redirecting
   - Redirects unauthenticated users to `/login`

---

## 📦 Dependencies

### Main

- `next` – React framework with App Router
- `next-auth` – Authentication library
- `firebase` – Backend services & auth
- `react-hook-form` – Form state management
- `axios` – HTTP client
- `sweetalert2` – Beautiful modal confirmations

### Dev & Styling

- `tailwindcss` – Utility-first CSS framework
- `daisyui` – Component library for Tailwind
- `eslint` – Code linting
- `@tailwindcss/postcss` – PostCSS plugin

---

## 🎨 Styling & Design

- **Framework**: Tailwind CSS 4 with DaisyUI components
- **Colors**: Neutral palette with primary accent colors
- **Responsive**: Mobile-first design, tested on mobile/tablet/desktop
- **Animations**: Hover/focus states, smooth transitions, optional micro-interactions
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

---

## 📝 Common Tasks

### Add a New Protected Page

1. Create a folder in `src/app/` (e.g., `settings/`)
2. Add `page.jsx` with `"use client"` directive
3. Import `AuthContext` and add auth check:
   ```jsx
   const auth = useContext(AuthContext);
   const { data: session, status } = useSession();
   useEffect(() => {
     if (status === "loading" || auth?.loading) return;
     if (status === "unauthenticated" && !auth?.user) router.push("/login");
   }, [status, auth?.loading, auth?.user]);
   ```

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set environment variables in Vercel project settings
4. Deploy on push

### Running Backend

Navigate to `movies-server/` directory and start the Express server:

```bash
cd ../movies-server
npm install
npm start
```

Backend should run on `http://localhost:5000`.

---

## 🧪 Testing

Run linter to check code quality:

```bash
npm run lint
```

---

## 📄 License

MIT License – feel free to use this project for personal or commercial purposes.

---

## 💬 Support & Feedback

For issues, questions, or suggestions, please open an issue or contact the development team.

---

**Happy coding!** 🎉
