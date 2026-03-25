import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create your PropShare account and start investing in premium real estate.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
