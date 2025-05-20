// lib/schemas.ts
import { z } from "zod"

// lib/schemas.ts
export const negotiationFormSchema = z.object({
  domain: z.string().min(2),
  experience: z.string().regex(/^\d+-\d+$/, "Use format like '3-5'"), // Changed to string
  education: z.string().min(5),
  expectations: z.string().min(10),
  offerText: z.string().min(50)
})
