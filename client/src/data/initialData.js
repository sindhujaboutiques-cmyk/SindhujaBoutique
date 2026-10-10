/**
 * Client Data fallback for Sinduja Boutique
 * Strictly updated to only requested boutique categories:
 * - Sarees: Soft Silk, Semi Silk, Malmal Cotton, Kanchi Cotton, Kalyani Cotton, Ambika Cotton, Linen Cotton, Tussar Silks, Art Silk, Cora Cotton, Synthetic Crepe
 * - Outfits & Daily: Chudidar (3pcs), Co-ord Set, Cotton Pants, Kurtis, Shimmer Legging, Ready Made Blouse, Inskirt, Inners, Dupata, Nighties
 * - Jewels: Long Chains, Neck Set, Haram, Anklet, Ring, Stud, Jhumkas, Bracelets, Bangles
 * - Fancy & Cosmetics: Hair Accessories, Choker, Lipstick, Eyeliner, Kajal, Eyebrow Pencil, Mascara, Nail Polish, Nail Polish Remover, Bindi
 * (No Men's or Kids' sections)
 */

export const INITIAL_CATEGORIES = [
  // --- SAREES ---
  {
    id: 'cat-soft-silk-sarees',
    name: 'Soft Silk Sarees',
    slug: 'soft-silk-sarees',
    description: 'Lightweight, feather-soft silk sarees with delicate copper and gold zari borders for festive grace.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-semi-silk-saree',
    name: 'Semi Silk Saree',
    slug: 'semi-silk-saree',
    description: 'Lustrous, easy-to-drape semi silk sarees crafted with radiant body motifs and rich pallu finish.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-malmal-cotton',
    name: 'Malmal Cotton Saree',
    slug: 'malmal-cotton',
    description: 'Ultra-breathable and airy Mulmul cotton sarees with authentic floral prints and summer comfort.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-kanchi-cotton-saree',
    name: 'Kanchi Cotton Saree',
    slug: 'kanchi-cotton-saree',
    description: 'Traditional Kanchipuram handloom cotton sarees with quintessential temple border detailing.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-kalyani-cotton-saree',
    name: 'Kalyani Cotton Saree',
    slug: 'kalyani-cotton-saree',
    description: 'Classic South Indian Kalyani cotton sarees featuring contrast korvai borders and lightweight feel.',
    image: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: false
  },
  {
    id: 'cat-ambika-cotton',
    name: 'Ambika Cotton Saree',
    slug: 'ambika-cotton',
    description: 'Crisp, durable, and refined Ambika cotton drapes known for long-lasting color and daily elegance.',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: false
  },
  {
    id: 'cat-linen-cotton',
    name: 'Linen Cotton Saree',
    slug: 'linen-cotton',
    description: 'Modern organic linen cotton sarees blending minimalist artistic aesthetics with soothing textures.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-tussar-silks',
    name: 'Tussar Silks',
    slug: 'tussar-silks',
    description: 'Richly textured wild Tussar silk sarees with earthy natural luster and hand-block prints.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: true
  },
  {
    id: 'cat-art-silk',
    name: 'Art Silk Saree',
    slug: 'art-silk',
    description: 'Vibrant celebratory art silk sarees featuring dense zari work and eye-catching celebratory palettes.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: false
  },
  {
    id: 'cat-cora-cotton',
    name: 'Cora Cotton Saree',
    slug: 'cora-cotton',
    description: 'Sheer, crisp Cora cotton sarees adorned with delicate antique zari buttas and woven borders.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: false
  },
  {
    id: 'cat-synthethic-creep',
    name: 'Synthetic Crepe Saree',
    slug: 'synthethic-creep',
    description: 'Wrinkle-resistant, flowy synthetic crepe drapes designed for all-day comfort and easy care.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Sarees',
    featured: false
  },

  // --- OUTFITS & DAILY ESSENTIALS ---
  {
    id: 'cat-chudidar-3pcs',
    name: 'Chudidar (3 Pcs)',
    slug: 'chudidar-3pcs',
    description: 'Complete 3-piece sets with tailored kurta, matching churidar/pant, and handcrafted matching dupatta.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: true
  },
  {
    id: 'cat-co-ord-set',
    name: 'Co-ord Set',
    slug: 'co-ord-set',
    description: 'Chic matching 2-piece coordinates in breathable cotton and festive cuts for effortless modern style.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: true
  },
  {
    id: 'cat-cotton-pants',
    name: 'Cotton Pants',
    slug: 'cotton-pants',
    description: 'High-comfort stretch cotton ankle pants and straight trousers tailored with pockets.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },
  {
    id: 'cat-kurtis',
    name: 'Kurtis',
    slug: 'kurtis',
    description: 'Comfortable everyday and festive designer kurtis in straight, A-line, and flared silhouettes.',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: true
  },
  {
    id: 'cat-shimmer-leggin',
    name: 'Shimmer Leggings',
    slug: 'shimmer-leggin',
    description: 'Premium 4-way stretchable shimmer leggings that add sparkle to festive kurtas and tunics.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },
  {
    id: 'cat-ready-made-blouse',
    name: 'Ready Made Blouse',
    slug: 'ready-made-blouse',
    description: 'Padded and stretchable designer readymade blouses ready to wear for immediate styling.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: true
  },
  {
    id: 'cat-inskirt',
    name: 'Inskirt (Petticoat)',
    slug: 'inskirt',
    description: 'Pure 100% cotton 8-panel saree inskirts and seamless shapewear for sleek saree draping.',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },
  {
    id: 'cat-inners',
    name: 'Inners & Slips',
    slug: 'inners',
    description: 'Breathable, soft cotton slips, camisoles, and daily innerwear essentials for women.',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },
  {
    id: 'cat-dupata',
    name: 'Dupatta',
    slug: 'dupata',
    description: 'Exquisite banarasi, organza, chanderi, and embroidered statement dupattas.',
    image: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },
  {
    id: 'cat-nighties',
    name: 'Nighties',
    slug: 'nighties',
    description: 'Soft 100% cotton nightdresses, feeding nighties, and comfortable loungewear robes.',
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=800&q=80',
    parentCategory: "Women's Wear",
    featured: false
  },

  // --- JEWELS ---
  {
    id: 'cat-long-chains',
    name: 'Long Chains',
    slug: 'long-chains',
    description: 'One-gram gold finish long chains, kasu malai, and layered chains for festive grandeur.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: true
  },
  {
    id: 'cat-neck-set',
    name: 'Neck Set',
    slug: 'neck-set',
    description: 'Festive and bridal necklace sets complete with matching earrings and stone accents.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: true
  },
  {
    id: 'cat-haram',
    name: 'Haram',
    slug: 'haram',
    description: 'Opulent antique temple harams, Lakshmi harams, and peacock motif festive jewellery.',
    image: 'https://images.unsplash.com/photo-1611591475155-42ac62040eff?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: true
  },
  {
    id: 'cat-anklet',
    name: 'Anklet',
    slug: 'anklet',
    description: 'Fine silver-look and gold-look ghungroo payals, daily wear anklets, and black-bead charms.',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: false
  },
  {
    id: 'cat-ring',
    name: 'Ring',
    slug: 'ring',
    description: 'Adjustable statement cocktail finger rings with kundan, AD stones, and antique motifs.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: false
  },
  {
    id: 'cat-stud',
    name: 'Stud',
    slug: 'stud',
    description: 'Sparkling stone studs, daily-wear floral ear tops, and traditional ruby kemp studs.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: false
  },
  {
    id: 'cat-jhumkas',
    name: 'Jhumkas',
    slug: 'jhumkas',
    description: 'Traditional bell-shaped South Indian jhumkas with pearl hangings and ruby emerald stones.',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: true
  },
  {
    id: 'cat-bracelets',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Delicate charm bracelets, cuff bangles, and sparkling wrist wear for everyday style.',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: false
  },
  {
    id: 'cat-bangles',
    name: 'Bangles',
    slug: 'bangles',
    description: 'Traditional metal, silk thread, and gold-plated kangan bangles in all sizes.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Jewels',
    featured: false
  },

  // --- FANCY & COSMETICS ---
  {
    id: 'cat-hair-accesories',
    name: 'Hair Accessories',
    slug: 'hair-accesories',
    description: 'Decorative hair combs, bridal jadai pins, banana clips, scrunchies, and pearl hairpins.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: true
  },
  {
    id: 'cat-choker',
    name: 'Choker',
    slug: 'choker',
    description: 'Trendy close-fitting statement chokers in velvet, pearls, kundan, and western beads.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: true
  },
  {
    id: 'cat-lipstick',
    name: 'Lipstick',
    slug: 'lipstick',
    description: 'Long-stay matte, satin, and rich hydration lipsticks in flattering festive Indian shades.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: true
  },
  {
    id: 'cat-eyeliner',
    name: 'Eyeliner',
    slug: 'eyeliner',
    description: 'Waterproof smudge-free sketch, liquid, and pen eyeliners for precise eye definition.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-kajal',
    name: 'Kajal',
    slug: 'kajal',
    description: 'Smudge-proof herbal 24-hour jet black kajal for expressive, deep eye enhancement.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-eyebrow-pencil',
    name: 'Eyebrow Pencil',
    slug: 'eyebrow-pencil',
    description: 'Dual-ended eyebrow defining pencil with spoolie for natural hair-like brow strokes.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-maskara',
    name: 'Mascara',
    slug: 'maskara',
    description: 'Instant lash-volumizing and lengthening waterproof black curl mascara.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-nail-polish',
    name: 'Nail Polish',
    slug: 'nail-polish',
    description: 'Quick-drying high-gloss nail enamels in bridal reds, pastels, glitters, and nudes.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-nail-polish-remover',
    name: 'Nail Polish Remover',
    slug: 'nail-polish-remover',
    description: 'Acetone-free nourishing nail polish remover wipes and liquid enriched with Vitamin E.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: false
  },
  {
    id: 'cat-bindi',
    name: 'Bindi',
    slug: 'bindi',
    description: 'Traditional round velvet bindis, stone-studded designer bindis, and bridal bindi sheets.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    parentCategory: 'Fancy',
    featured: true
  }
];

export const INITIAL_PRODUCTS = [
  // --- SAREES PRODUCTS ---
  {
    id: 'prod-1',
    name: 'Soft Silk Saree with Copper Zari Border',
    slug: 'soft-silk-saree-copper-zari',
    category: 'Soft Silk Sarees',
    categorySlug: 'soft-silk-sarees',
    description: 'Lightweight, easy-to-drape Soft Silk Saree woven with delicate copper zari pallu and contrast blouse piece. Perfect for family celebrations and temple visits.',
    price: '₹2,499',
    originalPrice: '₹3,200',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size (Includes Blouse Piece)'],
    colors: ['Wine Violet', 'Rose Pink', 'Peacock Blue', 'Bottle Green'],
    material: 'Pure Soft Silk Blend',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Soft Silk', 'Festive Saree', 'Best Seller'],
    isSampleData: true
  },
  {
    id: 'prod-2',
    name: 'Festive Semi Silk Saree with Rich Brocade Pallu',
    slug: 'semi-silk-saree-brocade-pallu',
    category: 'Semi Silk Saree',
    categorySlug: 'semi-silk-saree',
    description: 'Graceful Semi Silk saree in rich jewel tones with all-over floral buttas and traditional zari pallu.',
    price: '₹1,899',
    originalPrice: '₹2,500',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size'],
    colors: ['Royal Crimson', 'Mustard Gold', 'Teal Green'],
    material: 'Semi Silk with Zari Weave',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: false,
    tags: ['Semi Silk', 'Wedding Guest', 'Festive'],
    isSampleData: true
  },
  {
    id: 'prod-3',
    name: 'Jaipuri Printed Pure Malmal Cotton Saree',
    slug: 'jaipuri-printed-malmal-cotton-saree',
    category: 'Malmal Cotton Saree',
    categorySlug: 'malmal-cotton',
    description: 'Feather-light 100% mulmul cotton saree with soothing block prints. Softest drape for daily and office wear.',
    price: '₹1,199',
    originalPrice: '₹1,599',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size'],
    colors: ['Indigo Blue', 'Pastel Sage', 'Ruby Floral'],
    material: '100% Pure Mulmul Cotton',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Malmal Cotton', 'Daily Wear', 'Cool Cotton'],
    isSampleData: true
  },
  {
    id: 'prod-4',
    name: 'Kanchi Cotton Saree with Traditional Temple Border',
    slug: 'kanchi-cotton-saree-temple-border',
    category: 'Kanchi Cotton Saree',
    categorySlug: 'kanchi-cotton-saree',
    description: 'Authentic handwoven Kanchi cotton saree with intricate geometric temple border and vibrant contrast pallu.',
    price: '₹1,650',
    originalPrice: '₹2,100',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size'],
    colors: ['Maroon & Mustard', 'Forest Green & Orange', 'Navy & Pink'],
    material: 'Pure Handloom Cotton',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: true,
    tags: ['Kanchi Cotton', 'Traditional', 'Temple Border'],
    isSampleData: true
  },
  {
    id: 'prod-5',
    name: 'Handcrafted Tussar Silk Saree with Zari Motifs',
    slug: 'handcrafted-tussar-silk-saree',
    category: 'Tussar Silks',
    categorySlug: 'tussar-silks',
    description: 'Organic texture Tussar Silk saree with gold zari pallu and subtle contrast border. Elegant and regal for receptions.',
    price: '₹3,499',
    originalPrice: '₹4,500',
    images: [
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size'],
    colors: ['Natural Beige & Red', 'Golden Tussar & Black'],
    material: 'Pure Tussar Silk',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Tussar Silk', 'Luxury', 'Handcrafted'],
    isSampleData: true
  },

  // --- OUTFITS & DAILY WEAR PRODUCTS ---
  {
    id: 'prod-6',
    name: 'Designer 3-Piece Chudidar Set with Chiffon Dupatta',
    slug: 'designer-3piece-chudidar-set',
    category: 'Chudidar (3 Pcs)',
    categorySlug: 'chudidar-3pcs',
    description: 'Complete 3-piece ready ensemble featuring neck embroidery kurta, matching cotton churidar, and floral chiffon dupatta.',
    price: '₹1,799',
    originalPrice: '₹2,399',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', 'Custom Tailored'],
    colors: ['Rani Pink', 'Mint Green', 'Powder Blue', 'Mauve'],
    material: 'Cotton Silk Blend with Soft Lining',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Chudidar 3pc', 'Suit Set', 'Bespoke Fit'],
    isSampleData: true
  },
  {
    id: 'prod-7',
    name: 'Ethnic Printed Cotton Co-ord Set (Top & Trousers)',
    slug: 'ethnic-printed-cotton-coord-set',
    category: 'Co-ord Set',
    categorySlug: 'co-ord-set',
    description: 'Trendy 2-piece co-ord set with stylish collared tunic and matching straight-fit pocket trousers. Modern Indian silhouette.',
    price: '₹1,299',
    originalPrice: '₹1,799',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['34 (S)', '36 (M)', '38 (L)', '40 (XL)'],
    colors: ['Olive Green Floral', 'Dusty Rose Geometric', 'Navy Paisley'],
    material: '100% Breathable Cotton',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Co-ord Set', 'Western Fusion', 'Chic Casual'],
    isSampleData: true
  },
  {
    id: 'prod-8',
    name: 'Straight Fit Stretchable Cotton Pants with Pocket',
    slug: 'straight-fit-stretchable-cotton-pants',
    category: 'Cotton Pants',
    categorySlug: 'cotton-pants',
    description: 'Versatile ankle-length cotton pants with side pocket and elasticated back waistband. Matches any kurti effortlessly.',
    price: '₹499',
    originalPrice: '₹699',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size (28-36)', 'Plus Size (38-44)'],
    colors: ['Off White', 'Jet Black', 'Golden Beige', 'Maroon', 'Navy'],
    material: 'Cotton Lycra Stretch',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: false,
    tags: ['Cotton Pants', 'Kurti Bottoms', 'Daily Essential'],
    isSampleData: true
  },
  {
    id: 'prod-9',
    name: 'A-Line Pure Cotton Daily Wear Kurti',
    slug: 'aline-pure-cotton-daily-kurti',
    category: 'Kurtis',
    categorySlug: 'kurtis',
    description: 'Breezy everyday A-line kurti with wooden button neck detailing and side slits. All-day comfort.',
    price: '₹699',
    originalPrice: '₹950',
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['36 (S)', '38 (M)', '40 (L)', '42 (XL)', '44 (XXL)'],
    colors: ['Mustard Yellow', 'Teal Blue', 'Coral Pink'],
    material: '100% Cotton',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Kurti', 'Daily Wear', 'Cotton Kurti'],
    isSampleData: true
  },
  {
    id: 'prod-10',
    name: 'Padded Brocade Designer Ready Made Blouse',
    slug: 'padded-brocade-designer-readymade-blouse',
    category: 'Ready Made Blouse',
    categorySlug: 'ready-made-blouse',
    description: 'Ready-to-wear padded blouse with round back dori tassels and pure banarasi brocade weave. Alterable seam included.',
    price: '₹899',
    originalPrice: '₹1,250',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['34 (Alterable to 38)', '38 (Alterable to 42)'],
    colors: ['Antique Gold', 'Rani Pink', 'Crimson Red', 'Emerald Green'],
    material: 'Brocade & Silk Blend with Inner Cotton Lining',
    customizable: true,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Readymade Blouse', 'Saree Blouse', 'Padded Blouse'],
    isSampleData: true
  },
  {
    id: 'prod-11',
    name: 'Pure Cotton 8-Panel Saree Inskirt (Petticoat)',
    slug: 'pure-cotton-8panel-saree-inskirt',
    category: 'Inskirt (Petticoat)',
    categorySlug: 'inskirt',
    description: 'Heavy pure cotton 8-kali stitched inskirt with durable cotton drawstring. Perfectly tailored for flawless saree pleating.',
    price: '₹299',
    originalPrice: '₹399',
    images: [
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Standard 38 inch Length', 'Long 40 inch Length'],
    colors: ['Golden Yellow', 'Rani Pink', 'Maroon', 'Bottle Green', 'Black', 'White'],
    material: '100% Pure Cambric Cotton',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: false,
    tags: ['Inskirt', 'Petticoat', 'Saree Essential'],
    isSampleData: true
  },
  {
    id: 'prod-12',
    name: 'Soft Cotton Printed Nighty with Yoke Piping',
    slug: 'soft-cotton-printed-nighty',
    category: 'Nighties',
    categorySlug: 'nighties',
    description: 'Feather-soft cotton maxi night dress with front zip opening, gentle pleating, and attractive floral prints.',
    price: '₹550',
    originalPrice: '₹750',
    images: [
      'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Free Size (Comfort Fit)', 'XL/XXL'],
    colors: ['Rose Floral', 'Indigo Blue', 'Lavender Grey'],
    material: '100% Premium Cotton',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: true,
    tags: ['Nighty', 'Cotton Loungewear', 'Nightwear'],
    isSampleData: true
  },

  // --- JEWELS PRODUCTS ---
  {
    id: 'prod-13',
    name: 'Antique Lakshmi Grand Temple Haram with Pearls',
    slug: 'antique-lakshmi-grand-temple-haram',
    category: 'Haram',
    categorySlug: 'haram',
    description: 'Traditional matte gold South Indian Lakshmi idol grand haram studded with kemp ruby stones and dangling cluster pearls.',
    price: '₹2,899',
    originalPrice: '₹3,800',
    images: [
      'https://images.unsplash.com/photo-1611591475155-42ac62040eff?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Adjustable Back Rope / Dori'],
    colors: ['Matte Gold with Ruby & Emerald'],
    material: 'Brass with 1-Gram Gold Polish & Kemp Stones',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Haram', 'Temple Jewellery', 'Bridal Jewels'],
    isSampleData: true
  },
  {
    id: 'prod-14',
    name: 'Traditional South Indian Kemp Jhumkas with Pearl Drops',
    slug: 'traditional-kemp-jhumkas-pearl-drops',
    category: 'Jhumkas',
    categorySlug: 'jhumkas',
    description: 'Classic bell jhumkas with peacock stud top, ruby kemp stone inlay, and rich cluster pearl hangings.',
    price: '₹699',
    originalPrice: '₹999',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Standard Ear Stud Fitting'],
    colors: ['Ruby Kemp Red & Gold', 'Ruby & Green'],
    material: 'Gold Plated Alloy with Synthetic Kemp Stones',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Jhumkas', 'Earrings', 'Kemp Jhumkas'],
    isSampleData: true
  },
  {
    id: 'prod-15',
    name: 'Festive Antique One-Gram Gold Neck Set with Earrings',
    slug: 'festive-antique-neck-set-with-earrings',
    category: 'Neck Set',
    categorySlug: 'neck-set',
    description: 'Short festive necklace set adorned with sparkling CZ and ruby stones, paired with matching drop earrings.',
    price: '₹1,499',
    originalPrice: '₹1,999',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Adjustable Chain / Dori'],
    colors: ['Antique Gold & Ruby'],
    material: 'High-Luster Micro Gold Plated Alloy',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: false,
    tags: ['Neck Set', 'Festive Jewels', 'Necklace'],
    isSampleData: true
  },
  {
    id: 'prod-16',
    name: 'Silver-Plated Floral Ghungroo Anklet (Payal Pair)',
    slug: 'silver-plated-floral-ghungroo-anklet',
    category: 'Anklet',
    categorySlug: 'anklet',
    description: 'Traditional pair of tinkling ghungroo anklets crafted with floral links and secure S-hook closure.',
    price: '₹399',
    originalPrice: '₹550',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Standard 10.5 Inch (Pair)'],
    colors: ['Oxidized Silver Finish', 'Gold Plated'],
    material: 'Silver-Plated Skin-Friendly Alloy',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: true,
    tags: ['Anklet', 'Payal', 'Ghungroo'],
    isSampleData: true
  },

  // --- FANCY & COSMETICS PRODUCTS ---
  {
    id: 'prod-17',
    name: 'Bridal Floral Hair Jadai Pin & Brooch Set',
    slug: 'bridal-floral-hair-jadai-pin-set',
    category: 'Hair Accessories',
    categorySlug: 'hair-accesories',
    description: 'Handcrafted floral hair bun clip and braid pins embellished with pearls and golden leaves for weddings.',
    price: '₹450',
    originalPrice: '₹650',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Set of 6 Hair Accessories'],
    colors: ['Gold & Pearl White', 'Rose Gold'],
    material: 'Flexible Alloy & Faux Pearls',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Hair Accessories', 'Bridal Jadai', 'Hair Clips'],
    isSampleData: true
  },
  {
    id: 'prod-18',
    name: 'Kundan Pearl Statement Choker Necklace',
    slug: 'kundan-pearl-statement-choker',
    category: 'Choker',
    categorySlug: 'choker',
    description: 'Glamorous broad kundan choker necklace with multiple layers of pearl beads and matching stud earrings.',
    price: '₹1,299',
    originalPrice: '₹1,850',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Adjustable Thread Tie'],
    colors: ['Gold & Pearl Ivory', 'Emerald Green & Gold'],
    material: 'Kundan & Freshwater-Look Beads',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: true,
    tags: ['Choker', 'Kundan Choker', 'Party Wear'],
    isSampleData: true
  },
  {
    id: 'prod-19',
    name: 'Long-Stay Matte Lipstick in Indian Festive Shades',
    slug: 'long-stay-matte-lipstick-festive',
    category: 'Lipstick',
    categorySlug: 'lipstick',
    description: 'Enriched with Vitamin E and almond oil, offering a velvety 12-hour transfer-resistant matte finish.',
    price: '₹299',
    originalPrice: '₹450',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['4.2g Standard Bullet'],
    colors: ['Royal Sindoor Red', 'Berry Rose', 'Warm Mocha Nude', 'Plum Wine'],
    material: 'Enriched with Vitamin E & Jojoba Oil',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: false,
    tags: ['Lipstick', 'Matte Lip Color', 'Cosmetics'],
    isSampleData: true
  },
  {
    id: 'prod-20',
    name: 'Herbal 24-Hr Smudge-Proof Jet Black Kajal',
    slug: 'herbal-smudge-proof-jet-black-kajal',
    category: 'Kajal',
    categorySlug: 'kajal',
    description: 'Ophthalmologist-tested intense jet black kajal made with natural castor oil and camphor for soothing bold eyes.',
    price: '₹180',
    originalPrice: '₹250',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['0.35g Retractable Stick'],
    colors: ['Deep Jet Black'],
    material: 'Natural Herbal Formulation',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: false,
    newArrival: true,
    tags: ['Kajal', 'Eye Makeup', 'Herbal'],
    isSampleData: true
  },
  {
    id: 'prod-21',
    name: 'Velvet Round Traditional Maroon Bindis (Multi-Size Sheet)',
    slug: 'velvet-round-maroon-bindis-sheet',
    category: 'Bindi',
    categorySlug: 'bindi',
    description: 'Premium skin-safe gum velvet bindis with subtle stone center. Assorted sizes from mini to festive large.',
    price: '₹60',
    originalPrice: '₹90',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'
    ],
    sizes: ['Assorted Multi-Size Sheet (30 Bindis)'],
    colors: ['Traditional Maroon', 'Jet Black', 'Ruby Red'],
    material: 'Skin-Friendly Velvet Felt with Safe Adhesive',
    customizable: false,
    available: true,
    stockStatus: 'In Stock',
    featured: true,
    newArrival: false,
    tags: ['Bindi', 'Velvet Bindi', 'Traditional'],
    isSampleData: true
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'serv-1',
    name: 'Bespoke Blouse Designing & Stitching',
    slug: 'bespoke-blouse-designing-stitching',
    tagline: 'Bridal & Designer',
    description: 'Personalized blouse cutting, aari handwork, zardozi embroidery, boat neck, and cut-work patterns customized to your measurements.',
    priceStartingAt: '₹650',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    features: ['Precise cup padding & lining', 'Aari & zardozi hand embroidery', 'Princess cut & high neck options']
  },
  {
    id: 'serv-2',
    name: 'Custom Chudidar & Salwar Tailoring',
    slug: 'custom-chudidar-salwar-tailoring',
    tagline: 'Tailored Fits',
    description: 'Perfect-fit tailoring for 3-piece chudidars, anarkalis, pant-cut suits, and daily wear kurtis with lining options.',
    priceStartingAt: '₹550',
    icon: 'Ruler',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    features: ['Anarkali, straight & umbrella cuts', 'Comfort elasticated cotton pants', 'Pant pockets and custom slit heights']
  },
  {
    id: 'serv-3',
    name: 'Saree Falls, Pico & Kuchu Work',
    slug: 'saree-falls-pico-kuchu',
    tagline: 'Saree Finishing',
    description: 'Fast turn-around saree fall stitching, zig-zag pico edging, and handcrafted silk thread kuchu tassels for grand silk sarees.',
    priceStartingAt: '₹150',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    features: ['Color-matched premium cotton falls', 'Neat rolled pico hem finish', 'Traditional silk thread kuchu tassels']
  }
];

export const INITIAL_GALLERY = [
  {
    id: 'gal-1',
    title: 'Pure Soft Silk Saree Styling',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    caption: 'Curated royal peacock soft silk drape draped for an engagement function.'
  },
  {
    id: 'gal-2',
    title: 'Antique Temple Lakshmi Haram',
    category: 'Jewels',
    image: 'https://images.unsplash.com/photo-1611591475155-42ac62040eff?auto=format&fit=crop&w=800&q=80',
    caption: 'Handcrafted matte finish temple haram paired with kemp jhumkas.'
  },
  {
    id: 'gal-3',
    title: 'Bespoke Readymade Designer Blouse',
    category: 'Women\'s Wear',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    caption: 'Intricate zardozi and kemp handwork blouse custom tailored in our atelier.'
  },
  {
    id: 'gal-4',
    title: 'Bridal Floral Hair Jadai Pin Arrangement',
    category: 'Fancy',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden leaf hair accessories styled for muhurtham traditional braid.'
  }
];


export const WHY_CHOOSE_US = [
  {
    icon: 'Scissors',
    title: 'Personalized Custom Stitching',
    description: 'Precise bespoke tailoring ensuring a tailored fit designed exclusively around your body shape and comfort.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Quality Craftsmanship',
    description: 'Attention to finishing, fine threadwork, premium lining, and detailing that ensures your garments look and feel luxurious.'
  },
  {
    icon: 'Layers',
    title: 'Curated Saree & Jewels Collection',
    description: 'From Soft Silk, Kanchi cotton, and Linen sarees to one-gram gold harams, jhumkas, cosmetics and daily essentials.'
  },
  {
    icon: 'Smile',
    title: 'Personal Friendly Service',
    description: 'Warm, dedicated personal assistance from fabric selection to styling advice and quick door delivery.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Direct WhatsApp Assistance',
    description: 'Chat directly with our boutique styling team for personalized video tours, custom measurements, and styling ideas.'
  },
  {
    icon: 'Sparkles',
    title: 'Exclusive Bridal & Festive Wear',
    description: 'Special bridal blouses, festive sarees, and matching jewellery sets curated for life\'s special occasions.'
  }
];
