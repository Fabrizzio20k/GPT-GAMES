import axios from 'axios';

const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

/* Función que consume el endpoint "/game_by_name/" para buscar juegos por nombre
* @param name: nombre del juego
* @param token: token del usuario
* @returns lista de juegos
TODO: El endpoint retorna muchos juegos, se pueden paginar?
*/
export const searchGamesByName = async (name: string, token: string) => {
  try {
    const response = await axios.get(urlServer + `/game_by_name/?name=${name}`, {
      headers: {
        'Authorization': `token ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return [];
  }
}

/* Función que consume el endpoint "/offers/" para crear una oferta
* @param offerInfo: información de la oferta (JSON)
* @param token: token del usuario
* @returns: 201 si la oferta se creó correctamente
TODO: Acomodar el backend para que acepte los nuevos campos de la oferta
*/
export const createOffer = async (offerInfo: any, token: string) => {
  try {
    const response = await axios.post(urlServer + "/offers/", offerInfo, {
      headers: {
        'Authorization': `token ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return [];
  }
}

