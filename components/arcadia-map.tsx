// Schematic map of Arcadia's three micro-areas.
// Boundaries are informal/approximate — edit shapes here if needed.

export function ArcadiaMap() {
  return (
    <figure className="mt-12">
      <p className="eyebrow mb-4">The Micro-Areas, Mapped</p>
      <svg
        viewBox="0 0 720 460"
        role="img"
        aria-label="Schematic map of Arcadia Proper, Arcadia Lite, and Arcadia Osborn between 32nd and 68th Streets, Camelback Road and Thomas Road"
        className="w-full border border-line bg-stone"
      >
        {/* Camelback Mountain */}
        <path
          d="M390 58 L450 18 L500 44 L560 10 L640 58 Z"
          fill="#1c1c1b"
          opacity="0.12"
        />
        <text x="505" y="50" fontSize="12" fill="#6b6b68" textAnchor="middle" fontStyle="italic">
          Camelback Mountain
        </text>

        {/* Zone: Arcadia Lite — 32nd to 44th, Camelback to Indian School */}
        <rect x="70" y="90" width="160" height="170" fill="#1c1c1b" opacity="0.07" stroke="#1c1c1b" strokeOpacity="0.35" strokeDasharray="5 4" />
        <text x="150" y="165" fontSize="15" fill="#1c1c1b" textAnchor="middle" fontFamily="Georgia, serif">Arcadia</text>
        <text x="150" y="184" fontSize="15" fill="#1c1c1b" textAnchor="middle" fontFamily="Georgia, serif">Lite</text>

        {/* Zone: Arcadia Proper — 44th to 68th, Camelback to Indian School */}
        <rect x="230" y="90" width="400" height="170" fill="#1c1c1b" opacity="0.16" stroke="#1c1c1b" strokeWidth="1.5" />
        <text x="430" y="165" fontSize="17" fill="#1c1c1b" textAnchor="middle" fontFamily="Georgia, serif">Arcadia Proper</text>
        <text x="430" y="186" fontSize="11" fill="#6b6b68" textAnchor="middle">largest irrigated lots · strongest values</text>

        {/* Zone: Arcadia Osborn — 44th to 68th, Indian School to Thomas */}
        <rect x="230" y="260" width="400" height="120" fill="#1c1c1b" opacity="0.07" stroke="#1c1c1b" strokeOpacity="0.35" strokeDasharray="5 4" />
        <text x="430" y="315" fontSize="15" fill="#1c1c1b" textAnchor="middle" fontFamily="Georgia, serif">Arcadia Osborn</text>
        <text x="430" y="334" fontSize="11" fill="#6b6b68" textAnchor="middle">renovation hotspot</text>

        {/* Arizona Canal (diagonal through NE) */}
        <path d="M630 90 C 540 130, 470 100, 400 90" fill="none" stroke="#6b6b68" strokeWidth="2" strokeDasharray="2 5" opacity="0.7" />
        <text x="560" y="118" fontSize="10" fill="#6b6b68" fontStyle="italic">Arizona Canal</text>

        {/* Street grid: horizontal */}
        <line x1="40" y1="90" x2="680" y2="90" stroke="#1c1c1b" strokeWidth="1.2" />
        <text x="42" y="84" fontSize="11" fill="#1c1c1b">Camelback Rd</text>
        <line x1="40" y1="260" x2="680" y2="260" stroke="#1c1c1b" strokeWidth="1.2" />
        <text x="42" y="254" fontSize="11" fill="#1c1c1b">Indian School Rd</text>
        <line x1="40" y1="330" x2="680" y2="330" stroke="#6b6b68" strokeWidth="0.8" strokeDasharray="3 4" />
        <text x="42" y="324" fontSize="10" fill="#6b6b68">Osborn Rd</text>
        <line x1="40" y1="380" x2="680" y2="380" stroke="#1c1c1b" strokeWidth="1.2" />
        <text x="42" y="396" fontSize="11" fill="#1c1c1b">Thomas Rd</text>

        {/* Street grid: vertical */}
        <line x1="70" y1="70" x2="70" y2="400" stroke="#6b6b68" strokeWidth="0.9" />
        <text x="70" y="416" fontSize="11" fill="#6b6b68" textAnchor="middle">32nd St</text>
        <line x1="230" y1="70" x2="230" y2="400" stroke="#6b6b68" strokeWidth="0.9" />
        <text x="230" y="416" fontSize="11" fill="#6b6b68" textAnchor="middle">44th St</text>
        <line x1="430" y1="70" x2="430" y2="400" stroke="#6b6b68" strokeWidth="0.6" strokeDasharray="3 4" />
        <text x="430" y="416" fontSize="10" fill="#6b6b68" textAnchor="middle">56th St</text>
        <line x1="630" y1="70" x2="630" y2="400" stroke="#6b6b68" strokeWidth="0.9" />
        <text x="630" y="416" fontSize="11" fill="#6b6b68" textAnchor="middle">68th St</text>

        {/* North arrow */}
        <g transform="translate(688, 30)">
          <path d="M0 14 L5 0 L10 14 L5 10 Z" fill="#1c1c1b" />
          <text x="5" y="28" fontSize="10" fill="#1c1c1b" textAnchor="middle">N</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-xs text-mist">
        Schematic only — boundaries are informal and not to scale. Phoenix /
        Scottsdale border runs near 64th Street.
      </figcaption>
    </figure>
  );
}
