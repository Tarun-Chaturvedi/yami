export default function Navbar({ onOpenNominate }) {
  return (
    <nav className="fixed w-full top-0 z-40 px-8 py-6 flex justify-between items-center mix-blend-difference text-[#F9F6F0]">
      <div className="font-['Cormorant_Garamond'] text-2xl tracking-widest uppercase">Yatramitra</div>
      
      <div className="flex items-center gap-8">
        <div className="font-['Outfit'] text-xs tracking-[0.2em] uppercase hidden md:block opacity-80">
          Cultural Heritage Rating System
        </div>
        
        {/* New Contribute Button */}
        <button 
          onClick={onOpenNominate}
          className="font-['Outfit'] text-[10px] tracking-[0.2em] uppercase border border-[#F9F6F0] px-4 py-2 hover:bg-[#F9F6F0] hover:text-[#2A2626] transition-colors"
        >
          Nominate Site
        </button>
      </div>
    </nav>
  );
}
