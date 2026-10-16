# Pearl Guide — Discover the Wonder of Sri Lanka 🇱🇰

**Pearl Guide** is a modern travel web application designed to help travelers discover Sri Lanka, explore destinations, plan personalized journeys, and discover travel experiences through a user-friendly interface.

The project aims to bring Sri Lanka's natural beauty, cultural heritage, wildlife, and travel experiences together in one digital platform.

## ✨ Features

- **Explore Destinations** — Discover Sri Lankan destinations through search, filters, and destination details.
- **Destination Details** — View destination information, highlights, travel tips, and relevant imagery.
- **AI Trip Planner Interface** — Customize travel preferences and explore day-by-day itinerary suggestions.
- **Travel Services** — Browse travel experiences and services such as transportation, train journeys, safaris, and wellness retreats.
- **User Authentication Interface** — Login and registration interface with demo account options, where configured.
- **User Dashboard** — View trip-related information and saved destinations.
- **My Trips** — Manage itinerary information and bookmarked destinations.
- **Booking Interface** — Review selected services and enter booking details through a checkout interface.
- **Admin Dashboard Interface** — Explore destination management and booking-related dashboard features.
- **Responsive UI** — Designed to provide a user-friendly experience across different screen sizes.

> **Development status:** Features such as authentication, AI itinerary generation, booking management, and payment processing may require backend or third-party integrations. Refer to the actual implementation before treating them as production-ready services.

## 🎨 Brand Identity

Pearl Guide uses an ocean-inspired color palette that reflects the natural beauty of Sri Lanka.

| Color | Hex Code | Purpose |
|---|---|---|
| Deep Ocean | `#005070` | Primary brand color |
| Ocean Teal | `#00909A` | Interactive elements |
| Tropical Aqua | `#00C8C0` | Accent highlights |
| Coral Energy | `#FF6B54` | Call-to-action accents |
| Warm Sand | `#F8D898` | Warm highlights |
| Seafoam Mist | `#E8F8F6` | Light backgrounds |

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB / Mongoose (for database integration, where configured)
- JWT and bcrypt (for authentication, where implemented)

## 📁 Project Structure

```text
pearl_guide/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/naushithennakoon14-bit/pearl_guide.git
cd pearl_guide
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

`http://localhost:5173`

### 4. Build for Production

From the `client` directory, run:

```bash
npm run build
```

The production build will be generated in the `client/dist` directory.

### 5. Run the Backend (If Configured)

Open another terminal and run:

```bash
cd server
npm install
npm run dev
```

Check `server/package.json` for the available scripts. If the development script is not configured, use the script that is actually defined there.

Configure environment variables using `server/.env.example` if required. Never commit real credentials, API keys, or database connection strings.

## 🗺️ Project Goals

Pearl Guide aims to develop into a travel platform that supports:

- Personalized Sri Lankan travel planning
- Destination discovery and travel inspiration
- Travel service and booking management
- Secure user authentication
- Interactive maps and location-based exploration
- AI-assisted itinerary recommendations
- Dedicated traveler and administrator experiences

These goals will be implemented and integrated progressively as development continues.

## 🔒 Security

- Keep secret credentials and API keys in environment variables.
- Do not commit `.env` files containing real secrets.
- Validate user input on the server.
- Implement appropriate authentication and authorization before deploying protected features.
- Use secure payment provider integrations for any real transactions.

## 📌 Development Status

Pearl Guide is an ongoing web application project. The frontend provides the main travel discovery and planning interfaces, while backend services and integrations depend on the current implementation stage.

## 👩‍💻 Author

**Nausha Thennakoon**

GitHub: [@naushithennakoon14-bit](https://github.com/naushithennakoon14-bit)

---

*Discover Sri Lanka. Create your journey. Experience Ceylon.*
