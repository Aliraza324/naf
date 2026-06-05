// This file now re-exports the unified useLogin hook.
// The old /api/dealer/login endpoint has been replaced by /api/auth/login
// which handles both admin and dealer login and redirects based on role.
export { useLogin as useDealerLogin } from "../auth/useLogin";
