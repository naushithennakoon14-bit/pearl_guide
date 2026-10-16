# Pearl Guide — Sri Lanka Travel Platform (Ceylon Curated)

A premium, modern, and immersive web application for discovering Sri Lanka, generating AI-powered itineraries, and booking certified travel services.

---

## 🎨 Mandatory Brand Palette & Design Tokens

| Brand Color | Hex Code | Purpose & Semantic Role |
|---|---|---|
| **Deep Ocean** | `#005070` | Primary brand identity, dark headers, high-contrast headings, solid backgrounds |
| **Ocean Teal** | `#00909A` | Secondary actions, active states, navigational highlights, interactive buttons |
| **Tropical Aqua** | `#00C8C0` | Glowing badges, accent highlights, map coordinates, subtle illuminated borders |
| **Coral Energy** | `#FF6B54` | Primary high-intent Calls to Action (Book Tour, Plan Journey), alert badges |
| **Warm Sand** | `#F8D898` | Star ratings, warm tags, subtle section dividers with `#005070` text contrast |
| **Seafoam Mist** | `#E8F8F6` | Light background surfaces, card containers, subtle alternating sections |

---

## 🏗️ Architecture & Structure

```
pearl_guide/
├── client/                     # React 18 + Vite + Tailwind CSS + Lucide Icons + React Router
│   ├── public/                 # Static assets, SVG favicon
│   ├── src/
│   │   ├── components/         # Reusable UI system (Button, Badge, Modal, Navbar, Footer, DestinationCard)
│   │   ├── context/            # AuthContext (Traveler/Admin), SavedTripsContext, ToastContext
│   │   ├── data/               # Curated Sri Lankan destinations & services dataset
│   │   ├── pages/              # 10 core pages (Home, Explore, Details, AI Planner, Services, Auth, Dashboard, My Trips, Checkout, Admin)
│   │   ├── styles/             # Tailwind directives & CSS transforms
│   │   ├── App.jsx             # Top-level routing & scroll restoration
│   │   └── main.jsx            # React root with providers
│   ├── index.html              # Modern typography (Plus Jakarta Sans & Playfair Display)
│   ├── tailwind.config.js      # Custom theme tokens & shadow utilities
│   └── vite.config.js          # Vite config
│
├── server/                     # Node.js + Express.js Backend Skeleton (Ready for Phase 2)
│   ├── server.js               # Express application entry point
│   ├── package.json            # Server dependencies (Express, Mongoose, JWT, bcrypt, cors)
│   └── .env.example            # Environment variables template
│
└── README.md
```

---

## 🚀 Running the Project Locally

### 1. Frontend Development Server
```bash
cd client
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Frontend Production Build
```bash
cd client
npm run build
```

### 3. Backend API (Prepared for Phase 2)
```bash
cd server
npm install
npm run dev
```
Running on port `5000` (health check at `http://localhost:5000/api/health`).

---

## 🌟 Implemented Pages (Phase 1)
1. **Home (`/`)**: Cinematic hero, multi-filter search widget, signature Ceylon experiences, featured destinations, AI teaser, verified traveler dispatches, responsive footer.
2. **Explore Destinations (`/destinations`)**: Faceted multi-region and category filtering, search input, sorting, empty states.
3. **Destination Details (`/destinations/:id`)**: High-res imagery gallery, quick logistics specs, 4 interactive tabs (Overview, Key Highlights, Native Travel Secrets, Climate & Monsoons), direct tour booking button.
4. **AI Trip Planner (`/planner`)**: Dynamic trip synthesizer with customizable duration (3-14 days), travel focus, group type, travel pace, comfort tier, interactive loading states, and day-by-day itinerary breakdown.
5. **Travel Services (`/services`)**: Certified private chauffeurs, scenic highland blue train passes, VIP 4x4 leopard safaris, authentic Ayurveda wellness retreats, and pelagic blue whale charters.
6. **Login & Register (`/auth`)**: Tabbed authentication view with one-click demo credentials switcher (Traveler & Admin personas).
7. **User Dashboard (`/dashboard`)**: Welcome banner, trip metrics, active itinerary status, saved destinations quick-view, seasonal Sri Lanka travel advisory.
8. **My Trips & Saved Destinations (`/my-trips`)**: Dual-tab view for managing custom day-by-day itineraries (with print/export action) and bookmarked destination cards.
9. **Booking & Checkout (`/checkout`)**: Itemized price calculations (chauffeur fare, park tickets, eco-conservation levy), passenger details form, payment method selector, test-mode advisory, and confirmation modal.
10. **Admin Dashboard (`/admin`)**: Metric KPI tiles, live destination catalog with search and "Add Landmark" modal, booking inquiries queue, and AI route telemetry.
