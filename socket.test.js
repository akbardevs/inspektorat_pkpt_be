const expect = require("chai").expect;
const ioClient = require("socket.io-client");
const axios = require("axios");

const serverURL = "http://localhost:8055"; // Replace with your server URL

describe("Socket.io API Tests", () => {
  let clientSocket;

  beforeEach((done) => {
    // Connect a new client socket before each test.
    clientSocket = ioClient.connect(serverURL);

    clientSocket.on("connect", () => {
      done();
    });
  });

  afterEach((done) => {
    // Disconnect the client socket after each test.
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
    done();
  });

  it("should receive and send a message through API", async () => {
    const message = "Hello, Socket.io2!";

    // Simulate receiving a message through Socket.io
    clientSocket.emit("message", message);

    // Wait for the message to be sent to the API endpoint
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed

    // Send the received message to the API endpoint
    // const response = await axios.post(`${serverURL}/send-message`, { message });

    // // Assert that the API responded with a success status
    // expect(response.status).to.equal(200);
    // expect(response.data).to.equal("Message sent successfully");
  });
});
