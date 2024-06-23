import axios from 'axios';
import { User } from "@/types/user";

const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

const searchGamesByName = async (name: string) => {
  try {
    const response = await axios.get(urlServer + `/games/?search=${name}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const registerUser = async (data: any) => {

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

const loginUser = async (data: any) => {
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

export { searchGamesByName, registerUser, loginUser };