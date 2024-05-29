import type { Metadata } from 'next'
import Register from './page';

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign up to GPT Games",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function LoginLayout() {
    return <Register />
}