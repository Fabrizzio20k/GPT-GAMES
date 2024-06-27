import axios from 'axios';
import { User } from "@/types/user";
import OfferBySeller from '@/interfaces/OfferBySeller';

const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;


/* Función que consume el endpoint "/find-user/" para buscar usuarios por username
* @param username: nombre de usuario
* @param token: token del usuario
* @returns: lista de usuarios
*/

export const searchUserByUsername = async (username: string, token: string) => {
  let errors = [];
  let dataUsers = [];

  try {
    const response = await axios.get(urlServer + `/find-user/?search=${username}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      }
    });
    dataUsers = response.data;
  } catch (error: any) {
    errors = (error as any).response.data;
  }

  return { errors, dataUsers };
}

/* Función que consume el endpoint "/offers/" para obtener todas las ofertas
* @param name: nombre de la oferta
* @param token: token del usuario
* @returns: lista de ofertas
*/
export const searchOfferByName = async (name: string, token: string) => {
  let errors = [];
  let dataOffers = [];

  try {
    const response = await axios.get(urlServer + `/offers/?name=${name}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      }
    });
    dataOffers = response.data;
  } catch (error: any) {
    errors = (error as any).response.data;
  }

  return { errors, dataOffers };
}

/* Función que consume el endpoint "/game_by_name/" para buscar juegos por nombre
* @param name: nombre del juego
* @param token: token del usuario
* @returns lista de juegos
TODO: El endpoint retorna muchos juegos, se pueden paginar?
*/
export const searchGamesByName = async (name: string, token: string) => {
  let errors = [];
  let dataGames = [];

  try {
    const response = await axios.get(urlServer + `/game_by_name/?name=${name}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    dataGames = response.data;
  } catch (error: any) {
    errors = (error as any).response.data;
  }

  return { errors, dataGames };
}

export const getGameById = async (id: number) => {
  let errors = [];
  let dataGame = {};

  try {
    const response = await axios.get(urlServer + "/game/" + id + "/");
    dataGame = response.data;
  } catch (error: any) {
    errors = (error as any).response.data;
  }

  return { errors, dataGame };
}


/* Función que consume el endpoint "/offers/" para crear una oferta
* @param offerInfo: información de la oferta (JSON)
* @param token: token del usuario
* @returns: 201 si la oferta se creó correctamente
TODO: Acomodar el backend para que acepte los nuevos campos de la oferta
*/
export const createOffer = async (offerInfo: any, token: string) => {
  let errors = [];
  let dataResponse = {};

  try {
    const response = await axios.post(urlServer + "/create_game/", offerInfo, {
      headers: {
        'Authorization': `token ${token}`,
      }
    });
    dataResponse = response.data;
  } catch (error: any) {
    errors = (error as any).response.data;
  }

  return { errors, dataResponse };
}

/* Función que consume el endpoint "/register/" para obtener todas las ofertas
* @param token: token del usuario
* @returns: lista de ofertas
*/
export const registerUser = async (data: any) => {

  let errors = [];
  let dataResponse = {};

  try {
    const response = await axios.post(urlServer + "/register/", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dataResponse = response.data;
  } catch (error) {
    errors = (error as any).response.data;
  }

  return { errors, dataResponse };
}

/* Función que consume el endpoint "/login/" para loguear un usuario
* @param data: información del usuario (JSON)
* @returns: usuario logueado
*/
export const loginUser = async (data: any) => {
  let dataUser = {} as User;
  let errors = [];

  try {
    const response = await axios.post(urlServer + "/login/", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dataUser = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.username,
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      phone: response.data.user.phone,
      description: response.data.user.description,
      token: response.data.token,
    } as User;

  } catch (error) {
    errors = (error as any).response.data;
  }

  return { errors, dataUser };
}

/* Función que consume el endpoint "/users/" para actualizar un usuario
* @param data: información del usuario (JSON)
* @param user: usuario a actualizar
* @returns: usuario actualizado
*/
export const updateUser = async (data: any, user: User) => {
  let errors = [];
  let dataUser = {} as User;

  data.username = data.username || user.username;
  data.first_name = data.first_name || user.first_name;
  data.last_name = data.last_name || user.last_name;
  data.description = data.description || user.description;
  data.phone = data.phone || user.phone;

  try {
    const response = await axios.patch(urlServer + "/profile/edit_profile/", data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${user.token}`
      },
    });

    console.log(response.data, "hola");

    dataUser = {
      id: response.data.user.id,
      email: response.data.user.email,
      username: response.data.user.username,
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      phone: response.data.user.phone,
      description: response.data.user.description,
      token: user.token,
    };

  } catch (error) {
    errors = (error as any).response.data;
  }

  return { errors, dataUser };

}

/* Función que consume el endpoint "/users/" para obtener un usuario por id
* @param id: id del usuario
* @param token: token del usuario
* @returns: usuario
*/
export const getUserById = async (id: string, token: string) => {
  let errors = [];
  let dataUser = {} as User;
  let dataOffers = [] as OfferBySeller[];

  try {
    const response = await axios.get(urlServer + "/find-user/" + id + "/", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });

    dataUser = {
      id: response.data.id,
      email: response.data.email,
      username: response.data.username,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      phone: response.data.phone,
      description: response.data.description,
      token: token,
    };

    for (let i in response.data.offers) {
      dataOffers.push({
        id: response.data.offers[i].id,
        seller: response.data.offers[i].seller,
        game: response.data.offers[i].game,
        price: response.data.offers[i].price,
        discount: response.data.offers[i].discount,
        published_date: response.data.offers[i].published_date,
        description: response.data.offers[i].description,
        link: response.data.offers[i].link,
      });
    }
  }
  catch (error) {
    errors = (error as any).response.data;
  }

  return { errors, dataUser, dataOffers };

}
