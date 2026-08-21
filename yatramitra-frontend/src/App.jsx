import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import SiteGrid from './components/SiteGrid';
import SiteModal from './components/SiteModal';
import NominateModal from './components/NominateModal';
export default function App() {
  const [selectedSite, setSelectedSite] = useState(null);
	const [isNominateOpen, setIsNominateOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-[#B24C38] selection:text-[#F9F6F0]">
      <Navbar onOpenNominate={() => setIsNominateOpen(true)} />
      <main>
        <Hero />
        <Pillars />
        <SiteGrid onSelectSite={setSelectedSite} />
      </main>

      <footer className="border-t border-[#D5CFC4] py-12 px-8 text-center bg-white">
        <div className="font-serif text-xl tracking-widest uppercase mb-4">Yatramitra</div>
        <p className="font-sans text-xs text-[#8C857B] tracking-widest uppercase">
          Promoting Authentic & Accessible Indian Tourism
        </p>
      </footer>

      <SiteModal site={selectedSite} onClose={() => setSelectedSite(null)} />
	  {/* Render the new modal */}
      <NominateModal isOpen={isNominateOpen} onClose={() => setIsNominateOpen(false)} />
    </div>
  );
}
