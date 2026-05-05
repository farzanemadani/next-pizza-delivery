import { validateJwtTokenAndGetUser } from "@/actions/auth/index";
import { readPizzas } from "@/actions/pizzas/read/readPizzas";
import { PizzaCardsList } from "@/components/functional/pizzas/customer/pizza-cards-list";
import PageTitle from "@/components/ui/pageTitle";

async function PizzasPage() {
  const userResponse: any = await validateJwtTokenAndGetUser();
  if (!userResponse.success) {
    return <div>{userResponse.message}</div>;
  }

  const pizzasResponse = await readPizzas();
  const pizzas = pizzasResponse.success ? pizzasResponse.data || [] : [];

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Order Pizza" />
      <PizzaCardsList pizzas={pizzas} />
    </div>
  );
}
export default PizzasPage;
