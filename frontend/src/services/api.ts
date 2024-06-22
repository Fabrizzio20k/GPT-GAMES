import axios from 'axios';

const searchGamesByName = async (name: string) => {
  const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

  try {
    const response = await axios.get(urlServer + `/games/?search=${name}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}