import { useEffect, useState } from 'react';
import { Star } from './Icons';
import { CATEGORIES, RATING_DESCRIPTIONS } from '../data';

// Utility to convert camelCase keys (like 'nearestHub') into Title Case ('Nearest Hub')
const formatKey = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// SVG Chevron for the accordion
const Chevron = ({ isOpen }) => (
  <svg 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B24C38]' : 'text-[#D5CFC4]'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function SiteModal({ site, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Lock body scroll and reset accordion state when a new site opens
  useEffect(() => {
    if (site) {
      document.body.style.overflow = 'hidden';
      setExpandedCategory(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [site]);

  if (!site) return null;

  const scores = Object.values(site.ratings).map(r => r.score);
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  const toggleCategory = (key) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2A2626]/40 backdrop-blur-sm fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#F9F6F0] w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col md:flex-row border border-[#D5CFC4] shadow-2xl relative"
        onClick={e => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-10 text-[#2A2626] hover:text-[#B24C38] transition-colors mix-blend-difference"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Image & Title */}
        <div className="md:w-2/5 relative h-64 md:h-full border-b md:border-b-0 md:border-r border-[#D5CFC4]">
          <img src={site.image} alt={site.name} className="w-full h-full object-cover grayscale-[30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2626]/90 via-transparent to-transparent flex flex-col justify-end p-8">
            <span className="font-sans text-xs text-white/70 uppercase tracking-[0.2em] mb-2">{site.location}</span>
            <h2 className="font-serif text-4xl text-[#F9F6F0]">{site.name}</h2>
          </div>
        </div>

        {/* Right Side: Accordion Content */}
        <div className="md:w-3/5 overflow-y-auto p-8 md:p-12 scrollbar-hide">
          <div className="mb-12">
            <h3 className="font-sans text-[10px] text-[#B24C38] uppercase tracking-[0.3em] font-bold mb-4">Curated Assessment</h3>
            <p className="font-serif text-xl text-[#2A2626] leading-relaxed">{site.description}</p>
            
            <div className="mt-8 flex items-end gap-4 border-l-2 border-[#B24C38] pl-6">
              <span className="font-serif text-6xl text-[#2A2626] leading-none">{avg}</span>
              <div className="mb-1">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <Star key={num} filled={num <= Math.round(avg)} />
                  ))}
                </div>
                <span className="font-sans text-xs text-[#8C857B] uppercase tracking-widest mt-1 block">Overall Score</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#D5CFC4] pt-4">
            {Object.entries(CATEGORIES).map(([key, categoryName]) => {
              const data = site.ratings[key];
              const isOpen = expandedCategory === key;

              return (
                <div 
                  key={key} 
                  className="border-b border-[#D5CFC4] group transition-colors duration-500"
                >
                  {/* Accordion Header (Clickable) */}
                  <div 
                    className="py-6 px-4 -mx-4 cursor-pointer hover:bg-[#F0ECE1] flex justify-between items-center"
                    onClick={() => toggleCategory(key)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-grow">
                      <div className="md:w-1/3">
                        <h4 className="font-sans text-sm uppercase tracking-widest text-[#2A2626] font-medium mb-1">
                          {categoryName}
                        </h4>
                        <div className="mt-2 flex space-x-1">
                          {[1, 2, 3, 4, 5].map(num => (
                            <Star key={num} filled={num <= data.score} />
                          ))}
                        </div>
                      </div>
                      <div className="md:w-2/3 pr-4">
                        <p className="font-serif text-[#2A2626] text-lg leading-relaxed">{data.note}</p>
                        <p className="font-sans text-xs text-[#8C857B] mt-2 uppercase tracking-wider">
                          Standard: {RATING_DESCRIPTIONS[data.score]}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Chevron isOpen={isOpen} />
                    </div>
                  </div>

                  {/* Accordion Expanded Details */}
                  {isOpen && data.details && (
                    <div className="pb-6 px-4 -mx-4 bg-[#F0ECE1]/50 fade-in">
                      <div className="border-l border-[#B24C38] pl-4 ml-[33%] mt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                          {Object.entries(data.details).map(([detailKey, detailValue]) => (
                            <div key={detailKey}>
                              <span className="font-sans text-[9px] text-[#B24C38] uppercase tracking-widest block mb-1">
                                {formatKey(detailKey)}
                              </span>
                              <span className="font-serif text-base text-[#2A2626]">
                                {Array.isArray(detailValue) ? detailValue.join(', ') : detailValue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
