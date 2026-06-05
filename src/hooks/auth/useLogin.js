import { useMutation } from "@tanstack/react-query";
import { post } from "../../api/service";
import toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN } from "../../api/landingRoute";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials) => {
            const payload = {
                ...credentials,
                email: credentials.email ? credentials.email.toLowerCase() : credentials.email,
            };
            const response = await post(AUTH_LOGIN, payload);
            return response;
        },
        onSuccess: (data) => {
            if (data.success) {
                const role = data.role?.toLowerCase();
                const user = data.user;

                // Save token and user info
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(user));

                toast.success(data.message || "Login successful");

                // Redirect based on role
                if (role === "admin" || role === "super_admin" || role === "superadmin") {
                    navigate("/admin");
                } else if (role === "dealer") {
                    navigate("/dashboard");
                } else {
                    // fallback
                    navigate("/");
                }
            } else {
                toast.error(data.message || "Login failed");
            }
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });
};
