import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-full bg-background">
      <header className="border-b border-primary bg-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold text-primary-foreground"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary-foreground/12">
              <svg
                viewBox="0 0 64 64"
                className="size-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 14C22 9 42 9 54 14L36 52C34.7 54.8 29.3 54.8 28 52L10 14Z"
                  fill="currentColor"
                  className="text-primary-foreground"
                />
                <path
                  d="M16 18C25.5 15 38.5 15 48 18"
                  stroke="#F6D38E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="27" r="3.2" fill="#FFF4CC" />
                <circle cx="34" cy="23" r="3.2" fill="#FFF4CC" />
                <circle cx="40" cy="33" r="3.2" fill="#FFF4CC" />
                <circle cx="28" cy="38" r="3.2" fill="#B73B1B" />
                <circle cx="20" cy="35" r="2.4" fill="#B73B1B" />
                <circle cx="37" cy="42" r="2.4" fill="#B73B1B" />
              </svg>
            </span>
            <span>Pizza Pro</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/login"
              className="inline-flex h-11 px-5 items-center justify-center rounded-lg bg-primary-foreground font-semibold text-primary hover:bg-secondary"
              >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Fast pizza delivery
          </p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl leading-tight font-bold text-primary sm:text-5xl">
              Pizza Pro brings hot slices to your door with zero fuss.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Fresh dough, bold sauce, melty cheese, and a quick checkout flow
              for lunch breaks, movie nights, and late cravings.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Login to order
            </Link>
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Create account
            </Link>
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="text-2xl font-bold text-primary">20 min</p>
              <p className="mt-1 text-sm text-muted-foreground">
                average delivery time
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="text-2xl font-bold text-primary">12+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                signature pizza options
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="text-2xl font-bold text-primary">4.9/5</p>
              <p className="mt-1 text-sm text-muted-foreground">
                rating from local customers
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-amber-50 via-orange-50 to-background p-6 shadow-lg">
          <div className="absolute -top-12 -right-10 size-36 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-8 size-28 rounded-full bg-orange-200/60 blur-2xl" />

          <div className="space-y-4 rounded-lg bg-background/90 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-primary">Tonight&apos;s pick</p>
            <h2 className="text-3xl leading-tight font-bold text-primary">
              Wood-fired pepperoni with extra cheese
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Crispy edges, rich tomato sauce, mozzarella pull, and a warm box
              headed straight to your sofa.
            </p>
          </div>

          <div className="relative mt-6 flex justify-center">
            <div className="flex size-52 items-center justify-center rounded-full border-8 border-amber-100 bg-[#f5b15d] shadow-lg">
              <div className="relative size-44 rounded-full border-[10px] border-[#d97a2b] bg-[#f6cf69]">
                <span className="absolute top-8 left-10 size-5 rounded-full bg-[#c6401c]" />
                <span className="absolute top-14 right-10 size-5 rounded-full bg-[#c6401c]" />
                <span className="absolute bottom-12 left-14 size-5 rounded-full bg-[#c6401c]" />
                <span className="absolute bottom-10 right-14 size-5 rounded-full bg-[#c6401c]" />
                <span className="absolute top-16 left-20 size-3 rounded-full bg-green-700" />
                <span className="absolute top-24 left-9 size-3 rounded-full bg-green-700" />
                <span className="absolute right-[4.5rem] bottom-[4.5rem] size-3 rounded-full bg-green-700" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-orange-200 bg-white p-4">
              <p className="text-sm text-muted-foreground">Most ordered</p>
              <p className="mt-2 text-lg font-bold text-primary">
                Double Pepperoni
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Loaded with cheese and spicy slices
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-4">
              <p className="text-sm text-muted-foreground">Best combo</p>
              <p className="mt-2 text-lg font-bold text-primary">
                Pizza, drink, garlic dip
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need for a quick dinner
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
