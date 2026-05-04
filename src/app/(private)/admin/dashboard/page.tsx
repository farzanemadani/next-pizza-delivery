"use client";

import { useAuthStore } from '@/stores/auth-store'
import ProfileCard from "@/components/functional/profile-card";

export default function AdminDashboardPage() {
  const { user, loading, error } = useAuthStore();

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <ProfileCard user={user!} />
    </div>
  );
}
