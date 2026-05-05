export interface PizzaDetailDialogProps {
  pizza: IPizza | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}