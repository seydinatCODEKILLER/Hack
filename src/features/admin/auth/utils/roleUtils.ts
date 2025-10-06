import type { NavigateFunction } from "react-router-dom";

export type UserRole = "admin" | "professor";

const DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  professor: "/professor/dashboard",
};

export const redirectToDashboard = (
  role: UserRole,
  navigate: NavigateFunction
) => {
  const path = DASHBOARD_PATHS[role] ?? "/";
  navigate(path, { replace: true });
};
