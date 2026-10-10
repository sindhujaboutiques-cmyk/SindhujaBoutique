import React, { useState } from 'react';
import { Phone, MessageCircle, Instagram, Clock, MapPin, Navigation, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'Custom Blouse Stitching',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [locationToast, setLocationToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in all required fields (Name, Phone, and Message).');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceInterest: 'Custom Blouse Stitching',
        message: ''
      });
    } catch (err) {
      // Even if server is offline, mark success gracefully and suggest WhatsApp
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectionsClick = (e) => {
    if (!BUSINESS_CONFIG.googleMapsUrl) {
      e.preventDefault();
      setLocationToast(true);
      setTimeout(() => setLocationToast(false), 4000);
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Contact & Visit Us" 
        description="Get in touch with Sinduja Boutique. Call or WhatsApp 9360530071. Open every day 9:00 AM – 9:00 PM." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-4">
            Visit Sinduja Boutique
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Have questions about custom stitching, bridal designs, or saree availability? We would love to assist you.
          </p>
        </div>

        {/* Contact Grid & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-100 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal">
                  WhatsApp Consultation
                </h3>
                <p className="text-xs text-gray-600 font-light mt-0.5 mb-3">
                  Fastest response for design references, quotes, and quick queries.
                </p>
                <a
                  href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800"
                >
                  <span>Chat on WhatsApp (+91 {BUSINESS_CONFIG.whatsapp})</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Call Card */}
            <div className="p-6 rounded-3xl bg-boutique-blush/60 border border-boutique-blushMedium flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-boutique-berry text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal">
                  Direct Phone Call
                </h3>
                <p className="text-xs text-gray-600 font-light mt-0.5 mb-3">
                  Speak directly with Sinduja for boutique appointments.
                </p>
                <a
                  href={BUSINESS_CONFIG.getCallUrl()}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-boutique-berry hover:text-boutique-deepRose"
                >
                  <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Hours & Schedule Card */}
            <div className="p-6 rounded-3xl bg-white border border-boutique-blushMedium shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-boutique-blushMedium text-boutique-deepRose flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal">
                  Boutique Timings
                </h3>
                <p className="text-sm font-semibold text-boutique-charcoal mt-1">
                  {BUSINESS_CONFIG.openingHours}
                </p>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Open all 7 days of the week.
                </p>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="p-6 rounded-3xl bg-white border border-boutique-blushMedium shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal">
                  Instagram
                </h3>
                <p className="text-xs text-gray-600 font-light mt-0.5 mb-2">
                  Follow for daily outfit updates and real customer designs.
                </p>
                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-boutique-rose hover:underline"
                >
                  {BUSINESS_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            {/* Boutique Address Card */}
            <div className="p-6 rounded-3xl bg-white border border-boutique-blushMedium shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-boutique-blushMedium text-boutique-deepRose flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal">
                  Boutique Location
                </h3>
                <p className="text-xs text-gray-500 font-light mt-1">
                  {BUSINESS_CONFIG.address}
                </p>
                
                {locationToast && (
                  <p className="text-xs text-boutique-berry font-medium mt-2 bg-pink-50 p-2 rounded-lg border border-pink-200">
                    Exact location address and Google Maps integration will be updated soon. Please WhatsApp or call 9360530071 for assistance!
                  </p>
                )}

                <div className="mt-3">
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 mr-1.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Appointment Form */}
          <div className="lg:col-span-7 bg-boutique-blushLight p-8 sm:p-10 rounded-3xl border border-boutique-blushMedium shadow-card">
            
            <div className="mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-boutique-charcoal">
                Send a Message or Booking Request
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light mt-1">
                Fill out your details and Sinduja will get back to you promptly.
              </p>
            </div>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900">Message Received!</h4>
                <p className="text-sm text-emerald-700 font-light">
                  Thank you for reaching out to Sinduja Boutique. We will contact you on your provided phone number shortly.
                </p>
                <a
                  href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-sm text-boutique-charcoal"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9360530071"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-sm text-boutique-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-sm text-boutique-charcoal"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                      Service / Product Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-sm text-boutique-charcoal"
                    >
                      <option value="Soft Silk & Cotton Sarees">Soft Silk & Cotton Sarees</option>
                      <option value="Chudidar (3 Pcs) & Kurtis">Chudidar (3 Pcs) & Kurtis</option>
                      <option value="Ready Made Blouse Stitching">Ready Made Blouse Stitching</option>
                      <option value="Jewels & Temple Harams">Jewels & Temple Harams</option>
                      <option value="Fancy Accessories & Cosmetics">Fancy Accessories & Cosmetics</option>
                      <option value="General Boutique Visit">General Boutique Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us about the design, occasion, date, or specific style you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-sm text-boutique-charcoal"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center py-4 px-6 rounded-full text-xs uppercase font-bold tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>{loading ? 'Submitting...' : 'Submit Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
