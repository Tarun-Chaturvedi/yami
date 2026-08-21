export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden border-b border-[#D5CFC4] bg-[#F9F6F0] px-8 pt-20 md:px-24">

      {/* ─────────────────────────────────────
          SUBTLE ACTIVE BACKGROUND
      ───────────────────────────────────── */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* Soft atmospheric field */}
        <div
          className="absolute -right-[10%] top-[8%] h-[85%] w-[65%] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(213,207,196,0.28) 0%, rgba(213,207,196,0.10) 35%, transparent 70%)",
          }}
        />

        {/* Fine horizontal field lines */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 89px, rgba(213,207,196,0.65) 90px)",
          }}
        />

        {/* Fine vertical field lines — weighted toward the right */}
        <div
          className="absolute right-0 top-0 h-full w-[55%] opacity-[0.32]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0px, transparent 88px, rgba(213,207,196,0.7) 89px)",
          }}
        />

        {/* Contour / route lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.42]"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {/* Large contour passing behind the heading */}
          <path
            d="M-100 650
               C180 580 210 390 470 430
               C700 465 650 650 890 610
               C1130 570 1080 300 1370 280
               C1500 270 1570 300 1700 240"
            stroke="#D5CFC4"
            strokeWidth="1"
          />

          <path
            d="M-120 680
               C180 610 230 420 480 460
               C710 495 690 675 920 635
               C1150 595 1110 330 1380 310
               C1510 300 1580 325 1710 270"
            stroke="#D5CFC4"
            strokeWidth="1"
          />

          {/* Right-side contour */}
          <path
            d="M820 120
               C1000 180 960 340 1110 365
               C1250 390 1290 180 1500 190
               C1580 195 1640 225 1700 250"
            stroke="#D5CFC4"
            strokeWidth="1"
          />

          {/* Small active route */}
          <path
            d="M930 610
               C1030 550 1000 460 1090 420
               C1180 380 1210 330 1325 285"
            stroke="#B24C38"
            strokeWidth="1"
            strokeDasharray="2 8"
            className="animate-[dash_16s_linear_infinite]"
          />

          {/* Quiet location points */}
          <circle cx="930" cy="610" r="2.5" fill="#B24C38" />
          <circle cx="1090" cy="420" r="2.5" fill="#B24C38" />
          <circle cx="1325" cy="285" r="2.5" fill="#B24C38" />

          {/* Active pulse */}
          <circle cx="1090" cy="420" r="5" fill="#B24C38">
            <animate
              attributeName="r"
              values="4;9;4"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.15;0.8"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Extremely subtle vertical annotation */}
        <div className="absolute bottom-10 right-8 hidden font-['Outfit'] text-[8px] uppercase tracking-[0.28em] text-[#8C857B]/60 lg:block [writing-mode:vertical-rl]">
          Access / Context / Dignity
        </div>

      </div>


      {/* ─────────────────────────────────────
          HERO CONTENT
      ───────────────────────────────────── */}

      <div className="relative z-10 flex h-full flex-col justify-center">

        <div className="max-w-5xl">

          {/* Eyebrow */}
          <p className="mb-8 flex items-center gap-4 font-['Outfit'] text-xs font-medium uppercase tracking-[0.3em] text-[#B24C38]">

            <span className="inline-block h-px w-10 bg-[#B24C38]" />

            The Standard for Inclusive Tourism

          </p>


          {/* Main heading */}
          <h1 className="mb-9 max-w-5xl font-['Cormorant_Garamond'] text-[clamp(3.5rem,6vw,6.5rem)] font-light leading-[1.0] tracking-[-0.025em] text-[#2A2626]">

            Evaluating heritage
            <br />

            through the lens of
            <br />

            <span className="italic text-[#8C857B]">
              accessibility & dignity.
            </span>

          </h1>


          {/* Description */}
          <p className="max-w-2xl font-['Outfit'] text-base font-light leading-[1.75] tracking-[0.01em] text-[#2A2626] md:text-lg">
            A curated rating system—akin to a Michelin guide—assessing
            India's cultural sites across five critical pillars. We ensure
            every traveler can experience our heritage with reliability
            and contextual awareness.
          </p>

        </div>


        {/* ─────────────────────────────────────
            ORIGINAL STRUCTURAL ELEMENT
        ───────────────────────────────────── */}

        <div className="absolute bottom-0 right-0 hidden h-[43%] w-1/3 flex-col border-l border-t border-[#D5CFC4] lg:flex">

          <div className="flex flex-1 items-end border-b border-[#D5CFC4] p-6">

            <span
              className="font-['Outfit'] text-[10px] uppercase tracking-[0.2em] text-[#8C857B]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Pillars of Access
            </span>

          </div>

          <div className="flex flex-1">

            <div className="flex-1 border-r border-[#D5CFC4]" />

            <div className="flex-1 bg-[#F0ECE1]/50" />

          </div>

        </div>

      </div>


      {/* ─────────────────────────────────────
          LOCAL ANIMATION
      ───────────────────────────────────── */}

      <style>{`
        @keyframes dash {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -160;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[dash_16s_linear_infinite\\] {
            animation: none;
          }
        }
      `}</style>

    </section>
  );
}
