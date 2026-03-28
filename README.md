## Live Links

- **Frontend:** [https://propsphere.vercel.app](https://propsphere.vercel.app)
- **Backend API:** [https://prop-share.onrender.com](https://prop-share.onrender.com)

## Features

- Secure Authentication & User Dashboard
- Interactive Property Listings
- Smooth UI Animations (GSAP, Framer Motion)
- Fully Responsive Design

## Technologies

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI
- **Data & State:** TanStack React-Query, Axios
- **Form Validation:** React Hook Form, Zod

## Setup Instructions

1. **Clone & Install:**

   ```bash
   git clone https://github.com/arabyhossainabid/propshare.git
   cd propshare
   pnpm install
   ```

2. **Environment Settings (`.env`):**

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://prop-share.onrender.com/api/v1
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dswiaaos6
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=propshare_unsigned
   ```

3. **Run Application:**
   ```bash
   pnpm run dev
   ```
