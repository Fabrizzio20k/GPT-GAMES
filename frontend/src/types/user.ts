import OfferBySeller from "@/interfaces/OfferBySeller";

export type User = {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    description: string;
    token: string;
    offers: OfferBySeller[];
};