import type { Metadata } from 'next'
import ShoppingCart from './page';

export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "Shopping Cart",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function ShoppingLayout() {
    return <ShoppingCart />
}