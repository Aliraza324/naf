import fiftyCalImage from '../assets/images/category-50-cal.svg'
import ecoGradeImage from '../assets/images/category-eco-grade.svg'
import fieldGradeImage from '../assets/images/category-field-grade.svg'
import fieldProImage from '../assets/images/category-field-pro.svg'
import iconicImage from '../assets/images/category-iconic.svg'

export const featuredCategories = [
  {
    id: 'eco-grade',
    name: 'Eco Grade',
    description: 'Recreational play • Durable shell',
    image: ecoGradeImage,
    badge: 'Training',
    productSlug: 'biodegradable',
    specs: [
      { label: 'Quantity', value: '2000 Rnds' },
      { label: 'Caliber', value: '.68 Cal' },
    ],
  },
  {
    id: 'field-grade',
    name: 'Field Grade',
    description: 'Standard play • Bright fill',
    image: fieldGradeImage,
    productSlug: 'non-biodegradable',
    specs: [
      { label: 'Quantity', value: '2000 Rnds' },
      { label: 'Caliber', value: '.68 Cal' },
    ],
  },
  {
    id: 'field-pro',
    name: 'Field Pro',
    description: 'Tournament prep • Metallic shell',
    image: fieldProImage,
    label: 'Best Seller',
    featured: true,
    productSlug: 'full-face-masks',
    specs: [
      { label: 'Quantity', value: '2000 Rnds' },
      { label: 'Fill', value: 'Ultra-Thick Neon' },
    ],
  },
  {
    id: 'iconic',
    name: 'Iconic',
    description: 'Pro tournament • Brittle shell',
    image: iconicImage,
    productSlug: 'red-dot-sights',
    specs: [
      { label: 'Quantity', value: '2000 Rnds' },
      { label: 'Accuracy', value: '99.9%', accent: true },
    ],
  },
  {
    id: '50-cal',
    name: '.50 Cal',
    description: 'Low impact • High velocity',
    image: fiftyCalImage,
    productSlug: 'thermal-lenses',
    specs: [
      { label: 'Quantity', value: '4000 Rnds' },
      { label: 'Caliber', value: '.50 Cal' },
    ],
  },
]
