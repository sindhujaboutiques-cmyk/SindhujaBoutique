/**
 * Centralized Business Configuration for Sinduja Boutique Frontend
 * Modify any phone number, link, or business detail in this single file.
 */

export const BUSINESS_CONFIG = {
  name: 'Sinduja Boutique',
  owner: 'Sinduja',
  phone: '9360530071',
  phoneDisplay: '+91 93605 30071',
  phoneTel: '+919360530071',
  whatsapp: '9360530071',
  whatsappNumber: '919360530071',
  instagramUrl: 'https://www.instagram.com/sinduja_boutique08/',
  instagramHandle: '@sinduja_boutique08',
  tagline: 'Your Style. Your Rule.',
  subtitle: 'Discover elegant fashion, beautiful ethnic wear, designer sarees, bespoke blouses, and personalized designs crafted to match your unique style.',
  openingHours: 'Every day, 9:00 AM – 9:00 PM',
  address: '52A, Sri Guru Brindhavan Complex, Indira Nagar, MTP Road, Nsn palayam, Coimbatore, Tamil Nadu 641031',
  googleMapsUrl: 'https://share.google/bO2Dbk8bGUxWvLBWf',
  logoText: 'SINDUJA BOUTIQUE',
  logoSubtext: 'YOUR STYLE. YOUR RULE.',
  logoImage: null, // Ready for future custom logo upload
  currency: '₹',
  year: '2026',
  
  // WhatsApp Link Generators with prefilled messages
  getWhatsAppUrl: (messageType = 'general', customParam = '') => {
    const baseUrl = `https://wa.me/919360530071?text=`;
    let message = '';
    
    switch (messageType) {
      case 'product':
        message = `Hi Sinduja Boutique, I'm interested in ${customParam || 'your product'}. Could you please share more details about availability and pricing?`;
        break;
      case 'customStitching':
        message = 'Hi Sinduja Boutique, I would like to enquire about custom stitching services.';
        break;
      case 'blouseStitching':
        message = 'Hi Sinduja Boutique, I would like to enquire about custom blouse designing and stitching.';
        break;
      case 'bridal':
        message = 'Hi Sinduja Boutique, I would like to enquire about bridal wear collections and custom wedding outfits.';
        break;
      case 'service':
        message = `Hi Sinduja Boutique, I would like to enquire about your ${customParam || 'custom'} service.`;
        break;
      case 'general':
      default:
        message = 'Hi Sinduja Boutique, I would like to know more about your collections.';
        break;
    }
    
    return `${baseUrl}${encodeURIComponent(message)}`;
  },
  
  getCallUrl: () => 'tel:+919360530071',
  
  getDirectionsUrl: () => {
    // If google maps URL is defined, use it; otherwise null
    return BUSINESS_CONFIG.googleMapsUrl || null;
  }
};

export default BUSINESS_CONFIG;
