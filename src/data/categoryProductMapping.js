/**
 * Category Product Mapping Mockup
 * This file maps Featured Categories to Product Inventory
 * 
 * When a user clicks on a Featured Category card, they are redirected to
 * the Products page with the corresponding product slug
 */

export const categoryProductMapping = {
  // Featured Category → Product Inventory Mapping
  'eco-grade': {
    categoryName: 'Eco Grade',
    productSlug: 'biodegradable',
    inventory: {
      name: 'BBS',
      subCategory: 'Biodegradable',
    },
    description: 'Recreational play with biodegradable ammunition',
    breadcrumb: ['BBS', 'Biodegradable'],
  },
  
  'field-grade': {
    categoryName: 'Field Grade',
    productSlug: 'non-biodegradable',
    inventory: {
      name: 'BBS',
      subCategory: 'Non-Biodegradable',
    },
    description: 'Standard play with non-biodegradable ammunition',
    breadcrumb: ['BBS', 'Non-Biodegradable'],
  },
  
  'field-pro': {
    categoryName: 'Field Pro',
    productSlug: 'full-face-masks',
    inventory: {
      name: 'Goggles & Masks',
      subCategory: 'Full Face Masks',
    },
    description: 'Tournament preparation with protective gear',
    breadcrumb: ['Goggles & Masks', 'Full Face Masks'],
  },
  
  'iconic': {
    categoryName: 'Iconic',
    productSlug: 'red-dot-sights',
    inventory: {
      name: 'Optics',
      subCategory: 'Red Dot Sights',
    },
    description: 'Pro tournament optics with red dot sights',
    breadcrumb: ['Optics', 'Red Dot Sights'],
  },
  
  '50-cal': {
    categoryName: '.50 Cal',
    productSlug: 'thermal-lenses',
    inventory: {
      name: 'Goggles & Masks',
      subCategory: 'Thermal Lenses',
    },
    description: 'High velocity paintballs with thermal protection',
    breadcrumb: ['Goggles & Masks', 'Thermal Lenses'],
  },
}

/**
 * Usage Example:
 * 
 * import { categoryProductMapping } from '@/data/categoryProductMapping'
 * 
 * // Get mapping info for a featured category
 * const ecoGradeMapping = categoryProductMapping['eco-grade']
 * console.log(ecoGradeMapping.productSlug) // 'biodegradable'
 * console.log(ecoGradeMapping.breadcrumb) // ['BBS', 'Biodegradable']
 * 
 * // Navigate to products page
 * navigate(`/products/${ecoGradeMapping.productSlug}`)
 */
