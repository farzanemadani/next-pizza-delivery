import { z } from "zod";

export const variantSchema = z.object({
  type: z.string().min(1, "Variant type is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

export type VariantFormValues = z.infer<typeof variantSchema>;
