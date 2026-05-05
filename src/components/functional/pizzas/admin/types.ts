import type { IPizza } from "@/interfaces";

export interface PizzaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pizza?: IPizza | null;
  onSuccess: (pizza: IPizza, mode: "create" | "update") => void;
}

export interface AdminPizzasManagerProps {
  initialPizzas: IPizza[];
}
