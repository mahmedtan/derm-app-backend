const sanityClient = require("@sanity/client");
const Router = require("express").Router();
require("dotenv").config();
const client = sanityClient({
  projectId: "zegc2wrv",
  dataset: "production",
});

Router.get("/", async (req, res) => {
  const response = await client.fetch(
    '*[_type=="form"]{firstName, lastName, emailAddress, phoneNumber, bookedFor, "consultations":consultations[]->{title, time ,price}}'
  );
  res.json(response);
});

module.exports = Router;
