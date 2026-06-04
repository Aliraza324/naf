import { CATEGORY_DATA } from './categories';

// Helper function to convert a string to a slug
const generateSlug = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// Generate the inventoryCategories array from CATEGORY_DATA for the Header navigation
export const inventoryCategories = Object.entries(CATEGORY_DATA).map(([mainCatName, subCats]) => {
  return {
    name: mainCatName,
    slug: generateSlug(mainCatName),
    subCategories: Object.entries(subCats).map(([subCatName, subCat2Items]) => {
      return {
        name: subCatName,
        slug: generateSlug(subCatName),
        subCategories2: subCat2Items.map((item) => ({
          name: item,
          slug: generateSlug(item),
        }))
      };
    })
  };
});
