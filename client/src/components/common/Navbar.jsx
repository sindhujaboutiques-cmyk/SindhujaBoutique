import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Clock, Menu, X, ChevronRight, Lock } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import waLogo from '../../assets/whatsapp-logo.png';
import igLogo from '../../assets/insta-logo.png';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/collections' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-boutique-charcoal text-white text-xs py-2 px-4 border-b border-boutique-charcoalLight tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-boutique-pink font-medium">
              Bespoke Tailoring & Designer Boutique
            </span>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <span className="hidden sm:flex items-center text-gray-300">
              <Clock className="w-3 h-3 mr-1 text-gray-400" />
              {BUSINESS_CONFIG.openingHours}
            </span>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <a 
              href={BUSINESS_CONFIG.getCallUrl()} 
              className="flex items-center text-gray-200 hover:text-boutique-pink transition-colors font-medium"
            >
              <Phone className="w-3 h-3 mr-1.5 text-boutique-pink" />
              {BUSINESS_CONFIG.phoneDisplay}
            </a>
            <a 
              href={BUSINESS_CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-gray-200 hover:opacity-80 transition-opacity"
              title="Instagram"
            >
              <img src={igLogo} alt="Instagram" className="w-4 h-4 mr-1 rounded-sm" />
              <span className="hidden md:inline">{BUSINESS_CONFIG.instagramHandle}</span>
            </a>
            <Link 
              to="/admin" 
              className="flex items-center text-boutique-pink hover:text-white transition-colors text-[11px] font-semibold px-2 py-0.5 rounded bg-boutique-charcoalLight hover:bg-boutique-berry/60"
              title="Sinduja Boutique Owner Login Portal"
            >
              <Lock className="w-3 h-3 mr-1 text-boutique-pink" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'glass-header shadow-luxury py-3' 
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-boutique-blushMedium'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link to="/" className="group flex items-center">
            <img src={logoImg} alt={BUSINESS_CONFIG.name} className="h-12 sm:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 text-sm font-medium tracking-wide transition-all rounded-full ${
                  isActive(link.path)
                    ? 'text-boutique-berry font-semibold bg-boutique-blushMedium/60'
                    : 'text-boutique-charcoal/80 hover:text-boutique-berry hover:bg-boutique-blush/80'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-boutique-rose rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-boutique-berry hover:bg-boutique-deepRose shadow-luxury transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <img src={waLogo} alt="WhatsApp" className="w-4 h-4 mr-1.5" />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <a
              href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-boutique-blush hover:bg-boutique-blushMedium transition-colors"
              aria-label="WhatsApp Enquire"
            >
              <img src={waLogo} alt="WhatsApp" className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-boutique-charcoal hover:text-boutique-berry hover:bg-boutique-blush focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-boutique-blushMedium">
                <img src={logoImg} alt={BUSINESS_CONFIG.name} className="h-10 w-auto object-contain" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-boutique-blush text-gray-500 hover:text-boutique-charcoal"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-boutique-blushMedium text-boutique-berry font-bold'
                        : 'text-gray-700 hover:bg-boutique-blush hover:text-boutique-berry'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-boutique-rose/60" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-boutique-blushMedium space-y-3">
              <a
                href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-full bg-boutique-berry text-white font-medium text-xs tracking-wider uppercase hover:bg-boutique-deepRose transition-colors shadow-sm"
              >
                <img src={waLogo} alt="WhatsApp" className="w-4 h-4 mr-2" />
                Enquire on WhatsApp
              </a>

              <a
                href={BUSINESS_CONFIG.getCallUrl()}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-full border border-boutique-rose text-boutique-berry font-medium text-xs tracking-wider uppercase hover:bg-boutique-blush transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-boutique-rose" />
                Call {BUSINESS_CONFIG.phoneDisplay}
              </a>

              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500">
                <p>{BUSINESS_CONFIG.openingHours}</p>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-boutique-berry font-semibold flex items-center hover:underline">
                  <Lock className="w-3 h-3 mr-1" />
                  Owner Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
