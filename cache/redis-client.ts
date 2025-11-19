import { createClient } from "redis";

const client = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  },
});

export default client