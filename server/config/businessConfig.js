/**
 * Centralized Business Configuration for Sinduja Boutique
 * All contact numbers, social links, opening hours, and default settings are maintained here.
 */
const businessConfig = {
  businessName: 'Sinduja Boutique',
  ownerName: 'Sinduja',
  phone: '9360530071',
  phoneDisplay: '+91 93605 30071',
  whatsapp: '9360530071',
  whatsappCountryCode: '91',
  instagram: 'https://www.instagram.com/sinduja_boutique08/',
  instagramHandle: '@sinduja_boutique08',
  tagline: 'Your Style. Your Rule.',
  description: 'Discover elegant fashion, beautiful ethnic wear, designer sarees, bespoke blouses, and personalized bridal wear crafted to match your unique style.',
  openingHours: 'Every day, 9:00 AM – 9:00 PM',
  openingTime: '09:00 AM',
  closingTime: '09:00 PM',
  address: '52A, Sri Guru Brindhavan Complex, Indira Nagar, MTP Road, Nsn palayam, Coimbatore, Tamil Nadu 641031',
  googleMapsUrl: 'https://share.google/bO2Dbk8bGUxWvLBWf',
  logoText: 'SINDUJA BOUTIQUE',
  logoSubtext: 'YOUR STYLE. YOUR RULE.',
  logoImage: null, // Ready for logo file upload or path
  currency: '₹',
  yearEstablished: '2026',
  
  // Dynamic WhatsApp prefilled message templates
  whatsappTemplates: {
    general: 'Hi Sinduja Boutique, I would like to know more about your collections.',
    productEnquiry: (productName) => `Hi Sinduja Boutique, I'm interested in ${productName}. Could you please share more details about availability and pricing?`,
    customStitching: 'Hi Sinduja Boutique, I would like to enquire about custom stitching services.',
    blouseStitching: 'Hi Sinduja Boutique, I would like to enquire about custom blouse designing and stitching.',
    bridalEnquiry: 'Hi Sinduja Boutique, I would like to enquire about bridal wear collections and custom wedding outfits.',
    serviceEnquiry: (serviceName) => `Hi Sinduja Boutique, I would like to enquire about your ${serviceName} service.`
  }
};

module.exports = businessConfig;
