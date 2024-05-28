import type { Metadata } from 'next'
import Login from './page';

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function LoginLayout() {
    return <Login />
}