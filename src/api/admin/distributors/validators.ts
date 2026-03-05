import { z } from "@medusajs/framework/zod"

export const PostAdminCreateDistributor = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
})