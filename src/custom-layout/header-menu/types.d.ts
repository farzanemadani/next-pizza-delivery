import type { UserRole } from "./auth";

export interface HeaderMenuNavProps {
  pathname: string;
  role: UserRole | undefined;
  onLogout: () => void;
  isLoggingOut: boolean;
}
export interface HeaderMenuSheetProps {
  displayName: string | null;
  role: UserRole | undefined;
}