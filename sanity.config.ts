'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'jc-luxury-residential',
  title: 'JC Luxury Residential',
  basePath: '/studio',
  projectId: projectId || 'placeholder',
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
