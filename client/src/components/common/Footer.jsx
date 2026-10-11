import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import waLogo from '../../assets/whatsapp-logo.png';
import igLogo from '../../assets/insta-logo.png';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const Footer = () => {
  return (
    <footer className="bg-boutique-charcoal text-white pt-10 pb-28 md:pb-10 border-t border-boutique-charcoalLight/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-14 h-14 rounded-full bg-white p-1 shadow-md flex items-center justify-center overflow-hidden border border-boutique-pink/30 group-hover:scale-105 transition-transform flex-shrink-0">
                <img src={logoImg} alt={BUSINESS_CONFIG.name} className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white block group-hover:text-boutique-pink transition-colors">
                  SINDUJA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-boutique-pink uppercase block font-semibold">
                  BOUTIQUE
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Elevating women's ethnic fashion with bespoke blouse designing, custom tailoring, bridal trousseau, and curated celebration ensembles.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-boutique-charcoalLight flex items-center justify-center hover:opacity-80 transition-all transform hover:-translate-y-1 overflow-hidden"
                aria-label="Instagram"
              >
                <img src={igLogo} alt="Instagram" className="w-full h-full object-cover" />
              </a>
              <a
                href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-boutique-charcoalLight flex items-center justify-center hover:opacity-80 transition-all transform hover:-translate-y-1 overflow-hidden"
                aria-label="WhatsApp"
              >
                <img src={waLogo} alt="WhatsApp" className="w-full h-full object-cover" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wider text-boutique-pink uppercase mb-4">
              Explore Showroom
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-boutique-pink transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-boutique-pink transition-colors">About Sinduja</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-boutique-pink transition-colors">Curated Collections</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-boutique-pink transition-colors">Bespoke Stitching Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-boutique-pink transition-colors">Atelier Gallery</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-boutique-pink transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-boutique-pink transition-colors">Contact & Visit</Link>
              </li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wider text-boutique-pink uppercase mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/collections?tab=Sarees" className="hover:text-boutique-pink transition-colors">Soft Silk & Cotton Sarees</Link>
              </li>
              <li>
                <Link to="/products?category=chudidar-3pcs" className="hover:text-boutique-pink transition-colors">Chudidar (3 Pcs) & Suits</Link>
              </li>
              <li>
                <Link to="/products?category=co-ord-set" className="hover:text-boutique-pink transition-colors">Co-ord Sets & Kurtis</Link>
              </li>
              <li>
                <Link to="/products?category=ready-made-blouse" className="hover:text-boutique-pink transition-colors">Ready Made Blouses</Link>
              </li>
              <li>
                <Link to="/collections?tab=Jewels" className="hover:text-boutique-pink transition-colors">Harams, Jhumkas & Bangles</Link>
              </li>
              <li>
                <Link to="/collections?tab=Fancy" className="hover:text-boutique-pink transition-colors">Fancy Accessories & Cosmetics</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-boutique-pink uppercase mb-4">
              Boutique Hours & Contact
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <Clock className="w-4 h-4 text-boutique-pink mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Opening Hours</p>
                  <p className="text-gray-400">{BUSINESS_CONFIG.openingHours}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-4 h-4 text-boutique-pink mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Direct Phone</p>
                  <a href={BUSINESS_CONFIG.getCallUrl()} className="text-gray-400 hover:text-boutique-pink transition-colors">
                    {BUSINESS_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <img src={igLogo} alt="Instagram" className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 rounded-sm" />
                <div>
                  <p className="font-medium text-white">Instagram</p>
                  <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-boutique-pink transition-colors">
                    {BUSINESS_CONFIG.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-boutique-pink mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Boutique Location</p>
                  <p className="text-gray-400">{BUSINESS_CONFIG.address}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-boutique-charcoalLight/50 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3 text-center sm:text-left">
          <p>© {BUSINESS_CONFIG.year} {BUSINESS_CONFIG.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end">
            <span>Designed for {BUSINESS_CONFIG.owner}'s Fashion Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
