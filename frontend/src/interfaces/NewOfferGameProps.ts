interface NewOfferGameProps {
  api_id: string;
  name: string;
  involved_companies: any[];
  summary: string;
  img_url: string;
  onClick: (api_id: string) => void;
  isSelected: boolean;
}

export default NewOfferGameProps;