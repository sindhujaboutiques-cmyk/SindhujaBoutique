import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileActionBar from './components/common/MobileActionBar';
import WhatsAppFloating from './components/common/WhatsAppFloating';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Collections from './pages/Collections';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import NewArrivals from './pages/NewArrivals';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Helper component to scroll to top whenever URL path changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen selection:bg-boutique-pink selection:text-white">
        
        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Floating WhatsApp Quick Action */}
        <WhatsAppFloating />

        {/* Sticky Mobile Action Bar (Call | WhatsApp | Directions) */}
        <MobileActionBar />

        {/* Global Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
