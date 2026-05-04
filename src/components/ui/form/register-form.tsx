"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { registerUser } from "@/actions/auth/index"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/validation/register";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values);

      if (!result.success) {
        toast.error(result.message || "Unable to register your account.");
        return;
      }

      toast.success(result.message || "Account created successfully.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating your account.",
      );
    }
  };

  return (
    <section className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Join Pizza Pro and start ordering in minutes.
        </p>
      </div>

      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-primary"
          >
            Name
          </label>
          <Input
            id="name"
            type="text"
            required
            placeholder="Enter your full name"
            className="h-11 text-sm"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>

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
            placeholder="Create a password"
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

        <Button
          type="submit"
          className="h-11 w-full text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Creating account...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </section>
  );
}
