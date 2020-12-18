const sanityClient = require("@sanity/client");
const Router = require("express").Router();
require("dotenv").config();
const client = sanityClient({
  projectId: "zegc2wrv",
  dataset: "production",
  token: process.env.REACT_APP_CMS_TOKEN,
});

Router.get("/", async (req, res) => {
  const response = await client.fetch(
    '*[_type=="form"]{firstName, lastName, emailAddress, phoneNumber, bookedFor, "consultations":consultations[]->{title, time ,price}}'
  );
  res.json(response);
});
