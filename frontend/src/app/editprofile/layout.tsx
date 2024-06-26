import type { Metadata } from 'next'
import Profile from './page';

export const metadata: Metadata = {
    title: "Profile",
    description: "Check your awesome profile in GPT Games",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function LoginLayout() {
    return <Profile />
}