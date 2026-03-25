import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn how PropShare works, why investors trust us, and read real stories from our community of 2,500+ investors.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
