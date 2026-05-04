"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { loginUser } from "@/actions/auth/index"
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  type LoginFormValues,
} from "@/validation/login";
import { setAuthCookies } from "@/actions/auth";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      role: "customer",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await loginUser(values);

      if (!result.success) {
        toast.error(result.message || "Invalid login credentials.");
        return;
      }

      await setAuthCookies(result.token, result.role);
      toast.success(result.message || "Login successful.");
      router.push(
        result.role === "admin" ? "/admin/dashboard" : "/customer/pizzas",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while logging in.",
      );
    }
  };

  return (
    <section className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Login to Pizza Pro and continue your ordering flow.
        </p>
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-primary"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            className="h-11 text-sm"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-primary"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="h-11 text-sm"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-primary"
          >
            Role
          </label>
          <Select
            id="role"
            required
            className="h-11 text-sm"
            aria-invalid={Boolean(errors.role)}
            {...register("role")}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Select>
          {errors.role ? (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="h-11 w-full text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </section>
  );
}
