# Sinduja Boutique — Official MERN Stack Website

> **"Your Style. Your Rule."**
> A premium digital showroom and lead-generation web application for Sinduja Boutique.

---

## 🌟 Overview

Sinduja Boutique is an elegant fashion digital showroom and bespoke tailoring web portal designed to showcase traditional silk sarees, designer blouses, bridal wear, custom-tailored outfits, and fashion accessories.

The website is optimized for conversion funnels:
- **WhatsApp Enquiries** with pre-filled dynamic messages
- **Direct Calling**
- **Instagram Profile Integration**
- **Mobile Bottom Action Bar** (Call | WhatsApp | Location directions)
- **Atelier Gallery** with interactive fullscreen Lightbox
- **Owner Admin Portal** to add/delete products, manage gallery photos, and update boutique contact details

---

## 🛠️ Technology Stack (100% MERN)

- **M** - **MongoDB** (Mongoose with automatic fallback to high-performance in-memory store if offline)
- **E** - **Express.js** (REST API backend with CORS, Morgan, and modular routing)
- **R** - **React 18** (Vite, React Router v6, Tailwind CSS, Lucide Icons)
- **N** - **Node.js** (Full-stack runtime)

---

## 📂 Project Structure

```
c:\Sinduja boutique\
├── client/                     # Frontend React (Vite + Tailwind CSS + Lucide Icons)
│   ├── src/
│   │   ├── components/         # Reusable modular UI components (Navbar, Footer, MobileActionBar, Lightbox, etc.)
│   │   ├── config/             # businessConfig.js (Centralized Business Contact Details)
│   │   ├── data/               # initialData.js (High-res curated fashion placeholders)
│   │   ├── pages/              # Home, About, Collections, Products, ProductDetail, Services, Gallery, NewArrivals, Offers, Contact, Admin
│   │   ├── services/           # api.js (Axios REST API service with resilient fallback)
│   │   └── styles/             # index.css (Luxury design system tokens)
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── config/                 # db.js & businessConfig.js
│   ├── controllers/            # productController, categoryController, serviceController, galleryController, settingsController
│   ├── models/                 # Product, Category, Service, Gallery, Offer, BusinessSettings, ContactEnquiry
│   ├── routes/                 # api.js
│   ├── data/                   # seedData.js
│   ├── server.js               # Main Express entry point
│   └── package.json
│
├── package.json                # Root package.json (concurrently orchestrator)
└── README.md
```

---

## 🚀 How to Run the Application

### 1. Install Dependencies
Run the following commands:
```bash
# In the root directory:
npm install

# In the server directory:
cd server
npm install

# In the client directory:
cd ../client
npm install
```

### 2. Start Both Frontend and Backend (Single Command)
From the root directory:
```bash
npm run dev
```

- **Frontend Website**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api`
- **Owner Admin Portal**: `http://localhost:3000/admin`

---

## 📞 Business Information & Centralized Updates

All business data is maintained centrally in:
- Frontend: `client/src/config/businessConfig.js`
- Backend: `server/config/businessConfig.js`
- Admin Portal: `http://localhost:3000/admin` (Settings tab)

| Detail | Current Setting |
| :--- | :--- |
| **Business Name** | Sinduja Boutique |
| **Owner** | Sinduja |
| **Primary Phone** | 9360530071 |
| **WhatsApp Number** | 9360530071 |
| **Instagram** | https://www.instagram.com/sinduja_boutique08/ |
| **Tagline** | "Your Style. Your Rule." |
| **Opening Hours** | Every day, 9:00 AM – 9:00 PM |
| **Boutique Address** | Location details coming soon. |

---

## 🎨 Design Theme & Colors

- **Pristine White**: `#FFFFFF` (Primary dominant background)
- **Soft Blush Pink**: `#FFF5F6` / `#FDF0F3`
- **Rose Accent**: `#E08E9D` / `#C86D80`
- **Luxury Deep Berry**: `#7A223B`
- **Charcoal Noir**: `#1A1819`
- **Typography**: Cormorant Garamond / Playfair Display (Serif) & Inter (Sans-serif)

---

© 2026 Sinduja Boutique. All Rights Reserved.
