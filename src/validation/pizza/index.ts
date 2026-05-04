import { z } from "zod";

export const pizzaSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Pizza name is required"),
  description: z.string(),
  status: z.string().min(1, "Status is required"),
});

export type PizzaFormValues = z.infer<typeof pizzaSchema>;
