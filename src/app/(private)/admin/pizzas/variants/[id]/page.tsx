
import { PizzaVariantsPageProps } from "./types";
import { readPizzaById } from "@/actions/pizzas";
import VariantsList from "./variants-list";
import { readVariantsByPizzaId } from "@/actions/variants";

async function PizzaVariantsPage({ params }: PizzaVariantsPageProps) {
  const { id } = await params;
  const pizzaId = parseInt(id);

  const pizzaResponse = await readPizzaById(pizzaId);
  if (!pizzaResponse.success || !pizzaResponse.data) {
    return (
      <div>
        Error:{" "}
        {pizzaResponse.success ? "Pizza not found" : pizzaResponse.message}
      </div>
    );
  }

  const variantsResponse = await readVariantsByPizzaId(pizzaId);
  if (!variantsResponse.success) {
    return <div>Error: {variantsResponse.message}</div>;
  }

  return (
    <VariantsList
      pizza={pizzaResponse.data}
      initialVariants={variantsResponse.data}
    />
  );
}

export default PizzaVariantsPage;
