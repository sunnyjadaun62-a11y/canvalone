import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StudioFlowLogo } from '../components/Brand/StudioFlowLogo';
import { TEMPLATES, BRAND_KITS } from '../utils/presets';
import {
  ArrowRight,
  Sparkles,
  MousePointer2,
  Image as ImageIcon,
  PenTool,
  Download,
  LayoutTemplate,
  Palette,
  CheckCircle2,
  Star,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
  Maximize2,
  Check,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const categories = [
    'All',
    'Social Media',
    'Marketing',
    'Business',
    'Quotes',
    'Events',
    'Presentation',
  ];

  const filteredTemplates = TEMPLATES.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <StudioFlowLogo size="md" />
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Templates
            </a>
            <a
              href="#brandkits"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Brand Kits
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#reviews"
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Reviews
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center space-x-3.5">
            <Link
              to="/editor"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/editor"
              className="group relative inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              <span>Start Designing Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Soft decorative background gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-200/50 via-teal-100/40 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-teal-100/30 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-6 shadow-2xs hover:bg-indigo-100/60 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span>StudioFlow 2.0 Live</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">Next-Gen Browser Design Studio</span>
            <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl mx-auto leading-[1.12]">
            Design Anything in Seconds,{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
              Collaborate in Real Time.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            StudioFlow is the ultimate browser-based design studio. Create stunning social media posts,
            flyers, YouTube thumbnails, and marketing graphics with professional tools. Try it free, no credit card required.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/editor"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:shadow-indigo-600/35 transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-teal-200 fill-teal-200" />
              <span>Launch Studio Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-2xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-95"
            >
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <span>Explore 12+ Templates</span>
            </a>
          </div>

          {/* Trust Banner with Avatar Stack & Rating */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Creator"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Creator"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Creator"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Creator"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                +10k
              </div>
            </div>

            {/* Stars & Text */}
            <div className="flex items-center space-x-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-slate-800">4.9/5</span>
              <span>from 2,400+ creators & agencies</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>

          {/* 3. HERO STUDIO APP MOCKUP PREVIEW */}
          <div className="mt-14 relative max-w-6xl mx-auto">
            {/* Ambient Shadow glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-3xl blur-xl opacity-20 transition-all group-hover:opacity-30" />

            {/* Browser Frame */}
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden text-left">
              {/* Window Header */}
              <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 font-mono">
                  <span>https://studioflow.app/editor</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Mockup Studio Workspace Content */}
              <div className="relative bg-[#EBECF0] h-[480px] sm:h-[580px] flex overflow-hidden">
                {/* Mockup Left Rail */}
                <div className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 space-y-4 shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <LayoutTemplate className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-xl text-slate-400 flex items-center justify-center">
                    <MousePointer2 className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-xl text-slate-400 flex items-center justify-center">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-xl text-slate-400 flex items-center justify-center">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div className="w-9 h-9 rounded-xl text-slate-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                {/* Mockup Drawer Preview */}
                <div className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col p-4 shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-extrabold text-xs text-slate-800">TEMPLATES</span>
                    <span className="text-[10px] text-indigo-600 font-bold">12 Presets</span>
                  </div>
                  <div className="space-y-2.5 overflow-hidden">
                    <div className="h-20 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 p-2 text-white text-[11px] font-bold flex flex-col justify-end shadow-xs">
                      Cafe & Bakery Special
                    </div>
                    <div className="h-20 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-2 text-white text-[11px] font-bold flex flex-col justify-end shadow-xs">
                      SaaS Tech Launch
                    </div>
                    <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 p-2 text-white text-[11px] font-bold flex flex-col justify-end shadow-xs">
                      Nordic Wellness Expo
                    </div>
                  </div>
                </div>

                {/* Mockup Canvas Center Viewport */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  {/* Mockup Context Toolbar */}
                  <div className="absolute top-4 left-6 right-6 h-10 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-4 flex items-center justify-between shadow-xs">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="font-bold text-slate-800">Heading 1</span>
                      <span className="text-slate-300">|</span>
                      <span className="font-mono text-slate-600">Plus Jakarta Sans • 48px</span>
                      <div className="w-4 h-4 rounded-full bg-indigo-600 border border-slate-200" />
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold">
                        Snapping Active
                      </span>
                    </div>
                  </div>

                  {/* Centered Realistic Artboard */}
                  <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-white rounded-xl shadow-xl border border-slate-200 relative overflow-hidden flex flex-col justify-between p-6">
                    {/* Artboard Content */}
                    <div className="space-y-2">
                      <div className="inline-block px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px] tracking-wider uppercase">
                        StudioFlow Launch
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Create Visuals That Convert.
                      </h2>
                      <p className="text-xs text-slate-500 max-w-[260px]">
                        Everything you need to craft high-converting social campaigns and client decks.
                      </p>
                    </div>

                    {/* Active Selected Transform Gizmo Preview */}
                    <div className="relative border-2 border-indigo-500 rounded-xl p-3 bg-indigo-50/30">
                      {/* Corner Handles */}
                      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
                      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-xs" />
                      <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span>Interactive Transform Gizmo</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>1080 × 1080 px (1:1)</span>
                      <span className="font-semibold text-teal-600">● 100% Client-Side</span>
                    </div>
                  </div>

                  {/* Floating Interactive CTA Overlay on Click */}
                  <Link
                    to="/editor"
                    className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer group"
                  >
                    <div className="px-6 py-3.5 rounded-2xl bg-white/95 text-slate-900 font-extrabold text-sm shadow-2xl border border-slate-200 flex items-center space-x-2.5 group-hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      <span>Click to Open Live Studio Workspace</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES GRID */}
      <section id="features" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 mb-2">
              PRO-GRADE TOOLING
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Create World-Class Designs
            </p>
            <p className="mt-4 text-base text-slate-600">
              Built for creators, marketers, and power users who need Canva-level simplicity with Figma-grade responsiveness.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Drag & Drop Canvas</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                8-point directional handles, fluid rotation, element duplication (Ctrl+D), and smart edge-snapping guides for pixel perfection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-xl hover:shadow-teal-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-xs">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Rich Asset Library</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hundreds of vector badges, arrows, stickers, Google fonts, and high-resolution Unsplash stock photos ready in one click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Freehand Brush Tool</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Expressive vector pens, markers, and translucent highlighters with customizable stroke size and complete color spectrum control.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-300 hover:bg-white hover:shadow-xl hover:shadow-rose-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-xs">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Retina & Print Exporter</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Download crisp 1x standard, 2x Retina, and 3x Ultra-HD print PNG/JPG files, vector SVG, and portable project JSON files.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">12 Pro Custom Templates</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zero text overlaps, mathematically balanced typography, and responsive ratios for Instagram, YouTube, Posters, and Slide decks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1-Click Brand Kits</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly restyle your entire canvas with curated color palettes and font pairings like Nordic Organic, Sunset Pulse, or Luxe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TEMPLATE SHOWCASE / CAROUSEL */}
      <section id="templates" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 mb-2">
                READY-TO-USE LAYOUTS
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Start with a Pro Template
              </p>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                Click any template to load it directly into the StudioFlow workspace and start customizing immediately.
              </p>
            </div>

            <Link
              to="/editor"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Open Blank Canvas in Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Link
                key={template.id}
                to={`/editor?template=${template.id}`}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col cursor-pointer"
              >
                {/* Visual Thumbnail Card */}
                <div
                  className="h-52 w-full p-6 flex flex-col justify-between text-white relative overflow-hidden transition-transform group-hover:scale-[1.02] duration-300"
                  style={{ background: template.thumbnailBg }}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider">
                      {template.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/25 backdrop-blur-xs text-[10px] font-mono">
                      {template.width} × {template.height}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-extrabold leading-snug drop-shadow-sm">
                      {template.title}
                    </h4>
                    <span className="text-xs opacity-90 block mt-1">
                      {template.page.elements.length} customizable layers
                    </span>
                  </div>

                  {/* Hover Customize Tag */}
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-lg flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Customize in StudioFlow</span>
                    </span>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-4 flex items-center justify-between bg-white border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700">
                    {template.title}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRAND KITS SPOTLIGHT */}
      <section id="brandkits" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-4">
                <Palette className="w-3.5 h-3.5" />
                <span>One-Click Identity Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Instantly Transform Any Design to Match Your Brand.
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                No more recoloring 20 shapes and reselecting font families manually. Select any curated Brand Kit,
                and watch your entire canvas harmoniously adapt in under a second.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Harmonious Color Palettes</h4>
                    <p className="text-xs text-slate-500">
                      Curated 5-tone color ramps tailored for SaaS, organic wellness, high-fashion, and luxury brands.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Curated Typography Pairings</h4>
                    <p className="text-xs text-slate-500">
                      Editorial serifs, geometric grotesks, and clean modern headings that elevate your message.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Instant Page Confetti Feedback</h4>
                    <p className="text-xs text-slate-500">
                      Fun, responsive feedback when applying brand sets to your active artboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/editor"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  <span>Try Brand Kits in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Brand Kits Cards Display */}
            <div className="space-y-4">
              {BRAND_KITS.map((kit) => (
                <div
                  key={kit.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{kit.name}</h4>
                      <span className="text-xs text-slate-500">{kit.tag}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {kit.headingFont.split(',')[0].replace(/['"]/g, '')}
                    </span>
                  </div>

                  {/* 5-Color Swatch */}
                  <div className="grid grid-cols-5 gap-2">
                    {kit.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="h-10 rounded-lg border border-black/10 shadow-2xs flex items-center justify-center text-[10px] font-mono text-white/90 drop-shadow-xs"
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 mb-2">
              TRANSPARENT PRICING
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple, Honest Plans for Every Creator
            </p>
            <p className="mt-3 text-base text-slate-600">
              Start completely free today. Upgrade when you need ultra-HD print exports and team kits.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-full bg-teal-400 text-slate-900 font-extrabold text-[10px]">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Free Tier</h3>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    Forever Free
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Perfect for hobbyists, solo creators, and occasional graphic designers.
                </p>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-slate-900">$0</span>
                  <span className="text-sm text-slate-500 ml-2">/ month</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited canvas artboards</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Access to all 12 core templates</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Standard 1x PNG & JPEG downloads</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Full vector shape and sticker library</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Freehand brush, marker & highlighter</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Save & Load JSON project files</span>
                  </div>
                </div>
              </div>

              <Link
                to="/editor"
                className="w-full text-center py-3.5 px-6 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm transition-all"
              >
                Start Designing Free
              </Link>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="relative bg-white rounded-3xl border-2 border-indigo-600 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-indigo-500/10 transition-all">
              {/* Popular Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
                MOST POPULAR
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Pro Studio</h3>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                    For Power Creators
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  For professional creators, marketing teams, and agencies needing ultra-HD output.
                </p>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-slate-900">
                    ${billingCycle === 'yearly' ? '9.60' : '12'}
                  </span>
                  <span className="text-sm text-slate-500 ml-2">/ month</span>
                  {billingCycle === 'yearly' && (
                    <span className="text-xs text-teal-600 font-bold ml-2">billed annually</span>
                  )}
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center space-x-3 text-sm font-semibold text-slate-900">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Everything in Free, plus:</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>2x Retina & 3x Ultra-HD Print Exports</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Scalable Vector Graphics (SVG) export</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>1-Click Brand Kit palettes & typography engine</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Multi-Page document presentation switcher</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Layer order manager, lock & eyeball visibility</span>
                  </div>
                </div>
              </div>

              <Link
                to="/editor"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 transition-all active:scale-95"
              >
                Launch Pro Studio Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="reviews" className="py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 mb-2">
              CREATOR PRAISE
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Loved by 10,000+ Fast-Moving Designers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "StudioFlow completely replaced our bulky design subscription. The light-theme interface is clean,
                  snapping is instant, and exporting 3x Retina PNGs without watermarks saves us hours every week."
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sarah Lin"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Sarah Lin</h4>
                  <span className="text-[11px] text-slate-500">Design Lead @ Momentum Media</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "The 1-click Brand Kit is magic. I can take any Instagram template and immediately re-theme it
                  to my client's colors with zero friction. The freehand brush tool is the cherry on top."
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Marcus Vance"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Marcus Vance</h4>
                  <span className="text-[11px] text-slate-500">YouTube Creator (420k Subs)</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "No AI slop, no messy cyber glows, just pure daylight craftsmanship. It feels like what modern design software
                  should have always been. StudioFlow is lightning quick."
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Elena Rostova</h4>
                  <span className="text-[11px] text-slate-500">Founder @ Studio Nord</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM BANNER CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Create Your Next Masterpiece?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Join thousands of creators building high-converting designs in their browser. No signup required to start.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/editor"
              className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-600 hover:to-teal-500 text-white font-extrabold text-base shadow-xl shadow-teal-500/20 transition-all active:scale-95"
            >
              <span>Launch StudioFlow Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <StudioFlowLogo size="sm" className="mb-4" />
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                The next-generation browser-based design studio with pro-grade vector tools, brand kits, and instant retina exports.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><Link to="/editor" className="hover:text-indigo-600">Online Editor</Link></li>
                <li><a href="#templates" className="hover:text-indigo-600">12+ Templates</a></li>
                <li><a href="#brandkits" className="hover:text-indigo-600">Brand Kits</a></li>
                <li><a href="#features" className="hover:text-indigo-600">Vector Stickers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="#pricing" className="hover:text-indigo-600">Pricing Comparison</a></li>
                <li><Link to="/editor" className="hover:text-indigo-600">Documentation</Link></li>
                <li><Link to="/editor" className="hover:text-indigo-600">Keyboard Shortcuts</Link></li>
                <li><a href="#reviews" className="hover:text-indigo-600">Customer Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Legal & Privacy</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><span className="hover:text-indigo-600 cursor-pointer">Client-Side Privacy</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer">Security Overview</span></li>
                <li><span className="text-emerald-600 font-semibold flex items-center space-x-1 mt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>All Systems Operational</span>
                </span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <div>
              © 2026 StudioFlow. Built for high-speed creative design.
            </div>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-600 cursor-pointer">Twitter / X</span>
              <span className="hover:text-slate-600 cursor-pointer">GitHub</span>
              <span className="hover:text-slate-600 cursor-pointer">Dribbble</span>
              <span className="hover:text-slate-600 cursor-pointer">Discord</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
