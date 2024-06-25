import type { Metadata } from 'next'
import Dashboard from './page'

export const metadata: Metadata = {
    title: "Dashboard",
    description: "See your offers here!",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function LoginLayout() {
    return <Dashboard />
}