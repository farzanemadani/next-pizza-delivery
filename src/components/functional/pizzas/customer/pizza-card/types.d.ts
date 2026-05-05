import { IPizza } from "@/interfaces";
export interface PizzaCardProps {
  pizza: IPizza;
  onSelect: (pizza: IPizza) => void;
}
