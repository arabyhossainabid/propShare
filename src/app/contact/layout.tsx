import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with the PropShare team. Our investment advisors are ready to help you start your real estate journey.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
