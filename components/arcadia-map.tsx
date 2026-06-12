'use client';

// Real-geography map of Arcadia's three micro-areas (Leaflet + Esri
// light-gray basemap). Boundaries are informal approximations drawn
// from the arterial grid — adjust the lat/lng constants to refine.

import { useEffect, useRef } from 'react';

// All three boundaries are the exact polygons from Jordan's
// Google My Maps export (KML) — do not hand-adjust.
const AREAS: { name: string; sub: string; color: string; bounds: [number, number][][]; strong?: boolean }[] = [
  {
    // The lens between Camelback Rd (which bends along the mountain base)
    // and the Arizona Canal's arc, 44th St to the canal mouth near
    // Fashion Square. Traced from Jordan's drawn boundary.
    name: 'Arcadia Proper',
    sub: 'largest irrigated lots · strongest values',
    color: '#d4af5f',
    // Exact boundary exported from Jordan's Google My Maps drawing (KML)
    bounds: [[
      [33.5094384, -111.9866431],
      [33.5040351, -111.9869864],
      [33.5020311, -111.9849694],
      [33.4992398, -111.9815362],
      [33.4951958, -111.9753993],
      [33.4929768, -111.9716656],
      [33.4902568, -111.9657433],
      [33.4891831, -111.962868],
      [33.4891115, -111.9605506],
      [33.4900063, -111.9579327],
      [33.4911516, -111.9547999],
      [33.4907579, -111.9519675],
      [33.4900779, -111.9486201],
      [33.4901137, -111.9463027],
      [33.4904, -111.9436848],
      [33.4915811, -111.9411957],
      [33.4950526, -111.9348443],
      [33.5020311, -111.9345868],
      [33.5017448, -111.9632971],
      [33.5017448, -111.9647563],
      [33.5091879, -111.9782746],
    ]],
    strong: true,
  },
  {
    // Exact boundary exported from Jordan's Google My Maps drawing (KML)
    name: 'Arcadia Lite',
    sub: 'friendlier entry points',
    color: '#6fa8dc',
    bounds: [[
      [33.5025759, -112.0129967],
      [33.495168, -112.0131254],
      [33.4948816, -111.9869471],
      [33.5043293, -111.9869042],
      [33.5069416, -111.9911099],
      [33.5096969, -111.9943285],
      [33.5099473, -112.0130396],
    ]],
  },
  {
    // Exact boundary exported from Jordan's Google My Maps drawing (KML)
    name: 'Arcadia Osborn',
    sub: 'renovation hotspot',
    color: '#93c47d',
    bounds: [[
      [33.4947385, -111.9955655],
      [33.4803145, -111.9954796],
      [33.4799923, -111.9607611],
      [33.4891115, -111.9605506],
      [33.4889723, -111.9622008],
      [33.4893342, -111.9637652],
      [33.4902568, -111.9657433],
      [33.4912669, -111.967928],
      [33.4928417, -111.9712325],
      [33.4940227, -111.9738503],
      [33.4946311, -111.9747515],
      [33.4950248, -111.9955655],
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
        Boundaries as drawn by Jordan Cohen. Micro-area definitions are
        informal and used locally by residents and agents.
      </figcaption>
    </figure>
  );
}
