import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(
  // Describe the requests to mock.
  ...handlers
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

export default server;
