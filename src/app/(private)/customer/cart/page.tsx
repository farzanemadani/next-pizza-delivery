import { validateJwtTokenAndGetUser } from "@/actions/auth/index";
import { CartItemsDisplay } from "@/components/functional/pizzas/customer/cart-items-display";
import PageTitle from "@/components/ui/pageTitle";

async function CartPage() {
  const response: any = await validateJwtTokenAndGetUser();
  if (!response.success) {
    return <div>{response.message}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle title="Your Cart" />
      <CartItemsDisplay />
    </div>
  );
}

export default CartPage;
