const mailRouter = require("express").Router();
const mailjet = require("node-mailjet").connect(
  "1d51b5854793df80e6993e2662566f95",
  "86a2c953e31f7d099c55206bfa86bde8"
);

require("dotenv").config();

mailRouter.post("/", async (req, res) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "mahmedexec@gmail.com",
          Name: "Ahmed",
        },
        To: [
          {
            Email: "mahmedexec@gmail.com",
            Name: "Ahmed",
          },
        ],
        Subject: "Greetings from Mailjet.",
        TextPart: "My first Mailjet email",
        HTMLPart:
          "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
      res.json(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
      res.status(err.statusCode);
    });
});

module.exports = mailRouter;
