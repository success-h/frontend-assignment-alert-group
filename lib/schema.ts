import { z } from 'zod';

const createBusinessSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  estimatedVolume: z.string().min(1, 'Estimated annual volume is required'),
});

export { createBusinessSchema };
