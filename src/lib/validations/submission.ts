// src/lib/validations/submission.ts
import { z } from "zod";

export const submissionFormSchema = z.object({
  name: z.string().optional(),
  question: z.string().min(10, { message: "प्रश्न कम्तिमा १० अक्षर लामो हुनुपर्छ।" }),
  category: z.enum(["policy", "economy", "governance", "election_process"], {
    message: "कृपया एउटा मान्य क्षेत्र छान्नुहोस्।"
  }),
});
