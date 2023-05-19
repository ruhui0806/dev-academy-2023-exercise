import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(
  // Describe the requests to mock.
  ...handlers
);

export default server;
