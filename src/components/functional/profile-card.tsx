import type { ProfileCardProps } from "@/interfaces";



function ProfileCard({ user }: ProfileCardProps) {
  if (!user) return null;
  const { id, name, email, role } = user;

  return (
    <article className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-md">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold uppercase text-primary-foreground">
          {name?.charAt(0) || email.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-muted px-3 py-2">
          <dt className="font-medium text-muted-foreground">Role</dt>
          <dd className="capitalize">{role}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-lg bg-muted px-3 py-2">
          <dt className="font-medium text-muted-foreground">User ID</dt>
          <dd className="truncate font-mono text-xs">{id}</dd>
        </div>
      </dl>
    </article>
  );
}

export default ProfileCard;
