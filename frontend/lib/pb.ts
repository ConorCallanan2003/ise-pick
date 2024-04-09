import PocketBase from "pocketbase";
console.log(process.env.NEXT_PUBLIC_PB_URL);
export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
