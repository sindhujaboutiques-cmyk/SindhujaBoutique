import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileActionBar from './components/common/MobileActionBar';
import WhatsAppFloating from './components/common/WhatsAppFloating';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';

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
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

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
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen selection:bg-boutique-pink selection:text-white">
          
          {/* Global Navigation Header */}
          <Navbar />

          {/* Global Shopping Bag Slide-over Drawer */}
          <CartDrawer />

          {/* Dynamic Route Pages */}
          <main className="flex-grow pb-20 md:pb-0">
            <ErrorBoundary>
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
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/admin" element={<Admin />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </ErrorBoundary>
          </main>

        {/* Global Floating WhatsApp Quick Action */}
        <WhatsAppFloating />

        {/* Sticky Mobile Action Bar (Call | WhatsApp | Directions) */}
        <MobileActionBar />

        {/* Global Footer */}
        <Footer />

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
