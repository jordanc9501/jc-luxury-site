'use client';

// Real-geography map of Arcadia's three micro-areas (Leaflet + Esri
// light-gray basemap). Boundaries are informal approximations drawn
// from the arterial grid — adjust the lat/lng constants to refine.

import { useEffect, useRef } from 'react';

// Arterial coordinates (approx.)
const CAMELBACK = 33.5093;
const INDIAN_SCHOOL = 33.4949;
const THOMAS = 33.4805;
const ST_32 = -112.007;
const ST_40 = -111.9897;
const ST_44 = -111.981;
const ST_56 = -111.9554;
const ST_68 = -111.9295;
const AREAS: { name: string; sub: string; color: string; bounds: [number, number][][]; strong?: boolean }[] = [
  {
    // The lens between Camelback Rd (which bends along the mountain base)
    // and the Arizona Canal's arc, 44th St to the canal mouth near
    // Fashion Square. Traced from Jordan's drawn boundary.
    name: 'Arcadia Proper',
    sub: 'largest irrigated lots · strongest values',
    color: '#d4af5f',
    bounds: [[
      [33.5093, -111.981],   // 44th & Camelback
      [33.5085, -111.9745],  // Camelback bending SE along the mountain
      [33.505, -111.965],
      [33.5023, -111.956],   // Camelback at ~56th
      [33.5023, -111.9295],  // Camelback at 68th
      [33.5015, -111.9268],  // NE tip — canal meets Camelback near Fashion Square
      [33.4985, -111.93],    // canal heading SW
      [33.4945, -111.934],
      [33.49, -111.9405],    // canal's southern dip
      [33.4888, -111.947],
      [33.492, -111.953],
      [33.4953, -111.9554],  // Arizona Falls (56th & Indian School)
      [33.4949, -111.96],    // canal crossing Indian School
      [33.499, -111.968],    // canal heading NW
      [33.506, -111.9805],   // canal at 44th St
    ]],
    strong: true,
  },
  {
    // 32nd to 44th, Camelback to Indian School
    name: 'Arcadia Lite',
    sub: 'friendlier entry points',
    color: '#6fa8dc',
    bounds: [[[INDIAN_SCHOOL, ST_32], [CAMELBACK, ST_32], [CAMELBACK, ST_44], [INDIAN_SCHOOL, ST_44]]],
  },
  {
    // 40th to 56th, Indian School to Thomas; NE corner clipped by the
    // canal's diagonal down to 56th St south of Arizona Falls.
    // Traced from Jordan's drawn boundary.
    name: 'Arcadia Osborn',
    sub: 'renovation hotspot',
    color: '#93c47d',
    bounds: [[
      [INDIAN_SCHOOL, ST_40],   // NW — Indian School & 40th
      [INDIAN_SCHOOL, -111.964], // Indian School at ~52nd
      [33.4925, -111.959],       // canal diagonal
      [33.4892, ST_56],          // canal reaches 56th, south of the Falls
      [THOMAS, ST_56],           // SE — Thomas & 56th
      [THOMAS, ST_40],           // SW — Thomas & 40th
    ]],
  },
];

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { L?: any }
}

export function ArcadiaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !ref.current) return;
    initialized.current = true;

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.async = true;
    script.onload = () => {
      const L = window.L;
      if (!L || !ref.current) return;
      const map = L.map(ref.current, {
        center: [33.4955, -111.9665],
        zoom: 13,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      // Satellite imagery + street/place labels
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Esri, Maxar, Earthstar Geographics', maxZoom: 18 },
      ).addTo(map);
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 },
      ).addTo(map);
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 },
      ).addTo(map);

      for (const a of AREAS) {
        const poly = L.polygon(a.bounds, {
          color: a.color,
          weight: 2.5,
          fillColor: a.color,
          fillOpacity: 0.3,
        }).addTo(map);
        poly.bindTooltip(
          `<div style="text-align:center;font-family:Georgia,serif;font-size:14px;color:#fff">${a.name}<br/><span style="font-family:Inter,Helvetica,sans-serif;font-size:10px;color:rgba(255,255,255,.8)">${a.sub}</span></div>`,
          { permanent: true, direction: 'center', className: 'arcadia-label' },
        );
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <figure className="mt-12">
      <p className="eyebrow mb-4">The Micro-Areas, Mapped</p>
      <style>{`.arcadia-label{background:rgba(17,17,16,.72);border:none;box-shadow:0 1px 6px rgba(0,0,0,.4);border-radius:2px;padding:6px 12px}.arcadia-label::before{display:none}`}</style>
      <div
        ref={ref}
        className="h-[440px] w-full border border-line bg-stone"
        aria-label="Map of Arcadia Proper, Arcadia Lite, and Arcadia Osborn in Phoenix, Arizona"
      />
      <figcaption className="mt-3 text-xs text-mist">
        Arcadia Proper: 44th–68th St, Camelback Rd to the Arizona Canal ·
        Arcadia Lite: 32nd–44th St, Camelback to Indian School · Arcadia
        Osborn: 40th–56th St, Indian School to Thomas. Boundaries informal.
      </figcaption>
    </figure>
  );
}
