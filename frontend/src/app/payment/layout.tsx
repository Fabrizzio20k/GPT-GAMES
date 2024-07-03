import type { Metadata } from 'next'
import PaymentStatus from './page';

export const metadata: Metadata = {
    title: "Payment Status",
    description: "Payment Status",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function PaymentStatusLayout() {
    return <PaymentStatus />
}