// lib/schemas.ts
import { z } from "zod"

export const negotiationFormSchema = z.object({
  domain: z.string().min(2),
  experience: z.number().min(0),
  education: z.string().min(5),
  expectations: z.string().min(10),
  offerText: z.string().min(50)
})
