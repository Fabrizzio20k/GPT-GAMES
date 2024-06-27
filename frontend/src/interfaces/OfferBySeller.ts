interface OfferBySeller {
    id: number;
    seller: string;
    game: string;
    price: number;
    discount: number;
    published_date: string;
    description: string;
    link: string;
}

export default OfferBySeller;