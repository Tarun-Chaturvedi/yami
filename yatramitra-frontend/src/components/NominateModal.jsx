import { useState, useEffect } from 'react';
import { Star } from './Icons';
import { CATEGORIES } from '../data';

export default function NominateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', location: '', image: '', description: '',
    ratings: {
      transport: { score: 0, note: '' },
      food: { score: 0, note: '' },
      safety: { score: 0, note: '' },
      disability: { score: 0, note: '' },
      hygiene: { score: 0, note: '' },
    }
  });

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/sites/nominate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setTimeout(() => { 
            setIsSubmitted(false); 
            setStep(1); 
            // Reset form completely here if desired
          }, 500);
        }, 3000);
      } else {
        console.error("Failed to submit nomination");
      }
    } catch (error) {
      console.error("Error submitting nomination:", error);
    }
  };

  const handleRatingChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: { ...prev.ratings[category], [field]: value }
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2A2626]/60 backdrop-blur-md fade-in" onClick={onClose}>
      <div 
        className="bg-[#F9F6F0] w-full max-w-3xl h-[85vh] md:h-auto md:max-h-[85vh] overflow-y-auto border border-[#D5CFC4] shadow-2xl relative scrollbar-hide"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 z-10 text-[#2A2626] hover:text-[#B24C38] transition-colors">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-64 text-center fade-in">
              <h2 className="font-serif text-4xl text-[#2A2626] mb-4">Nomination Received</h2>
              <p className="font-sans text-sm text-[#8C857B] uppercase tracking-widest max-w-md">
                Thank you. Our curation team will review the accessibility standards before publishing this site.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <span className="font-sans text-[10px] text-[#B24C38] uppercase tracking-[0.3em] font-bold mb-2 block">
                  Step 0{step} of 02
                </span>
                <h2 className="font-serif text-4xl text-[#2A2626]">
                  {step === 1 ? 'Site Information' : 'Accessibility Assessment'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="fade-in">
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <label className="font-sans text-xs uppercase tracking-widest text-[#8C857B] block mb-2">Site Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D5CFC4] pb-2 font-serif text-2xl text-[#2A2626] focus:outline-none focus:border-[#B24C38] transition-colors"
                        placeholder="e.g., Rumi Darwaza"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs uppercase tracking-widest text-[#8C857B] block mb-2">Location (City, State)</label>
                      <input 
                        required
                        type="text" 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D5CFC4] pb-2 font-serif text-xl text-[#2A2626] focus:outline-none focus:border-[#B24C38] transition-colors"
                        placeholder="e.g., Lucknow, Uttar Pradesh"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs uppercase tracking-widest text-[#8C857B] block mb-2">Image URL</label>
                      <input 
                        type="url" 
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D5CFC4] pb-2 font-sans text-sm text-[#2A2626] focus:outline-none focus:border-[#B24C38] transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs uppercase tracking-widest text-[#8C857B] block mb-2">Brief Description</label>
                      <textarea 
                        required
                        rows="3"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D5CFC4] pb-2 font-serif text-lg text-[#2A2626] focus:outline-none focus:border-[#B24C38] transition-colors resize-none"
                        placeholder="What makes this site significant?"
                      ></textarea>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!formData.name || !formData.location}
                        className="font-sans text-xs uppercase tracking-[0.2em] bg-[#2A2626] text-[#F9F6F0] px-8 py-4 hover:bg-[#B24C38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue Assessment
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10">
                    {Object.entries(CATEGORIES).map(([key, label]) => (
                      <div key={key} className="border-b border-[#D5CFC4] pb-6">
                        <div className="flex justify-between items-center mb-4">
                          <label className="font-sans text-sm uppercase tracking-widest text-[#2A2626] font-medium">
                            {label}
                          </label>
                          {/* Interactive Star Rating */}
                          <div className="flex space-x-1 cursor-pointer">
                            {[1, 2, 3, 4, 5].map(num => (
                              <div key={num} onClick={() => handleRatingChange(key, 'score', num)}>
                                <Star filled={num <= formData.ratings[key].score} className="w-6 h-6 hover:scale-110 transition-transform" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <input 
                          type="text" 
                          required
                          value={formData.ratings[key].note}
                          onChange={e => handleRatingChange(key, 'note', e.target.value)}
                          className="w-full bg-transparent border-none font-serif text-lg text-[#8C857B] focus:outline-none focus:text-[#2A2626] transition-colors"
                          placeholder="Add observation notes (e.g., 'Ramps available but steep')..."
                        />
                      </div>
                    ))}
                    
                    <div className="pt-4 flex justify-between items-center">
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="font-sans text-xs uppercase tracking-[0.2em] text-[#8C857B] hover:text-[#2A2626] transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="font-sans text-xs uppercase tracking-[0.2em] bg-[#B24C38] text-[#F9F6F0] px-8 py-4 hover:bg-[#2A2626] transition-colors"
                      >
                        Submit for Review
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
