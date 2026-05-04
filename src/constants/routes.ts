export const PROTECTED_PREFIXES = ["/admin", "/customer"] as const;
export const LOGIN_ROUTE = "/login";
export const ROLE_HOME_ROUTES = {
  admin: "/admin/dashboard",
  customer: "/customer/pizzas",
} as const;
