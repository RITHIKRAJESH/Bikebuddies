import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL;
const socket = io(URL, {
  autoConnect: true,
  transports: ['websocket'], 
});

export default socket;
