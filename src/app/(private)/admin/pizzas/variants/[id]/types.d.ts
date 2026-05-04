export interface PizzaVariantsPageProps{
    params:Promise<{id:string}>
}

export interface PizzaVariantsPageContentProps {
  pizza: IPizza;
  initialVariants: IVariant[];
} 