import { CATEGORIES, PILLAR_DESCRIPTIONS } from '../data';

export default function Pillars() {
  return (
    <section className="py-24 px-8 md:px-24 bg-white border-b border-[#D5CFC4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="font-serif text-3xl mb-4">The Assessment Criteria</h2>
            <p className="font-sans text-[#8C857B] text-sm leading-relaxed">
              Sites are meticulously evaluated across five categories. A star is awarded only when specific operational standards are met, ensuring true public accessibility.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {Object.entries(CATEGORIES).map(([key, title], index) => (
              <div key={key} className="flex gap-4">
                <div className="font-serif text-2xl text-[#D5CFC4]">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="font-sans font-medium text-[#2A2626] uppercase tracking-wider text-sm mb-2">
                    {title}
                  </h3>
                  <p className="font-serif text-[#8C857B] text-base">
                    {PILLAR_DESCRIPTIONS[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
