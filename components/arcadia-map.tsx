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
// Arizona Canal crossings: dips south to Arizona Falls at 56th & Indian School
const CANAL_AT_44 = 33.5028;
const CANAL_AT_56 = 33.4953;
const CANAL_AT_68 = 33.5016;

const AREAS: { name: string; sub: string; bounds: [number, number][][]; strong?: boolean }[] = [
  {
    // 44th to 68th, Camelback south to the Arizona Canal
    name: 'Arcadia Proper',
    sub: 'largest irrigated lots · strongest values',
    bounds: [[
      [CAMELBACK, ST_44],
      [CAMELBACK, ST_68],
      [CANAL_AT_68, ST_68],
      [CANAL_AT_56, ST_56],
      [CANAL_AT_44, ST_44],
    ]],
    strong: true,
  },
  {
    // 32nd to 44th, Camelback to Indian School
    name: 'Arcadia Lite',
    sub: 'friendlier entry points',
    bounds: [[[INDIAN_SCHOOL, ST_32], [CAMELBACK, ST_32], [CAMELBACK, ST_44], [INDIAN_SCHOOL, ST_44]]],
  },
  {
    // 40th to 56th, Indian School to Thomas
    name: 'Arcadia Osborn',
    sub: 'renovation hotspot',
    bounds: [[[THOMAS, ST_40], [INDIAN_SCHOOL, ST_40], [INDIAN_SCHOOL, ST_56], [THOMAS, ST_56]]],
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
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Esri, HERE, Garmin, OpenStreetMap contributors', maxZoom: 16 },
      ).addTo(map);
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16 },
      ).addTo(map);

      for (const a of AREAS) {
        const poly = L.polygon(a.bounds, {
          color: '#1c1c1b',
          weight: a.strong ? 2 : 1.25,
          dashArray: a.strong ? undefined : '6 5',
          fillColor: '#1c1c1b',
          fillOpacity: a.strong ? 0.14 : 0.06,
        }).addTo(map);
        poly.bindTooltip(
          `<div style="text-align:center;font-family:Georgia,serif;font-size:14px;color:#1c1c1b">${a.name}<br/><span style="font-family:Inter,Helvetica,sans-serif;font-size:10px;color:#6b6b68">${a.sub}</span></div>`,
          { permanent: true, direction: 'center', className: 'arcadia-label' },
        );
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <figure className="mt-12">
      <p className="eyebrow mb-4">The Micro-Areas, Mapped</p>
      <style>{`.arcadia-label{background:rgba(252,252,250,.85);border:1px solid #e3e3df;box-shadow:none;padding:6px 10px}.arcadia-label::before{display:none}`}</style>
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
