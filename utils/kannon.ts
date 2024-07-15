import { KannonCli } from "kannon.js";

const key = process.env.KANNON_KEY || "";
const url = process.env.KANNON_URL || "";
const host = process.env.KANNON_HOST || "";

export const kannonClient = new KannonCli(
  url,
  key,
  {
    email: "info@giuppi.dev",
    alias: "Giuppi",
  },
  {
    host,
  }
);
