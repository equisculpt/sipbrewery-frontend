"use client";

import DemoDashboardModular from '../../components/DemoDashboardModular';
import PayTMStyleNavigation from '../../components/PayTMStyleNavigation';
import DemoHero from '../../components/DemoHero';
import PortfolioSummary from '../../components/PortfolioSummary';

export default function DemoPage() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b0620] via-[#0e0730] to-[#120a3a]">
      {/* Glow blobs (oil-paint like) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(closest-side, rgba(168,85,247,0.7), rgba(168,85,247,0) 70%)' }} />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.5), rgba(34,211,238,0) 70%)' }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(closest-side, rgba(236,72,153,0.5), rgba(236,72,153,0) 70%)' }} />
        {/* Soft vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 20%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.3) 100%)' }} />
        {/* Subtle noise for oil texture */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,\
          <svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'>\
          <filter id=\'n\'>\
            <feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/>\
            <feColorMatrix type=\'saturate\' values=\'0\'/>\
          </filter>\
          <rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.6\'/>\
          </svg>\n")' }} />
      </div>

      <PayTMStyleNavigation />
      
      <main className="pt-24">
        {/* Section 1: Performance Charts */}
        <section className="py-20 mx-6 mb-32 rounded-3xl bg-gradient-to-b from-[#0b0620] to-[#0e0730] border border-purple-500/20 shadow-2xl">
          <DemoHero />
        </section>

        {/* Visible Separator */}
        <div className="h-20 flex items-center justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        {/* Section 2: Portfolio Metrics */}
        <section className="py-24 mx-6 mb-32 rounded-3xl bg-gradient-to-b from-[#0e0730] via-[#120a3a] to-[#1a0f4a] border border-purple-500/20 shadow-2xl">
          <PortfolioSummary />
        </section>

        {/* Visible Separator */}
        <div className="h-20 flex items-center justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        {/* Section 3: SIP Brewery Dashboard */}
        <section className="py-28 mb-20">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-purple-200/80 text-lg mt-4">Institutional-grade investment management platform</p>
          </div>
          <DemoDashboardModular />
        </section>
      </main>
    </div>
  );
}
