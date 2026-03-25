import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories",
    description:
        "Explore property categories - Residential, Commercial, Industrial, Retail, Co-working and Vacation properties.",
};

export default function CategoriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
