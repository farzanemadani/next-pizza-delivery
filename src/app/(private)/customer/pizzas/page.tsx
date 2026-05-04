import { validateJwtTokenAndGetUser } from "@/actions/auth/index";
import ProfileCard from "@/components/functional/profile-card";

async function PizzasPage() {
  const response:any = await validateJwtTokenAndGetUser();
  if (!response.success) {
    return <div>{response.message}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>pizzas page</h1>
      <ProfileCard user={response.data!} />
    </div>
  );
}
export default PizzasPage;
