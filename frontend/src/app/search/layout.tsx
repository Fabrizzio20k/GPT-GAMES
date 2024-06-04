import type { Metadata } from 'next'
import Search from './page';

export const metadata: Metadata = {
    title: "Find your games",
    description: "Search your favorite games",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function SearchLayout() {
    return <Search />
}