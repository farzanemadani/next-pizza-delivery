import type { IPizza } from "@/interfaces";
import type { IVariant } from "@/interfaces";

export interface PizzaVariantsPageProps {
  params: Promise<{ id: string }>;
}

export interface VariantsListProps {
  pizza: IPizza;
  initialVariants: IVariant[];
} 