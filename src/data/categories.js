// ─── Shared Category Hierarchy ───────────────────────────────────────────────
// This file is the single source of truth for all categories across the app.
// Used in: Admin AddProducts, Public Browse pages, API filters, etc.

export const CATEGORY_DATA = {
  Airsoft: {
    "BB's": ["Biodegradable", "Non Bio"],
    "Guns": ["Rifles", "Pistols", "Shotguns", "Magazines", "Accessories", "Parts"],
    "Goggles / Masks": ["Eye Protection", "Mesh Masks", "Full Face Masks", "Accessories"],
    "Magazines / Speed Loaders": ["Mid-Cap Magazines", "Hi-Cap Magazines", "Flash Mags"],
    "Tactical Gear": ["Gloves", "Vests", "Vest Accessories", "Pouches", "Bags", "Protective Gear", "Accessories"],
    "Optics": ["Sights", "Scopes", "Accessories"],
    "Gas": ["CO2", "Green Gas"],
    "Batteries / Chargers": ["NIMH", "LIPO", "Lithium", "Standard", "Accessories"],
  },
  Paintball: {
    "Paintballs": ["50 Cal - ECO", "50 Cal - Prime", "68 Cal - ECO", "68 Cal - Field", "68 Cal - Field Pro", "68 Cal - Iconic"],
    "Markers": ["Mechanical", "Electronic", "Field", "Sidearm", "Parts", "Accessories"],
    "Air Systems": ["CO2 Tank", "Compressed Air Tank", "Tank Accessories & Parts"],
    "Goggles": ["Goggles", "Accessories & Parts"],
    "Gear": ["Bags", "Body Protection", "Harnesses / Vests", "Pods & Haulers", "Jerseys", "Pants", "Gloves"],
    "Loaders": ["Loaders", "Accessories & Parts"],
  },
  "Field Supplies": {
    "Netting": ["Hemmed & Grommet", "NON Grommet", "Fire Retardant", "10x100", "10x300", "12x300", "16x300", "20x300", "20x300 Hybrid"],
    "Bunkers": ["Sup Air"],
    "Compressors": ["Alkin"],
    "Compressor Accessories": [],
    "Fill Stations": ["CO2 Mini", "CO2 Deluxe", "Compressed Air - The Unit"],
    "Banners": [],
    "Grenades / Smoke": [],
    "Misc": ["Chronos", "Other"],
  },
  "Less Lethal": {
    "Projectiles": ["Cordon X Pepper Irritant", "Cordon X Rubber Balls"],
    "Launchers": [],
    "Accessories": [],
  },
  Haunt: {
    "Paintballs": ["Glow"],
    "Markers": [],
    "Masks": [],
    "Accessories": ["Gun Mounts", "Plastics", "Gloves", "Coil Remotes", "Chest / Body Protectors"],
  },
  Apparel: {
    "Hats": [],
    "Shirts": [],
    "Shorts": [],
    "Jerseys": [],
    "Pants": [],
    "Hoodies / Jackets": [],
    "Accessories": [],
  },
}

// ─── Helper: Get all main category names ─────────────────────────────────────
export const getMainCategories = () => Object.keys(CATEGORY_DATA)

// ─── Helper: Get Sub Categories #1 given a main category ─────────────────────
export const getSubCategories1 = (mainCategory) => {
  if (!mainCategory || !CATEGORY_DATA[mainCategory]) return []
  return Object.keys(CATEGORY_DATA[mainCategory])
}

// ─── Helper: Get Sub Categories #2 given main + sub1 ─────────────────────────
export const getSubCategories2 = (mainCategory, subCategory1) => {
  if (!mainCategory || !subCategory1) return []
  return CATEGORY_DATA[mainCategory]?.[subCategory1] || []
}

// ─── Category metadata (for Browse pages - icons, slugs, descriptions) ────────
export const CATEGORY_META = {
  Airsoft: {
    slug: 'airsoft',
    icon: '🔫',
    description: 'Rifles, pistols, BB\'s, gear and more for the competitive airsoft player.',
    color: '#2a7d4f',
  },
  Paintball: {
    slug: 'paintball',
    icon: '🎯',
    description: 'Markers, paintballs, air systems, gear and accessories.',
    color: '#c8341b',
  },
  'Field Supplies': {
    slug: 'field-supplies',
    icon: '🏗️',
    description: 'Netting, bunkers, compressors and everything to run your field.',
    color: '#b07a12',
  },
  'Less Lethal': {
    slug: 'less-lethal',
    icon: '🛡️',
    description: 'Professional less-lethal projectiles, launchers and accessories.',
    color: '#1a4fa3',
  },
  Haunt: {
    slug: 'haunt',
    icon: '👻',
    description: 'Specialized equipment for haunted attractions and events.',
    color: '#6b21a8',
  },
  Apparel: {
    slug: 'apparel',
    icon: '👕',
    description: 'Hats, shirts, jerseys, pants and more branded apparel.',
    color: '#374151',
  },
}
