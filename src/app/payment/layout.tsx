import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment",
    description: "Complete your investment payment securely on PropShare.",
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
