import { readPizzas } from "@/actions/pizzas";
import AdminPizzasManager from "@/components/pizzas/admin-pizzas-manager";

async function AdminPizzasPage() {
  const result = await readPizzas();
  const pizzas = result.success ? result.data : [];

  return (
    <AdminPizzasManager initialPizzas={pizzas} />
  );
}

export default AdminPizzasPage;
