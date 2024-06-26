import type { Metadata } from 'next'
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Offers",
    description: "Check your awesome profile in GPT Games",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function ViewProfileLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
