import type { IPizza } from "@/interfaces";

export interface PizzasTableProps {
  pizzas: IPizza[];
  deletingPizzaId: number | null;
  isDeleting: boolean;
  onEdit: (pizza: IPizza) => void;
  onDelete: (pizza: IPizza) => void;
}
