'use client';

// Admin panel — manage listings, neighborhoods, testimonials, and
// articles at /studio. Requires NEXT_PUBLIC_SANITY_PROJECT_ID.
// Deep links like /studio/structure are rewritten here in
// next.config.mjs; the Studio handles its own routing client-side.

import { NextStudio } from 'next-sanity/studio';
import config, { projectId } from '@/sanity.config';

export default function StudioPage() {
  if (!projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-[6vw]">
        <div className="max-w-xl border border-line bg-stone p-10">
          <p className="eyebrow mb-4">Admin Setup</p>
          <h1 className="font-serif text-3xl">The CMS isn’t connected yet.</h1>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-mist">
            <li>Create a free account at sanity.io and create a project (any name, dataset: “production”).</li>
            <li>Copy the Project ID from the project dashboard.</li>
            <li>
              In Vercel → Settings → Environment Variables, add
              <code className="mx-1 bg-paper px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>
              with that ID, and redeploy.
            </li>
            <li>In sanity.io → API → CORS Origins, add this site’s URL (with credentials allowed).</li>
          </ol>
          <p className="mt-6 text-sm text-mist">
            Then reload this page — your admin panel will appear here.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
