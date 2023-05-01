import { rest } from "msw";
import { CARDS_STORAGE_KEY_NAME } from "../constants/constants";

export const handlers = [
  rest.get("/cards", (_req, res, ctx) => {
    let storedData = localStorage.getItem(CARDS_STORAGE_KEY_NAME);
    const data = storedData ? JSON.parse(storedData) : [];

    return res(ctx.status(200), ctx.json(data));
  }),
];
