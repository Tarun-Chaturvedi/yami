import { useState, useMemo, useEffect } from 'react';
import { Star, ArrowRight } from './Icons';
import { CATEGORIES } from '../data';

export default function SiteGrid({ onSelectSite }) {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('overall');
  const [minScore, setMinScore] = useState(0);
  const [selectedCity, setSelectedCity] = useState('All'); // New state for city selection

  useEffect(() => {
    fetch('https://yami-3vw3.vercel.app/api/sites')
      .then(response => response.json())
      .then(data => {
        setSites(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching sites:", error);
        setIsLoading(false);
      });
  }, []);

  // Dynamically extract a unique list of cities from the fetched data
  const availableCities = useMemo(() => {
    const citySet = new Set();
    sites.forEach(site => {
      // Smart extraction: Checks for known major hubs first, 
      // otherwise falls back to the first part of the location string.
      const loc = site.location;
      if (loc.includes('Lucknow')) citySet.add('Lucknow');
      else if (loc.includes('Agra')) citySet.add('Agra');
      else if (loc.includes('Hampi')) citySet.add('Hampi');
      else citySet.add(loc.split(',')[0].trim());
    });
    return Array.from(citySet).sort();
  }, [sites]);

  // Compute the sorted and filtered list dynamically
  const displayData = useMemo(() => {
    let filtered = sites;
    
    // 1. Apply City Filter
    if (selectedCity !== 'All') {
      filtered = filtered.filter(site => site.location.includes(selectedCity));
    }

    // 2. Apply Minimum Score Filter
    if (minScore > 0) {
      filtered = filtered.filter(site => {
        if (sortBy === 'overall') return site.overallAvg >= minScore;
        return site.ratings[sortBy].score >= minScore;
      });
    }

    // 3. Apply Sorting
    return filtered.sort((a, b) => {
      let valA = sortBy === 'overall' ? a.overallAvg : a.ratings[sortBy].score;
      let valB = sortBy === 'overall' ? b.overallAvg : b.ratings[sortBy].score;
      
      if (valA === valB) return a.name.localeCompare(b.name);
      return valB - valA; 
    });
  }, [sites, sortBy, minScore, selectedCity]);

  return (
    <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[#2A2626] pb-6 gap-4">
        <h2 className="font-serif text-4xl">Curated Destinations</h2>
        <span className="font-sans text-xs uppercase tracking-[0.2em] hidden md:block">
          Select a site for the full report
        </span>
      </div>

      {/* Sticky Filter & Sort Bar */}
      <div className="sticky top-[88px] z-30 bg-[#F9F6F0]/95 backdrop-blur-sm py-4 mb-12 border-b border-[#D5CFC4] flex flex-wrap gap-8 items-center -mx-8 px-8 md:mx-0 md:px-0">
        
        {/* NEW: City / Destination Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="font-sans text-[10px] text-[#B24C38] uppercase tracking-[0.2em] font-bold">
            Destination
          </label>
          <select 
            id="city"
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent font-serif text-xl text-[#2A2626] border-none outline-none cursor-pointer focus:ring-0 w-full min-w-[150px]"
          >
            <option value="All">All Regions</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sort" className="font-sans text-[10px] text-[#B24C38] uppercase tracking-[0.2em] font-bold">
            Prioritize By
          </label>
          <select 
            id="sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-serif text-xl text-[#2A2626] border-none outline-none cursor-pointer focus:ring-0 w-full min-w-[200px]"
          >
            <option value="overall">Overall Excellence</option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Filter Dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="filter" className="font-sans text-[10px] text-[#B24C38] uppercase tracking-[0.2em] font-bold">
            Minimum Standard
          </label>
          <select 
            id="filter"
            value={minScore} 
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="bg-transparent font-sans text-sm tracking-widest uppercase text-[#2A2626] border-none outline-none cursor-pointer focus:ring-0 w-full min-w-[150px]"
          >
            <option value={0}>Any Rating</option>
            <option value={3}>3+ Stars (Standard)</option>
            <option value={4}>4+ Stars (High)</option>
            <option value={5}>5 Stars (Exemplary)</option>
          </select>
        </div>

        {/* Result Count Indicator */}
        <div className="ml-auto font-sans text-xs text-[#8C857B] uppercase tracking-widest hidden sm:block">
          Showing {displayData.length} Sites
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-24 text-center">
          <h3 className="font-serif text-2xl text-[#8C857B] animate-pulse">Loading heritage sites...</h3>
        </div>
      ) : displayData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayData.map((site) => (
            <div 
              key={site._id} 
              className="group cursor-pointer flex flex-col" 
              onClick={() => onSelectSite(site)}
            >
              <div className="overflow-hidden aspect-[3/4] border border-[#D5CFC4] relative mb-6">
                <div className="absolute inset-0 bg-[#2A2626]/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                  loading="lazy"
                />
                
                {/* Dynamic Rating Badge */}
                <div className="absolute bottom-0 left-0 bg-[#F9F6F0] z-20 px-4 py-3 flex flex-col border-t border-r border-[#D5CFC4]">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl leading-none pt-1">
                      {sortBy === 'overall' ? site.overallAvg.toFixed(1) : site.ratings[sortBy].score.toFixed(1)}
                    </span>
                    <Star filled={true} className="w-4 h-4" />
                  </div>
                  {sortBy !== 'overall' && (
                    <span className="font-sans text-[8px] uppercase tracking-widest text-[#B24C38] mt-1">
                      {sortBy} Score
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-sans text-[10px] text-[#8C857B] uppercase tracking-widest">{site.location}</span>
                <div className="flex justify-between items-center mt-1">
                  <h3 className="font-serif text-2xl group-hover:text-[#B24C38] transition-colors duration-300">{site.name}</h3>
                  <div className="text-[#D5CFC4] group-hover:text-[#B24C38] transition-colors duration-300 transform group-hover:translate-x-1">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-[#D5CFC4]">
          <h3 className="font-serif text-2xl text-[#8C857B] mb-2">No sites meet this standard</h3>
          <p className="font-sans text-sm text-[#8C857B] uppercase tracking-widest">Adjust your filters to see more results</p>
        </div>
      )}
    </section>
  );
}
