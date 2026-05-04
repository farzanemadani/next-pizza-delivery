import { Button } from "@/components/ui/button";
import { PizzaVariantsPageProps } from "./types";
import PageTitle from "@/components/ui/pageTitle";
import { readPizzaById } from "@/actions/pizzas";

async function PizzaVariantsPage({ params }: PizzaVariantsPageProps) {
  const { id } = await params;
  const response = await readPizzaById(parseInt(id));

  if (!response.success || !response.data) {
    return (
      <div>
        Error: {response.success ? "Pizza not found" : response.message}
      </div>
    );
  }

  const pizza = response.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title={`Variaants for ${pizza.name}`} />
        <Button>New Variants</Button>
      </div>
    </div>
  );
}

export default PizzaVariantsPage;
