import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Star } from '../components/Icons';
import { CATEGORIES } from '../data';

export default function AdminDashboard() {
  const [pendingSites, setPendingSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // Tracks which row is currently open

  useEffect(() => {
    fetchPendingSites();
  }, []);

  const fetchPendingSites = async () => {
    try {
      const res = await fetch('https://yami-3vw3.vercel.app/api/sites/pending');
      const data = await res.json();
      setPendingSites(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sites/${id}/approve`, { method: 'PATCH' });
      setPendingSites(pendingSites.filter(site => site._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nomination?")) return;
    try {
      await fetch(`http://localhost:5000/api/sites/${id}`, { method: 'DELETE' });
      setPendingSites(pendingSites.filter(site => site._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] selection:bg-[#B24C38] selection:text-[#F9F6F0] px-8 md:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end border-b border-[#2A2626] pb-6 mb-12">
          <div>
            <h1 className="font-serif text-5xl text-[#2A2626] mb-2">Curation Desk</h1>
            <p className="font-sans text-xs uppercase tracking-widest text-[#8C857B]">Pending Nominations Review</p>
          </div>
          <Link to="/" className="font-sans text-[10px] tracking-widest uppercase border border-[#D5CFC4] px-4 py-2 hover:bg-[#2A2626] hover:text-[#F9F6F0] transition-colors">
            Return Home
          </Link>
        </div>

        {isLoading ? (
          <div className="font-serif text-xl text-[#8C857B] animate-pulse">Loading queue...</div>
        ) : pendingSites.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-[#D5CFC4]">
            <h3 className="font-serif text-2xl text-[#8C857B] mb-2">Inbox Zero</h3>
            <p className="font-sans text-sm text-[#8C857B] uppercase tracking-widest">No pending nominations to review</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D5CFC4] font-sans text-[10px] uppercase tracking-widest text-[#8C857B]">
                  <th className="pb-4 font-medium">Site Details</th>
                  <th className="pb-4 font-medium">Location</th>
                  <th className="pb-4 font-medium">Proposed Score</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSites.map(site => (
                  <Fragment key={site._id}>
                    {/* Main Row */}
                    <tr className="border-b border-[#D5CFC4] hover:bg-[#F0ECE1] transition-colors">
                      <td className="py-6 pr-4">
                        <p className="font-serif text-2xl text-[#2A2626]">{site.name}</p>
                        <p className="font-sans text-xs text-[#8C857B] mt-1 max-w-sm truncate">{site.description}</p>
                      </td>
                      <td className="py-6 pr-4 font-sans text-sm text-[#2A2626]">{site.location}</td>
                      <td className="py-6 pr-4 font-serif text-2xl text-[#2A2626]">{site.overallAvg.toFixed(1)}</td>
                      <td className="py-6 text-right space-x-3">
                        <button 
                          onClick={() => toggleExpand(site._id)}
                          className="font-sans text-[10px] tracking-widest uppercase text-[#8C857B] hover:text-[#2A2626] transition-colors"
                        >
                          {expandedId === site._id ? 'Close' : 'Review'}
                        </button>
                        <button 
                          onClick={() => handleReject(site._id)}
                          className="font-sans text-[10px] tracking-widest uppercase text-[#B24C38] hover:text-[#2A2626] transition-colors"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => handleApprove(site._id)}
                          className="font-sans text-[10px] tracking-widest uppercase bg-[#2A2626] text-[#F9F6F0] px-4 py-2 hover:bg-[#B24C38] transition-colors"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedId === site._id && (
                      <tr className="bg-[#F0ECE1]/50 border-b border-[#D5CFC4] fade-in">
                        <td colSpan="4" className="p-8">
                          <div className="flex flex-col md:flex-row gap-12">
                            {/* Left: Image & Description */}
                            <div className="md:w-1/3">
                              {site.image && (
                                <img 
                                  src={site.image} 
                                  alt={site.name} 
                                  className="w-full aspect-video object-cover mb-4 border border-[#D5CFC4] grayscale-[20%]" 
                                />
                              )}
                              <h4 className="font-sans text-[10px] uppercase tracking-widest text-[#B24C38] mb-2">Submitted Description</h4>
                              <p className="font-serif text-[#2A2626] text-base leading-relaxed">{site.description}</p>
                            </div>

                            {/* Right: Detailed Ratings Grid */}
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                              {Object.entries(CATEGORIES).map(([key, label]) => {
                                const data = site.ratings[key] || { score: 0, note: 'No data provided.' };
                                return (
                                  <div key={key} className="border-l-2 border-[#D5CFC4] pl-4">
                                    <h5 className="font-sans text-[10px] uppercase tracking-widest text-[#2A2626] font-bold mb-1">
                                      {label}
                                    </h5>
                                    <div className="flex space-x-1 mb-2">
                                      {[1, 2, 3, 4, 5].map(num => (
                                        <Star key={num} filled={num <= data.score} className="w-3 h-3" />
                                      ))}
                                    </div>
                                    <p className="font-serif text-[#8C857B] text-base italic">"{data.note}"</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

