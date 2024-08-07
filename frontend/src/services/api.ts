import axios from 'axios';
import { User } from "@/types/user";
import OfferBySeller from '@/interfaces/OfferBySeller';
const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;


/* Función que consume el endpoint "/offers/" para obtener todas las ofertas
* @param name: nombre de la oferta
* @param token: token del usuario
* @returns: lista de ofertas
*/
export const searchOfferByName = async (name: string, token: string) => {
    let errors = [];
    let dataOffers = [];

    try {
        const response = await axios.get(urlServer + `/offers/?search=${name}`, {
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

/* Función que consume el endpoint "/offers/{id}/" para obtener una oferta por id
* @param id: id de la oferta
* @param token: token del usuario
* @returns: oferta
*/
export const getOfferById = async (id: number, token: string) => {
    let errors = [];
    let dataOffer = {} as OfferBySeller;

    try {
        const response = await axios.get(urlServer + "/offers/" + id + "/", {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        dataOffer = response.data;
    } catch (error: any) {
        errors = (error as any).response.data;
    }

    return { errors, dataOffer };
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
    let dataResponse: any = {};

    try {
        const response = await axios.post(urlServer + "/register/", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dataResponse = response.data;

        // Despues de generar un usuario, crear una instancia de carrito de compras
        try {
            const responseCart = await axios.post(urlServer + "/shoppingcars/", {}, {
                headers: {
                    'Authorization': `Token ${dataResponse.token}`,
                    'Content-Type': 'application/json',
                },
            });
        }
        catch (error) {
            console.log(error);
        }

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
    let profile_pic = '';
    let shoppingItems = [] as OfferBySeller[];

    try {
        const response = await axios.post(urlServer + "/login/", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        profile_pic = response.data.user.profile_picture || '/assets/img/default-user-profile.jpeg';

        const elementsRetrieved: any[] = response.data.user.shopping_car.offers;

        for (let i in elementsRetrieved) {
            shoppingItems.push({
                id: elementsRetrieved[i].id,
                seller: elementsRetrieved[i].seller,
                game: elementsRetrieved[i].game,
                price: elementsRetrieved[i].price,
                discount: elementsRetrieved[i].discount,
                published_date: elementsRetrieved[i].published_date,
                description: elementsRetrieved[i].description,
                link: elementsRetrieved[i].link,
            });
        }

        dataUser = {
            id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
            profile_photo: profile_pic,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            phone: response.data.user.phone,
            description: response.data.user.description,
            token: response.data.token,
            offers: response.data.user.offers,
            shoppingCartID: response.data.user.shopping_car.id,
            shoppingCartElements: shoppingItems,
        } as User;

        console.log(dataUser)

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
    let dataOffers = [] as OfferBySeller[];
    let profile_pic = '';

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

        profile_pic = response.data.profile_picture || '/assets/img/default-user-profile.jpeg';

        for (let i in response.data.user.offers) {
            dataOffers.push({
                id: response.data.user.offers[i].id,
                seller: response.data.user.offers[i].seller,
                game: response.data.user.offers[i].game,
                price: response.data.user.offers[i].price,
                discount: response.data.user.offers[i].discount,
                published_date: response.data.user.offers[i].published_date,
                description: response.data.user.offers[i].description,
                link: response.data.user.offers[i].link,
            });
        }

        dataUser = {
            id: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
            profile_photo: profile_pic,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            phone: response.data.user.phone,
            description: response.data.user.description,
            token: user.token,
            offers: dataOffers,
            shoppingCartID: user.shoppingCartID,
            shoppingCartElements: user.shoppingCartElements,
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
    let profile_pic = '';

    try {
        const response = await axios.get(urlServer + "/find-user/" + id + "/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        });

        profile_pic = response.data.profile_picture || '/assets/img/default-user-profile.jpeg';

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

        dataUser = {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            profile_photo: profile_pic,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone: response.data.phone,
            description: response.data.description,
            token: token,
            offers: dataOffers,
            shoppingCartID: "",
            shoppingCartElements: []
        };
    }


    catch (error) {
        errors = (error as any).response.data;
    }

    return { errors, dataUser };

}

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

export const handlePayment = async (token: string) => {

    const body = { user_token: token }

    const response = await axios.post(urlServer + "/payments/create-checkout-session/", body, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    });

    const { checkout_url } = response.data;
    window.location.href = checkout_url;
}

export const addCommentOffer = async (offer: string, comment: string, token: string) => {
    let errors = [];
    let dataResponse = {};

    let body = { text: comment }

    try {
        const response = await axios.post(offer + "add-review/", body, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            }
        })
        dataResponse = response.data;
    } catch (error: any) {
        errors = (error as any).response.data;
    }

    return { errors, dataResponse };
}

export const updateProfileImage = async (profile_picture: File[], token: string) => {
    let errors = [];
    let dataResponse = {};

    const formData = new FormData();
    formData.append('profile_picture', profile_picture[0]);

    try {
        const response = await axios.post(urlServer + "/profile-image/", formData, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        });
        dataResponse = response.data;
    } catch (error: any) {
        errors = (error as any).response.data;
    }

    return { errors, dataResponse };
}

export const addToCartFun = async (shoppingcarID: string, offerID: string, token: string) => {
    let errors = [];
    let dataResponse = {};

    try {
        const { data } = await axios.post(urlServer + "/shoppingcars/" + shoppingcarID + "/add-offer/" + offerID + "/", {}, {
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        dataResponse = data;
    } catch (error) {
        errors = (error as any).response.data;
    }

    return { errors, dataResponse };
}

export const retrieveCartItems = async (token: string) => {
    let errors = [];
    let shoppingItems = [] as OfferBySeller[];

    try {
        const { data: { user: { shopping_car: { offers } } } } = await axios.get(urlServer + "/profile/", {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });

        for (let i in offers) {
            shoppingItems.push({
                id: offers[i].id,
                seller: offers[i].seller,
                game: offers[i].game,
                price: offers[i].price,
                discount: offers[i].discount,
                published_date: offers[i].published_date,
                description: offers[i].description,
                link: offers[i].link,
            });
        }

    } catch (error) {
        errors = (error as any).response.data;
    }

    return { errors, shoppingItems };
}