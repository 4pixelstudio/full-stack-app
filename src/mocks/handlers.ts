import { rest } from "msw";
import { CARDS_STORAGE_KEY_NAME } from "../constants/constants";

export const handlers = [
  rest.get("/cards", (_req, res, ctx) => {
    let storedData = localStorage.getItem(CARDS_STORAGE_KEY_NAME);
    const data = storedData ? JSON.parse(storedData) : [];

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post("/cards", async (req, res, ctx) => {
    // save position for all the items
    const body = await req.json();
    localStorage.setItem(CARDS_STORAGE_KEY_NAME, JSON.stringify(body.cards));
    return res(ctx.status(200));
  }),
];
