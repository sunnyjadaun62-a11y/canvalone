import type { CanvasDimensions, Template } from '../types/canvas';

export const CANVAS_PRESETS: CanvasDimensions[] = [
  { name: 'Instagram Post (1:1)', width: 1080, height: 1080, category: 'Social Media' },
  { name: 'Instagram Story / Reel (9:16)', width: 1080, height: 1920, category: 'Social Media' },
  { name: 'YouTube Thumbnail (16:9)', width: 1280, height: 720, category: 'Video' },
  { name: 'Presentation Slide (16:9)', width: 1920, height: 1080, category: 'Document' },
  { name: 'A4 Document / Flyer', width: 1240, height: 1754, category: 'Print' },
  { name: 'Business Card', width: 1050, height: 600, category: 'Print' },
  { name: 'Facebook Banner', width: 1200, height: 630, category: 'Social Media' },
  { name: 'Square Artboard (800x800)', width: 800, height: 800, category: 'Custom' },
];

export const FONT_FAMILIES = [
  { name: 'Inter (Sans)', family: "'Inter', sans-serif" },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
  { name: 'Poppins (Modern)', family: "'Poppins', sans-serif" },
  { name: 'Montserrat (Geometric)', family: "'Montserrat', sans-serif" },
  { name: 'Outfit (Clean)', family: "'Outfit', sans-serif" },
  { name: 'Playfair Display (Luxury)', family: "'Playfair Display', serif" },
  { name: 'Merriweather (Editorial)', family: "'Merriweather', serif" },
  { name: 'Lora (Classic Serif)', family: "'Lora', serif" },
  { name: 'Cinzel (Classical)', family: "'Cinzel', serif" },
  { name: 'Bebas Neue (Headline)', family: "'Bebas Neue', sans-serif" },
  { name: 'Oswald (Impact)', family: "'Oswald', sans-serif" },
  { name: 'Anton (Ultra Bold)', family: "'Anton', sans-serif" },
  { name: 'Space Grotesk (Tech)', family: "'Space Grotesk', sans-serif" },
  { name: 'Caveat (Casual Handwriting)', family: "'Caveat', cursive" },
  { name: 'Dancing Script (Playful)', family: "'Dancing Script', cursive" },
  { name: 'Great Vibes (Calligraphy)', family: "'Great Vibes', cursive" },
  { name: 'Pacifico (Retro Brush)', family: "'Pacifico', cursive" },
  { name: 'Abril Fatface (Vintage Display)', family: "'Abril Fatface', serif" },
];

export const COLOR_PALETTES = [
  // Clean Neutrals
  '#FFFFFF', '#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#334155', '#1E293B', '#0F172A',
  // StudioFlow Primaries
  '#4F46E5', '#6366F1', '#06B6D4', '#0EA5E9', '#2563EB', '#3B82F6', '#0D9488', '#10B981',
  // Warm & Energetic
  '#F59E0B', '#F97316', '#EF4444', '#DC2626', '#E11D48', '#DB2777', '#7C3AED', '#8B5CF6',
  // Elegant Pastels
  '#FEF3C7', '#FFEDD5', '#FEE2E2', '#FCE7F3', '#F3E8FF', '#EDE9FE', '#E0F2FE', '#E0E7FF',
  // Deep Rich
  '#78350F', '#92400E', '#B45309', '#14532D', '#166534', '#1E3A8A', '#4C1D95', '#701A75',
];

export const GRADIENT_PRESETS = [
  { name: 'StudioFlow Signature', value: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)', colors: ['#4F46E5', '#06B6D4'], angle: 135 },
  { name: 'Ocean Mist', value: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)', colors: ['#0EA5E9', '#3B82F6'], angle: 135 },
  { name: 'Morning Glow', value: 'linear-gradient(135deg, #F97316 0%, #F43F5E 100%)', colors: ['#F97316', '#F43F5E'], angle: 135 },
  { name: 'Electric Indigo', value: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', colors: ['#6366F1', '#8B5CF6'], angle: 135 },
  { name: 'Emerald Forest', value: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', colors: ['#10B981', '#059669'], angle: 135 },
  { name: 'Soft Peach', value: 'linear-gradient(135deg, #FFEDD5 0%, #FEE2E2 100%)', colors: ['#FFEDD5', '#FEE2E2'], angle: 135 },
  { name: 'Lavender Sky', value: 'linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)', colors: ['#E0E7FF', '#F3E8FF'], angle: 135 },
  { name: 'Mint Sorbet', value: 'linear-gradient(135deg, #D1FAE5 0%, #E0F2FE 100%)', colors: ['#D1FAE5', '#E0F2FE'], angle: 135 },
  { name: 'Sunburst', value: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)', colors: ['#FBBF24', '#F97316'], angle: 135 },
  { name: 'Berry Punch', value: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', colors: ['#EC4899', '#8B5CF6'], angle: 135 },
  { name: 'Sky Turquoise', value: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)', colors: ['#06B6D4', '#3B82F6'], angle: 135 },
  { name: 'Coral Sunset', value: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)', colors: ['#FB7185', '#F43F5E'], angle: 135 },
  { name: 'Slate Calm', value: 'linear-gradient(135deg, #334155 0%, #0F172A 100%)', colors: ['#334155', '#0F172A'], angle: 135 },
  { name: 'Golden Hour', value: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)', colors: ['#FDE68A', '#F59E0B'], angle: 135 },
  { name: 'Vibrant Magenta', value: 'linear-gradient(135deg, #D946EF 0%, #6366F1 100%)', colors: ['#D946EF', '#6366F1'], angle: 135 },
  { name: 'Clean Neutral', value: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', colors: ['#F8FAFC', '#E2E8F0'], angle: 135 },
];

export const BRAND_KITS = [
  {
    id: 'bk-studioflow',
    name: 'StudioFlow Signature',
    tag: 'Tech & SaaS',
    colors: ['#4F46E5', '#06B6D4', '#0F172A', '#F8FAFC', '#FFFFFF'],
    headingFont: "'Plus Jakarta Sans', sans-serif",
    bodyFont: "'Inter', sans-serif",
  },
  {
    id: 'bk-nordic',
    name: 'Nordic Organic',
    tag: 'Eco & Wellness',
    colors: ['#064E3B', '#10B981', '#059669', '#ECFDF5', '#FFFFFF'],
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Inter', sans-serif",
  },
  {
    id: 'bk-sunset',
    name: 'Sunset Pulse',
    tag: 'Creative Agency',
    colors: ['#E11D48', '#F97316', '#FBBF24', '#FFF1F2', '#1E1B4B'],
    headingFont: "'Outfit', sans-serif",
    bodyFont: "'Montserrat', sans-serif",
  },
  {
    id: 'bk-luxury',
    name: 'Monochrome Luxe',
    tag: 'Fashion & Architecture',
    colors: ['#18181B', '#71717A', '#D4D4D8', '#FAFAF9', '#D97706'],
    headingFont: "'Cinzel', serif",
    bodyFont: "'Lora', serif",
  },
];

export const STOCK_IMAGES = [
  { id: 'stock-1', name: 'Artisan Coffee Craft', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80', category: 'Food & Drink' },
  { id: 'stock-2', name: 'Modern Workspace Studio', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80', category: 'Business' },
  { id: 'stock-3', name: 'Architectural Geometry', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80', category: 'Architecture' },
  { id: 'stock-4', name: 'Minimalist Interior Design', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80', category: 'Lifestyle' },
  { id: 'stock-5', name: 'Fresh Botanical Leaves', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', category: 'Nature' },
  { id: 'stock-6', name: 'Tech Creator Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80', category: 'Tech' },
  { id: 'stock-7', name: 'Abstract Fluid Texture', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80', category: 'Abstract' },
  { id: 'stock-8', name: 'Creative Portrait Light', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', category: 'People' },
  { id: 'stock-9', name: 'Urban Skyline Architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80', category: 'Architecture' },
  { id: 'stock-10', name: 'Nordic Ceramic Aesthetics', url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80', category: 'Lifestyle' },
  { id: 'stock-11', name: 'Mountain Sunrise Glow', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', category: 'Nature' },
  { id: 'stock-12', name: 'Fashion Editorial Silk', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80', category: 'Fashion' },
];

export const VECTOR_STICKERS = [
  { id: 'star-sharp', name: 'Sparkle Star', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z' },
  { id: 'badge-verified', name: 'Verified Badge', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M12 1L15.3 3.6L19.5 3.8L20.8 7.8L23.9 10.7L22.6 14.8L23.7 18.9L19.8 20.6L17 23.8L12.8 22.3L8.6 23.8L5.8 20.6L1.9 18.9L3 14.8L1.7 10.7L4.8 7.8L6.1 3.8L10.3 3.6L12 1Z' },
  { id: 'ribbon-tag', name: 'Ribbon Tag', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M5 2H19C19.55 2 20 2.45 20 3V22L12 18L4 22V3C4 2.45 4.45 2 5 2Z' },
  { id: 'crown', name: 'Royal Crown', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19V18H5V19Z' },
  { id: 'fire', name: 'Hot Flame', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M12 23C7.58 23 4 19.42 4 15C4 11.23 6.64 7.64 9 5.5C9.37 5.17 9.94 5.34 10.08 5.82C10.63 7.69 11.5 9.5 13 10.5C13.25 10.67 13.58 10.53 13.65 10.24C14.07 8.5 14.7 5.75 13.5 2C17.5 4.5 20 9 20 14C20 19 16.5 23 12 23Z' },
  { id: 'sparkles-cluster', name: 'Gleam Sparkle', category: 'Badges & Sparkles', viewBox: '0 0 24 24', path: 'M9 2L10.5 6.5L15 8L10.5 9.5L9 14L7.5 9.5L3 8L7.5 6.5L9 2ZM18 13L19 16L22 17L19 18L18 21L17 18L14 17L17 16L18 13Z' },
  { id: 'bag-shopping', name: 'Shopping Tote', category: 'Business', viewBox: '0 0 24 24', path: 'M16 6V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6H16ZM10 4H14V6H10V4ZM20 20H4V8H6V10H8V8H16V10H18V8H20V20Z' },
  { id: 'percent-badge', name: 'Discount Badge', category: 'Business', viewBox: '0 0 24 24', path: 'M7.5 4C5.57 4 4 5.57 4 7.5C4 9.43 5.57 11 7.5 11C9.43 11 11 9.43 11 7.5C11 5.57 9.43 4 7.5 4ZM16.5 13C14.57 13 13 14.57 13 16.5C13 18.43 14.57 20 16.5 20C18.43 20 20 18.43 20 16.5C20 14.57 18.43 13 16.5 13ZM19.7 4.3C19.3 3.9 18.7 3.9 18.3 4.3L4.3 18.3C3.9 18.7 3.9 19.3 4.3 19.7C4.5 19.9 4.7 20 5 20C5.3 20 5.5 19.9 5.7 19.7L19.7 5.7C20.1 5.3 20.1 4.7 19.7 4.3Z' },
  { id: 'bar-chart', name: 'Growth Analytics', category: 'Business', viewBox: '0 0 24 24', path: 'M4 19H20V21H2V3H4V19ZM7 10H10V17H7V10ZM12 6H15V17H12V6ZM17 12H20V17H17V12Z' },
  { id: 'rocket', name: 'Launch Rocket', category: 'Business', viewBox: '0 0 24 24', path: 'M13.13 2.188C13.06 2.078 12.94 2.016 12.81 2.016C12.42 2.016 11.08 2.5 9.06 4.62C7.3 6.47 6.4 8.65 6.38 11.12L4.09 13.41C3.89 13.61 3.84 13.91 3.96 14.16C4.08 14.41 4.34 14.57 4.62 14.57H7.13L7.75 16.43L4.29 19.89C4.1 20.08 4 20.34 4 20.61C4 21.38 4.62 22 5.39 22C5.66 22 5.92 21.9 6.11 21.71L9.57 18.25L11.43 18.87V21.38C11.43 21.66 11.59 21.92 11.84 22.04C12.09 22.16 12.39 22.11 12.59 21.91L14.88 19.62C17.35 19.6 19.53 18.7 21.38 16.94C23.5 14.92 23.98 13.58 23.98 13.19C23.98 13.06 23.92 12.94 23.81 12.87C21.78 11.57 15.84 8.08 13.13 2.188Z' },
  { id: 'shield-check', name: 'Security Trust', category: 'Business', viewBox: '0 0 24 24', path: 'M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' },
  { id: 'arrow-curved', name: 'Curved Arrow', category: 'Arrows', viewBox: '0 0 24 24', path: 'M18 7L13 2V6C6.92 6 2 10.92 2 17C2 19.58 2.89 21.95 4.38 23.84C4.85 24.44 5.75 24.08 5.72 23.32C5.55 19.16 8.79 16 13 16V20L18 15L23 11L18 7Z' },
  { id: 'arrow-circle-right', name: 'Modern Arrow', category: 'Arrows', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7L16 12L11 17V13H8V11H11V7Z' },
  { id: 'heart-filled', name: 'Love Heart', category: 'Social', viewBox: '0 0 24 24', path: 'M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z' },
  { id: 'thumbs-up', name: 'Like Hand', category: 'Social', viewBox: '0 0 24 24', path: 'M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z' },
  { id: 'play-button', name: 'Play Badge', category: 'Media', viewBox: '0 0 24 24', path: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z' },
  { id: 'cpu-chip', name: 'AI Processor', category: 'Tech', viewBox: '0 0 24 24', path: 'M6 2V4H4V6H2V8H4V16H2V18H4V20H6V22H8V20H16V22H18V20H20V18H22V16H20V8H22V6H20V4H18V2H16V4H8V2H6ZM6 6H18V18H6V6ZM8 8V16H16V8H8Z' },
];

export const FONT_PAIRINGS = [
  { title: 'Luxury Editorial', heading: 'The Art of Simplicity', headingFont: "'Playfair Display', serif", subheading: 'VOLUME IV • EDITION 2026', subheadingFont: "'Montserrat', sans-serif", headingColor: '#1E293B', subheadingColor: '#64748B' },
  { title: 'Bold Promo Headline', heading: 'BIGGEST SALE EVER', headingFont: "'Bebas Neue', sans-serif", subheading: 'UP TO 50% OFF THIS WEEKEND ONLY', subheadingFont: "'Plus Jakarta Sans', sans-serif", headingColor: '#DC2626', subheadingColor: '#334155' },
  { title: 'Artisan Bakery', heading: 'Warm Croissants & Coffee', headingFont: "'Caveat', cursive", subheading: 'FRESHLY BAKED DAILY IN DOWNTOWN', subheadingFont: "'Outfit', sans-serif", headingColor: '#92400E', subheadingColor: '#B45309' },
  { title: 'Modern Tech Brand', heading: 'INTELLIGENT SYSTEMS', headingFont: "'Space Grotesk', sans-serif", subheading: 'Next-Generation Autonomous Computing Architecture', subheadingFont: "'Inter', sans-serif", headingColor: '#0F172A', subheadingColor: '#475569' },
  { title: 'Elegant Wedding', heading: 'Elena & Julian', headingFont: "'Great Vibes', cursive", subheading: 'CORDIALLY INVITE YOU TO CELEBRATE', subheadingFont: "'Cinzel', serif", headingColor: '#4C1D95', subheadingColor: '#6B7280' },
  { title: 'High Impact Display', heading: 'BREAK THE RULES', headingFont: "'Anton', sans-serif", subheading: 'DISRUPTIVE DIGITAL CREATIVITY SUMMIT', subheadingFont: "'Oswald', sans-serif", headingColor: '#1E1B4B', subheadingColor: '#2563EB' },
  { title: 'Vintage Retro Chic', heading: 'California Dreams', headingFont: "'Pacifico', cursive", subheading: 'Endless Sunshine and Ocean Breeze', subheadingFont: "'Lora', serif", headingColor: '#EA580C', subheadingColor: '#78350F' },
  { title: 'Clean Minimalist Studio', heading: 'ARCHITECTURAL ESSENCE', headingFont: "'Plus Jakarta Sans', sans-serif", subheading: 'Form Follows Function in Contemporary Design', subheadingFont: "'Inter', sans-serif", headingColor: '#0F172A', subheadingColor: '#64748B' },
];

// 12 High-End Templates (Accurate coordinates, zero overlap!)
export const TEMPLATES: Template[] = [
  // 1. Instagram Post (1080x1080) - Minimalist Cafe / Bakery
  {
    id: 'template-artisan-coffee',
    title: 'Artisan Cafe & Bakery Promo',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    thumbnailBg: '#FAF8F5',
    page: {
      id: 'page-1',
      title: 'Instagram Post',
      backgroundColor: '#FAF8F5',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'coffee-card-bg', type: 'shape', shapeType: 'rounded-rect', x: 60, y: 60, width: 960, height: 960, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E7E2D9', strokeWidth: 2, cornerRadius: 32, hasShadow: true },
        { id: 'tagline-pill', type: 'shape', shapeType: 'rounded-rect', x: 390, y: 110, width: 300, height: 44, rotation: 0, opacity: 1, fill: '#FEF3C7', stroke: '#FDE68A', strokeWidth: 1.5, cornerRadius: 22 },
        { id: 'tagline-txt', type: 'text', x: 400, y: 122, width: 280, height: 24, rotation: 0, opacity: 1, text: '☕ ARTISAN ROASTERY', fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#92400E', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'main-title', type: 'text', x: 140, y: 180, width: 800, height: 80, rotation: 0, opacity: 1, text: 'Morning Brew Experience', fontSize: 52, fontFamily: "'Playfair Display', serif", fill: '#292524', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'sub-title', type: 'text', x: 240, y: 275, width: 600, height: 50, rotation: 0, opacity: 1, text: 'Handcrafted pour-overs and freshly baked sourdough pastries every morning.', fontSize: 17, fontFamily: "'Inter', sans-serif", fill: '#78716C', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', lineHeight: 1.4 },
        { id: 'coffee-img', type: 'image', x: 140, y: 350, width: 800, height: 520, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80', borderRadius: 24, hasShadow: true },
        { id: 'footer-badge', type: 'shape', shapeType: 'rounded-rect', x: 400, y: 900, width: 280, height: 48, rotation: 0, opacity: 1, fill: '#292524', stroke: 'transparent', strokeWidth: 0, cornerRadius: 24 },
        { id: 'footer-txt', type: 'text', x: 410, y: 914, width: 260, height: 24, rotation: 0, opacity: 1, text: 'Visit Us • 8AM to 6PM', fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '600', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 2. YouTube Thumbnail (1280x720) - Tech Review & Masterclass
  {
    id: 'template-tech-thumb',
    title: 'Tech Masterclass Thumbnail',
    category: 'Marketing',
    width: 1280,
    height: 720,
    thumbnailBg: '#F8FAFC',
    page: {
      id: 'page-1',
      title: 'YouTube Thumbnail',
      backgroundColor: '#F8FAFC',
      backgroundGradient: { type: 'linear', colors: ['#FFFFFF', '#EEF2F6'], angle: 135 },
      backgroundPattern: 'dots',
      elements: [
        { id: 'left-badge', type: 'shape', shapeType: 'rounded-rect', x: 80, y: 80, width: 210, height: 42, rotation: 0, opacity: 1, fill: '#4F46E5', stroke: 'transparent', strokeWidth: 0, cornerRadius: 12 },
        { id: 'badge-txt', type: 'text', x: 90, y: 92, width: 190, height: 24, rotation: 0, opacity: 1, text: 'MASTERCLASS 2026', fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'thumb-heading', type: 'text', x: 80, y: 150, width: 620, height: 180, rotation: 0, opacity: 1, text: 'BUILD LIKE A\nSENIOR ARCHITECT', fontSize: 62, fontFamily: "'Anton', sans-serif", fill: '#0F172A', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.1, letterSpacing: 1 },
        { id: 'thumb-desc', type: 'text', x: 80, y: 360, width: 580, height: 70, rotation: 0, opacity: 1, text: 'Zero to production architecture, scalable design patterns, and state machines explained.', fontSize: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#64748B', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.4 },
        { id: 'duration-pill', type: 'shape', shapeType: 'rounded-rect', x: 80, y: 470, width: 240, height: 52, rotation: 0, opacity: 1, fill: '#EEF2FF', stroke: '#C7D2FE', strokeWidth: 1.5, cornerRadius: 26 },
        { id: 'duration-txt', type: 'text', x: 95, y: 486, width: 210, height: 24, rotation: 0, opacity: 1, text: '⚡ Complete 45-Min Guide', fontSize: 15, fontFamily: "'Inter', sans-serif", fill: '#3730A3', fontWeight: '600', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'preview-img', type: 'image', x: 720, y: 80, width: 480, height: 560, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80', borderRadius: 28, borderColor: '#E2E8F0', borderWidth: 4, hasShadow: true },
      ],
    },
  },

  // 3. Business Poster (1080x1350) - Design Conference
  {
    id: 'template-conf-poster',
    title: 'Design Conference Poster',
    category: 'Business',
    width: 1080,
    height: 1350,
    thumbnailBg: '#FFFFFF',
    page: {
      id: 'page-1',
      title: 'Business Poster',
      backgroundColor: '#FFFFFF',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'poster-img', type: 'image', x: 60, y: 60, width: 960, height: 540, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80', borderRadius: 28 },
        { id: 'date-badge', type: 'shape', shapeType: 'rounded-rect', x: 80, y: 640, width: 220, height: 40, rotation: 0, opacity: 1, fill: '#EEF2FF', stroke: '#C7D2FE', strokeWidth: 1.5, cornerRadius: 20 },
        { id: 'date-txt', type: 'text', x: 90, y: 651, width: 200, height: 24, rotation: 0, opacity: 1, text: 'OCTOBER 24-26, 2026', fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fill: '#4F46E5', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'poster-title', type: 'text', x: 80, y: 710, width: 920, height: 160, rotation: 0, opacity: 1, text: 'GLOBAL DESIGN &\nINNOVATION SUMMIT', fontSize: 64, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#0F172A', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.15, letterSpacing: -1 },
        { id: 'poster-desc', type: 'text', x: 80, y: 890, width: 920, height: 80, rotation: 0, opacity: 1, text: 'Join 5,000+ leading product creators, design thinkers, and engineering visionaries for 3 days of inspiring keynotes, collaborative workshops, and hands-on lab sessions.', fontSize: 22, fontFamily: "'Inter', sans-serif", fill: '#475569', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.5 },
        { id: 'divider-1', type: 'shape', shapeType: 'line', x: 80, y: 1010, width: 920, height: 2, rotation: 0, opacity: 0.8, fill: '#E2E8F0', stroke: '#E2E8F0', strokeWidth: 2 },
        { id: 'meta-col-1', type: 'text', x: 80, y: 1050, width: 300, height: 60, rotation: 0, opacity: 1, text: 'LOCATION\nMetropolitan Center, Hall A', fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#1E293B', fontWeight: '600', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.4 },
        { id: 'register-btn', type: 'shape', shapeType: 'rounded-rect', x: 740, y: 1040, width: 260, height: 60, rotation: 0, opacity: 1, fill: '#0F172A', stroke: 'transparent', strokeWidth: 0, cornerRadius: 16 },
        { id: 'register-txt', type: 'text', x: 755, y: 1058, width: 230, height: 24, rotation: 0, opacity: 1, text: 'Get Passes Now →', fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 4. Autumn Fashion Mega Sale (1080x1080)
  {
    id: 'template-autumn-sale',
    title: 'Autumn Fashion Mega Sale',
    category: 'Marketing',
    width: 1080,
    height: 1080,
    thumbnailBg: '#FFF7ED',
    page: {
      id: 'page-1',
      title: 'Sale Banner',
      backgroundColor: '#FFF7ED',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'sale-card', type: 'shape', shapeType: 'rounded-rect', x: 50, y: 50, width: 980, height: 980, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#FED7AA', strokeWidth: 2, cornerRadius: 32 },
        { id: 'sale-badge', type: 'shape', shapeType: 'badge', x: 440, y: 100, width: 200, height: 48, rotation: 0, opacity: 1, fill: '#EA580C', stroke: 'transparent', strokeWidth: 0, cornerRadius: 12 },
        { id: 'sale-badge-txt', type: 'text', x: 450, y: 114, width: 180, height: 24, rotation: 0, opacity: 1, text: 'LIMITED TIME ONLY', fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'sale-headline', type: 'text', x: 100, y: 175, width: 880, height: 90, rotation: 0, opacity: 1, text: 'AUTUMN COLLECTION', fontSize: 68, fontFamily: "'Bebas Neue', sans-serif", fill: '#7C2D12', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 4 },
        { id: 'sale-discount', type: 'text', x: 100, y: 270, width: 880, height: 60, rotation: 0, opacity: 1, text: 'UP TO 50% OFF STOREWIDE', fontSize: 28, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#C2410C', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 1 },
        { id: 'sale-img', type: 'image', x: 140, y: 360, width: 800, height: 500, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80', borderRadius: 24 },
        { id: 'code-box', type: 'shape', shapeType: 'rounded-rect', x: 360, y: 890, width: 360, height: 60, rotation: 0, opacity: 1, fill: '#7C2D12', stroke: 'transparent', strokeWidth: 0, cornerRadius: 30 },
        { id: 'code-txt', type: 'text', x: 380, y: 910, width: 320, height: 24, rotation: 0, opacity: 1, text: 'USE CODE: FALL50 AT CHECKOUT', fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fill: '#FEF3C7', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
      ],
    },
  },

  // 5. Minimalist Editorial Quote (1080x1080)
  {
    id: 'template-quote-clean',
    title: 'Minimalist Architecture Quote',
    category: 'Quotes',
    width: 1080,
    height: 1080,
    thumbnailBg: '#F8FAFC',
    page: {
      id: 'page-1',
      title: 'Minimal Quote',
      backgroundColor: '#F8FAFC',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'quote-frame', type: 'shape', shapeType: 'rect', x: 80, y: 80, width: 920, height: 920, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E2E8F0', strokeWidth: 2, hasShadow: true },
        { id: 'quote-mark', type: 'text', x: 440, y: 160, width: 200, height: 100, rotation: 0, opacity: 0.25, text: '“', fontSize: 140, fontFamily: "'Playfair Display', serif", fill: '#0F172A', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'quote-text', type: 'text', x: 180, y: 330, width: 720, height: 240, rotation: 0, opacity: 1, text: 'Simplicity is about subtracting the obvious and adding the meaningful.', fontSize: 46, fontFamily: "'Lora', serif", fill: '#0F172A', fontWeight: 'normal', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center', lineHeight: 1.35 },
        { id: 'quote-rule', type: 'shape', shapeType: 'line', x: 460, y: 630, width: 160, height: 2, rotation: 0, opacity: 0.6, fill: '#94A3B8', stroke: '#94A3B8', strokeWidth: 2 },
        { id: 'quote-speaker', type: 'text', x: 240, y: 670, width: 600, height: 40, rotation: 0, opacity: 1, text: 'JOHN MAEDA', fontSize: 17, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#64748B', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 4 },
        { id: 'quote-book', type: 'text', x: 240, y: 715, width: 600, height: 30, rotation: 0, opacity: 1, text: 'The Laws of Simplicity • MIT Press', fontSize: 14, fontFamily: "'Inter', sans-serif", fill: '#94A3B8', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 6. Modern Event Exhibition Invite (1080x1920)
  {
    id: 'template-art-invite',
    title: 'Gallery Exhibition Story Invite',
    category: 'Events',
    width: 1080,
    height: 1920,
    thumbnailBg: '#FAF5FF',
    page: {
      id: 'page-1',
      title: 'Event Invite Story',
      backgroundColor: '#FAF5FF',
      backgroundGradient: { type: 'linear', colors: ['#FFFFFF', '#F5F3FF'], angle: 180 },
      backgroundPattern: 'none',
      elements: [
        { id: 'invite-header-tag', type: 'text', x: 140, y: 140, width: 800, height: 30, rotation: 0, opacity: 1, text: 'CONTEMPORARY ARTS PAVILION', fontSize: 16, fontFamily: "'Cinzel', serif", fill: '#4F46E5', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 4 },
        { id: 'invite-title', type: 'text', x: 100, y: 210, width: 880, height: 140, rotation: 0, opacity: 1, text: 'CHROMATIC\nHORIZONS', fontSize: 84, fontFamily: "'Playfair Display', serif", fill: '#1E1B4B', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', lineHeight: 1.05 },
        { id: 'invite-img', type: 'image', x: 100, y: 470, width: 880, height: 980, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80', borderRadius: 36, hasShadow: true },
        { id: 'details-card', type: 'shape', shapeType: 'rounded-rect', x: 100, y: 1510, width: 880, height: 270, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E0E7FF', strokeWidth: 2, cornerRadius: 28 },
        { id: 'details-date', type: 'text', x: 140, y: 1550, width: 800, height: 40, rotation: 0, opacity: 1, text: 'OPENING NIGHT: NOVEMBER 14 • 7:00 PM', fontSize: 18, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#4338CA', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'rsvp-btn', type: 'shape', shapeType: 'rounded-rect', x: 360, y: 1680, width: 360, height: 56, rotation: 0, opacity: 1, fill: '#4F46E5', stroke: 'transparent', strokeWidth: 0, cornerRadius: 28 },
        { id: 'rsvp-txt', type: 'text', x: 380, y: 1697, width: 320, height: 24, rotation: 0, opacity: 1, text: 'Reserve Your Seat →', fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 7. Pitch Deck / Strategy Presentation Slide (1920x1080)
  {
    id: 'template-presentation-deck',
    title: 'Pitch Deck Strategy Slide',
    category: 'Presentation',
    width: 1920,
    height: 1080,
    thumbnailBg: '#F8FAFC',
    page: {
      id: 'page-1',
      title: 'Strategy Slide',
      backgroundColor: '#F8FAFC',
      backgroundGradient: null,
      backgroundPattern: 'grid',
      elements: [
        { id: 'slide-badge', type: 'shape', shapeType: 'rounded-rect', x: 120, y: 90, width: 200, height: 38, rotation: 0, opacity: 1, fill: '#EEF2FF', stroke: '#C7D2FE', strokeWidth: 1.5, cornerRadius: 19 },
        { id: 'slide-badge-txt', type: 'text', x: 130, y: 100, width: 180, height: 20, rotation: 0, opacity: 1, text: 'Q4 MARKET OUTLOOK', fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fill: '#3730A3', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'slide-title', type: 'text', x: 120, y: 150, width: 1000, height: 80, rotation: 0, opacity: 1, text: 'Strategic Growth & Scalability Vectors', fontSize: 48, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#0F172A', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left' },
        { id: 'metric-card-1', type: 'shape', shapeType: 'rounded-rect', x: 120, y: 320, width: 500, height: 640, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E2E8F0', strokeWidth: 1.5, cornerRadius: 24, hasShadow: true },
        { id: 'metric-val-1', type: 'text', x: 160, y: 380, width: 420, height: 90, rotation: 0, opacity: 1, text: '3.4x', fontSize: 72, fontFamily: "'Outfit', sans-serif", fill: '#4F46E5', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left' },
        { id: 'metric-lbl-1', type: 'text', x: 160, y: 480, width: 420, height: 40, rotation: 0, opacity: 1, text: 'Efficiency Velocity YoY', fontSize: 22, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#0F172A', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left' },
        { id: 'metric-body-1', type: 'text', x: 160, y: 540, width: 420, height: 120, rotation: 0, opacity: 1, text: 'Automated document processing pipelines reduced enterprise turnaround times from 14 days down to 4 hours.', fontSize: 16, fontFamily: "'Inter', sans-serif", fill: '#64748B', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.6 },
        { id: 'metric-img', type: 'image', x: 660, y: 320, width: 1140, height: 640, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80', borderRadius: 24, borderColor: '#E2E8F0', borderWidth: 2, hasShadow: true },
      ],
    },
  },

  // 8. Creative Portfolio Studio Flyer (800x1100)
  {
    id: 'template-portfolio-flyer',
    title: 'Creative Portfolio Studio Flyer',
    category: 'Business',
    width: 800,
    height: 1100,
    thumbnailBg: '#F8FAFC',
    page: {
      id: 'page-1',
      title: 'Studio Flyer',
      backgroundColor: '#FFFFFF',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'flyer-border', type: 'shape', shapeType: 'rounded-rect', x: 40, y: 40, width: 720, height: 1020, rotation: 0, opacity: 1, fill: '#F8FAFC', stroke: '#E2E8F0', strokeWidth: 2, cornerRadius: 24 },
        { id: 'flyer-brand', type: 'text', x: 80, y: 80, width: 640, height: 30, rotation: 0, opacity: 1, text: 'STUDIOFLOW CREATIVE LAB', fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fill: '#4F46E5', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 3 },
        { id: 'flyer-headline', type: 'text', x: 80, y: 130, width: 640, height: 80, rotation: 0, opacity: 1, text: 'Creating Timeless Spaces', fontSize: 42, fontFamily: "'Playfair Display', serif", fill: '#0F172A', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'flyer-img', type: 'image', x: 80, y: 230, width: 640, height: 480, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80', borderRadius: 20 },
        { id: 'flyer-desc', type: 'text', x: 120, y: 740, width: 560, height: 80, rotation: 0, opacity: 1, text: 'We partner with progressive developers and design teams worldwide to craft conscious spatial identities.', fontSize: 16, fontFamily: "'Inter', sans-serif", fill: '#475569', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', lineHeight: 1.6 },
        { id: 'flyer-btn', type: 'shape', shapeType: 'rounded-rect', x: 260, y: 860, width: 280, height: 52, rotation: 0, opacity: 1, fill: '#0F172A', stroke: 'transparent', strokeWidth: 0, cornerRadius: 26 },
        { id: 'flyer-btn-txt', type: 'text', x: 280, y: 876, width: 240, height: 24, rotation: 0, opacity: 1, text: 'studioflow.design', fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '600', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 9. SaaS Product Launch Showcase (1200x630)
  {
    id: 'template-saas-launch',
    title: 'SaaS Product Launch Hero',
    category: 'Marketing',
    width: 1200,
    height: 630,
    thumbnailBg: '#F0FDFA',
    page: {
      id: 'page-1',
      title: 'SaaS Launch Banner',
      backgroundColor: '#F0FDFA',
      backgroundGradient: { type: 'linear', colors: ['#FFFFFF', '#ECFDF5'], angle: 135 },
      backgroundPattern: 'none',
      elements: [
        { id: 'saas-badge', type: 'shape', shapeType: 'rounded-rect', x: 80, y: 60, width: 240, height: 38, rotation: 0, opacity: 1, fill: '#CCFBF1', stroke: '#5EEAD4', strokeWidth: 1.5, cornerRadius: 19 },
        { id: 'saas-badge-txt', type: 'text', x: 90, y: 70, width: 220, height: 20, rotation: 0, opacity: 1, text: '✨ INTRODUCING STUDIOFLOW 3.0', fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fill: '#0F766E', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 1.5 },
        { id: 'saas-title', type: 'text', x: 80, y: 120, width: 600, height: 160, rotation: 0, opacity: 1, text: 'Design Anything\nIn Browser Speed', fontSize: 56, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#0F172A', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.15 },
        { id: 'saas-desc', type: 'text', x: 80, y: 300, width: 560, height: 70, rotation: 0, opacity: 1, text: 'Turn rough concepts into publish-ready visual graphics in record time with AI-assisted layout snapping and vector tooling.', fontSize: 18, fontFamily: "'Inter', sans-serif", fill: '#475569', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.5 },
        { id: 'saas-cta', type: 'shape', shapeType: 'rounded-rect', x: 80, y: 400, width: 220, height: 54, rotation: 0, opacity: 1, fill: '#0D9488', stroke: 'transparent', strokeWidth: 0, cornerRadius: 27 },
        { id: 'saas-cta-txt', type: 'text', x: 95, y: 417, width: 190, height: 24, rotation: 0, opacity: 1, text: 'Start Free Trial →', fontSize: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'saas-mockup', type: 'image', x: 680, y: 60, width: 460, height: 500, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80', borderRadius: 24, hasShadow: true },
      ],
    },
  },

  // 10. Organic Matcha Tea Botanical (1080x1080)
  {
    id: 'template-matcha-tea',
    title: 'Organic Botanical Matcha Tea',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    thumbnailBg: '#F0FDF4',
    page: {
      id: 'page-1',
      title: 'Botanical Post',
      backgroundColor: '#F0FDF4',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'matcha-box', type: 'shape', shapeType: 'rounded-rect', x: 60, y: 60, width: 960, height: 960, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#BBF7D0', strokeWidth: 2, cornerRadius: 32 },
        { id: 'matcha-tag', type: 'text', x: 100, y: 120, width: 880, height: 24, rotation: 0, opacity: 1, text: '100% CEREMONIAL GRADE MATCHA', fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fill: '#15803D', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 3 },
        { id: 'matcha-title', type: 'text', x: 100, y: 170, width: 880, height: 80, rotation: 0, opacity: 1, text: 'Pure Botanical Rituals', fontSize: 52, fontFamily: "'Playfair Display', serif", fill: '#14532D', fontWeight: '700', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center' },
        { id: 'matcha-img', type: 'image', x: 140, y: 280, width: 800, height: 580, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', borderRadius: 24 },
        { id: 'matcha-footer', type: 'text', x: 100, y: 900, width: 880, height: 30, rotation: 0, opacity: 1, text: 'Ethically Sourced from Uji, Kyoto • Harvested Spring 2026', fontSize: 16, fontFamily: "'Inter', sans-serif", fill: '#4B5563', fontWeight: '500', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
      ],
    },
  },

  // 11. Podcast Creator Episode Cover (1080x1080)
  {
    id: 'template-podcast-cover',
    title: 'Podcast Creator Episode Cover',
    category: 'Social Media',
    width: 1080,
    height: 1080,
    thumbnailBg: '#FAF5FF',
    page: {
      id: 'page-1',
      title: 'Podcast Cover',
      backgroundColor: '#FAF5FF',
      backgroundGradient: { type: 'linear', colors: ['#FAF5FF', '#F3E8FF'], angle: 135 },
      backgroundPattern: 'none',
      elements: [
        { id: 'pod-card', type: 'shape', shapeType: 'rounded-rect', x: 60, y: 60, width: 960, height: 960, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E9D5FF', strokeWidth: 2, cornerRadius: 36, hasShadow: true },
        { id: 'pod-num', type: 'shape', shapeType: 'rounded-rect', x: 120, y: 120, width: 140, height: 40, rotation: 0, opacity: 1, fill: '#7C3AED', stroke: 'transparent', strokeWidth: 0, cornerRadius: 20 },
        { id: 'pod-num-txt', type: 'text', x: 130, y: 132, width: 120, height: 20, rotation: 0, opacity: 1, text: 'EPISODE 42', fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fill: '#FFFFFF', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 2 },
        { id: 'pod-title', type: 'text', x: 120, y: 190, width: 840, height: 160, rotation: 0, opacity: 1, text: 'Designing the Next\nEra of Creative AI', fontSize: 58, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#0F172A', fontWeight: '800', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', lineHeight: 1.15 },
        { id: 'pod-img', type: 'image', x: 120, y: 380, width: 840, height: 480, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', borderRadius: 28 },
        { id: 'pod-host', type: 'text', x: 120, y: 890, width: 500, height: 30, rotation: 0, opacity: 1, text: 'Hosted by Sarah Lin & Alex Vance • 54 mins', fontSize: 17, fontFamily: "'Inter', sans-serif", fill: '#64748B', fontWeight: '600', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left' },
      ],
    },
  },

  // 12. Nordic Ceramic Lifestyle Catalog (1080x1920)
  {
    id: 'template-ceramic-catalog',
    title: 'Nordic Ceramic Lifestyle Story',
    category: 'Marketing',
    width: 1080,
    height: 1920,
    thumbnailBg: '#FDFBF7',
    page: {
      id: 'page-1',
      title: 'Lifestyle Story',
      backgroundColor: '#FDFBF7',
      backgroundGradient: null,
      backgroundPattern: 'none',
      elements: [
        { id: 'cat-brand', type: 'text', x: 100, y: 140, width: 880, height: 30, rotation: 0, opacity: 1, text: 'STUDIO CERAMIQUE • COPENHAGEN', fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fill: '#78716C', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 4 },
        { id: 'cat-title', type: 'text', x: 100, y: 200, width: 880, height: 90, rotation: 0, opacity: 1, text: 'Handcrafted Nordic Vessels', fontSize: 56, fontFamily: "'Playfair Display', serif", fill: '#292524', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center' },
        { id: 'cat-img', type: 'image', x: 100, y: 330, width: 880, height: 1180, rotation: 0, opacity: 1, src: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80', borderRadius: 36, hasShadow: true },
        { id: 'cat-desc-box', type: 'shape', shapeType: 'rounded-rect', x: 100, y: 1560, width: 880, height: 220, rotation: 0, opacity: 1, fill: '#FFFFFF', stroke: '#E7E5E4', strokeWidth: 1.5, cornerRadius: 24 },
        { id: 'cat-desc-txt', type: 'text', x: 140, y: 1610, width: 800, height: 60, rotation: 0, opacity: 1, text: 'Each stoneware vessel is wheel-thrown by local artisans using coarse Danish clay and finished with raw matte glazes.', fontSize: 20, fontFamily: "'Lora', serif", fill: '#57534E', fontWeight: 'normal', fontStyle: 'italic', textDecoration: 'none', textAlign: 'center', lineHeight: 1.5 },
        { id: 'cat-shop-txt', type: 'text', x: 140, y: 1700, width: 800, height: 30, rotation: 0, opacity: 1, text: 'Swipe Up to Shop the Spring 2026 Drop ↑', fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", fill: '#292524', fontWeight: '700', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', letterSpacing: 1 },
      ],
    },
  },
];
