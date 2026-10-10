import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Phone, ArrowLeft, Scissors, Check, Sparkles, ShieldCheck, Share2, Heart } from 'lucide-react';
import SEO from '../components/common/SEO';
import ProductGallery from '../components/products/ProductGallery';
import ProductCard from '../components/products/ProductCard';
import SampleNoticeBadge from '../components/common/SampleNoticeBadge';
import { getProductBySlug, getProducts } from '../services/api';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        const prod = await getProductBySlug(slug);
        if (prod) {
          setProduct(prod);
          if (prod.sizes && prod.sizes.length > 0) setSelectedSize(prod.sizes[0]);
          if (prod.colors && prod.colors.length > 0) setSelectedColor(prod.colors[0]);

          // Load related products
          const related = await getProducts({ category: prod.categorySlug });
          setRelatedProducts(related.filter(p => (p.slug || p.id) !== (prod.slug || prod.id)).slice(0, 4));
        }
      } catch (err) {
        console.error('Error loading product detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-boutique-blushMedium rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-boutique-blushMedium rounded w-48 mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-boutique-charcoal mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The requested product could not be found or has been updated.</p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 rounded-full bg-boutique-berry text-white text-xs uppercase font-bold tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const customEnquiryParam = `${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''}${selectedColor ? ` (Color: ${selectedColor})` : ''}`;
  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppUrl('product', customEnquiryParam);

  return (
    <div className="bg-white py-8 sm:py-12">
      <SEO 
        title={product.name} 
        description={`${product.description.slice(0, 150)}... Enquire now at Sinduja Boutique.`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center justify-between mb-8 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-boutique-berry transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-boutique-berry transition-colors">Collections</Link>
            <span>/</span>
            <Link to={`/products?category=${product.categorySlug}`} className="hover:text-boutique-berry transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-boutique-charcoal font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-boutique-blush hover:bg-boutique-blushMedium text-boutique-charcoal transition-colors"
            title="Share this product"
          >
            <Share2 className="w-3.5 h-3.5 text-boutique-rose" />
            <span className="text-[11px] font-medium">{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Product Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery 
              images={product.images} 
              productName={product.name} 
              category={product.category}
            />
          </div>

          {/* Right: Product Details & WhatsApp Conversion Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-boutique-rose bg-boutique-blushMedium/60">
                {product.category}
              </span>
              {product.newArrival && (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-boutique-berry text-white">
                  New Arrival
                </span>
              )}
              {product.customizable && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-boutique-blush text-boutique-deepRose border border-boutique-pink/30 flex items-center">
                  <Scissors className="w-3 h-3 mr-1" />
                  Custom Stitching Available
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-boutique-charcoal leading-snug">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-light block">Boutique Price:</span>
                <span className="font-serif text-2xl font-bold text-boutique-charcoal tracking-wide">
                  {product.price}
                </span>
              </div>
              <span className="text-[11px] font-medium text-boutique-deepRose bg-white px-3 py-1 rounded-full border border-boutique-pink/30">
                Direct Atelier Enquiry
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Design Overview</h3>
              <p className="text-gray-700 text-sm sm:text-base font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material & Specs */}
            {product.material && (
              <div className="text-xs text-gray-600 flex items-center space-x-2">
                <span className="font-semibold text-boutique-charcoal">Fabric / Material:</span>
                <span className="px-2.5 py-0.5 rounded bg-boutique-blush border border-boutique-blushMedium font-medium">{product.material}</span>
              </div>
            )}

            {/* Sizes Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Available Sizes / Fit Options:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                        selectedSize === size
                          ? 'bg-boutique-berry text-white border-boutique-berry shadow-sm'
                          : 'bg-white text-boutique-charcoal border-boutique-blushMedium hover:bg-boutique-blush'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Color Palette Options:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        selectedColor === color
                          ? 'bg-boutique-blushMedium text-boutique-berry border-boutique-rose font-bold'
                          : 'bg-white text-gray-700 border-boutique-blushMedium hover:bg-boutique-blush'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Guarantee Note */}
            <div className="p-4 rounded-2xl bg-boutique-blush/40 border border-dashed border-boutique-rose/40 flex items-start space-x-3">
              <Scissors className="w-5 h-5 text-boutique-deepRose mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700 leading-relaxed font-light">
                <strong className="font-semibold text-boutique-charcoal">Need a custom measurement or embroidery?</strong>
                <p className="mt-0.5">Sinduja provides one-on-one measurement consultations to tailor this design to your exact body fit and sleeve/neckline preferences.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-4 px-6 rounded-full text-xs uppercase font-bold tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href={BUSINESS_CONFIG.getCallUrl()}
                className="w-full flex items-center justify-center py-3.5 px-6 rounded-full text-xs uppercase font-bold tracking-widest text-boutique-charcoal bg-white border border-boutique-rose/50 hover:bg-boutique-blush transition-all"
              >
                <Phone className="w-4 h-4 mr-2 text-boutique-rose" />
                <span>Call Boutique ({BUSINESS_CONFIG.phoneDisplay})</span>
              </a>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-4 border-t border-boutique-blushMedium flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-gray-400 mr-2 font-medium">Tags:</span>
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-boutique-blushMedium">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-boutique-charcoal mb-8">
              More in {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id || rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
