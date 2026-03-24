import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Add Auth Token to Headers
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors (like 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth_token");
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    register: (data: any) => api.post("/auth/register", data),
    login: (data: any) => api.post("/auth/login", data),
    getCurrentUser: () => api.get("/auth/me"),
};

export const propertyService = {
    getAll: (params: any) => api.get("/properties", { params }),
    getFeatured: () => api.get("/properties/featured"),
    getById: (id: string) => api.get(`/properties/${id}`),
    create: (data: any) => api.post("/properties", data),
    getMyProperties: () => api.get("/properties/my-properties"),
    update: (id: string, data: any) => api.patch(`/properties/${id}`, data),
    submit: (id: string) => api.post(`/properties/${id}/submit`),
    delete: (id: string) => api.delete(`/properties/${id}`),
    review: (id: string, data: { status: "APPROVED" | "REJECTED"; feedbackNote: string }) =>
        api.patch(`/properties/${id}/review`, data),
    toggleFeatured: (id: string) => api.patch(`/properties/${id}/toggle-featured`),
};

export const investmentService = {
    checkout: (id: string, shares: number) => api.post(`/investments/checkout/${id}`, { shares }),
    getMyInvestments: () => api.get("/investments/my-investments"),
    checkInvestmentStatus: (id: string) => api.get(`/investments/check/${id}`),
};

export const interactionService = {
    getCategories: () => api.get("/categories"),
    vote: (data: { propertyId: string; voteType: "UPVOTE" | "DOWNVOTE" }) => api.post("/votes/vote", data),
    comment: (data: { propertyId: string; content: string; parentId?: string }) => api.post("/comments", data),
    subscribeNewsletter: (email: string) => api.post("/newsletters/subscribe", { email }),
};

export const adminService = {
    getStats: () => api.get("/admin/stats"),
    getUsers: () => api.get("/admin/users"),
    updateUserRole: (id: string, role: string) => api.patch(`/admin/users/${id}/role`, { role }),
    updateUserStatus: (id: string, isActive: boolean) => api.patch(`/admin/users/${id}/status`, { isActive }),
    createCategory: (data: any) => api.post("/admin/categories", data),
    deleteCategory: (id: string) => api.delete(`/admin/categories/${id}`),
};

export default api;
