import type { IVariant } from "@/interfaces";

export interface VariantsTableProps {
  variants: IVariant[];
  deletingVariantId: number | null;
  isDeleting: boolean;
  onEdit: (variant: IVariant) => void;
  onDelete: (variant: IVariant) => void;
}
