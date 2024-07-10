import MainLayoutPage from "@/pages/MainLayoutPage";
import { notFound } from "next/navigation";


type GameProps = {
  params: {
    api_id: string;
  };
}

export default function Game({params} : GameProps){

  if(params.api_id === "not-found"){
    return notFound();
  }

  return (
    <MainLayoutPage>
      <div>
        <h1>Game Details for {params.api_id}</h1>
      </div>
    </MainLayoutPage>
  );
};
