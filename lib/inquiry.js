import {products} from '@/data/products';

const knownProducts = new Set(products.map(item => item.name));

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
}

export function validateInquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {error:'Invalid submission.'};
  if (clean(input.website, 256)) return {spam:true};

  const fields = {
    name: clean(input.name, 100),
    company: clean(input.company, 130),
    email: clean(input.email, 180),
    country: clean(input.country, 100),
    product: clean(input.product, 140),
    message: clean(input.message, 2200),
  };

  if (fields.name.length < 2 || fields.name.length > 100) return {error:'Please enter your full name.'};
  if (fields.company.length < 2 || fields.company.length > 130) return {error:'Please enter your company name.'};
  if (fields.email.length > 180 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) return {error:'Please enter a valid business email.'};
  if (fields.country.length < 2 || fields.country.length > 100) return {error:'Please enter your country or market.'};
  if (fields.product && !knownProducts.has(fields.product)) return {error:'Please select a valid product.'};
  if (fields.message.length < 10 || fields.message.length > 2200) return {error:'Please provide 10–2200 characters about your requirements.'};

  return {fields};
}
