import server from "./app.js";
import { PORT } from "./config.js";

// El servidor que arranca el de Socket.io

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});