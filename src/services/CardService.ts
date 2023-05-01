import axios, { AxiosResponse } from "axios";
import CardInterface from "../interfaces/CardInterface";
import { BASE_URL } from "../constants/constants";

class CardService {
  get = async (): Promise<CardInterface[]> => {
    const endpoint = `${BASE_URL}/cards`;

    try {
      const response: AxiosResponse<CardInterface[]> = await axios.get(
        endpoint
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  update = async (cards: CardInterface[]): Promise<boolean> => {
    const endpoint = `${BASE_URL}/cards`;

    try {
      await axios.post(endpoint, {
        cards: cards,
      });
      return true;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };
}

export default CardService;
