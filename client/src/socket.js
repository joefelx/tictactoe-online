import { io } from "socket.io-client";

const URL = import.meta.env.URL;

export const socket = io(URL);
