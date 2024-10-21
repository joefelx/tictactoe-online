import { io } from "socket.io-client";

console.log(import.meta.env);

const URL = import.meta.env.VITE_URL;

console.log(URL);

export const socket = io(URL);
