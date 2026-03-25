import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Properties",
    description:
        "Browse our curated collection of premium investment properties across Bangladesh. Find high-yield real estate opportunities.",
};

export default function PropertiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
