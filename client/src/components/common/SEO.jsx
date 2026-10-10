import React, { useEffect } from 'react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const SEO = ({ 
  title, 
  description = "Discover elegant women's fashion, designer silk sarees, bridal wear, bespoke blouses, and custom stitching at Sinduja Boutique.",
  canonical = "" 
}) => {
  useEffect(() => {
    // Update Page Title
    const fullTitle = title 
      ? `${title} | ${BUSINESS_CONFIG.name} — ${BUSINESS_CONFIG.tagline}`
      : `${BUSINESS_CONFIG.name} — ${BUSINESS_CONFIG.tagline} | Designer Wear & Bespoke Stitching`;
    document.title = fullTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};

export default SEO;
