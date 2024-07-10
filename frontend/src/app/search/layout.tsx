import type { Metadata } from 'next'
import Search from './page';

export const metadata: Metadata = {
    title: "Search Games",
    description: "Search your favorite games and offers",
    icons: {
        icon: "/assets/logo/logo.png",
    }
};

export default function SearchLayout() {
    return <Search />
}