const sanityClient = require("@sanity/client");
const Router = require("express").Router();
require("dotenv").config();
const client = sanityClient({
  projectId: "zegc2wrv",
  dataset: "production",
});

Router.get("/forms", async (req, res) => {
  const response = await client.fetch(
    '*[_type=="form"]{firstName, lastName, emailAddress, phoneNumber, bookedFor,"procedures":procedures[]->{title, time ,price}, "consultations":consultations[]->{title, time ,price}, appointmentId}'
  );
  res.json(
    response.map(
      ({
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        bookedFor,
        appointmentId,
        ...rest
      }) => ({
        "First Name": firstName,
        "Last Name": lastName,
        "Email Address": emailAddress,
        "Booked For": new Date(bookedFor).toLocaleString("en-US"),
        "Phone Number": phoneNumber,
        "Appointment ID": appointmentId,
        ...rest,
      })
    )
  );
});
Router.get("/patients", async (req, res) => {
  const response = await client.fetch(
    '*[_type=="patient"]{fullName, patientId, phoneNumber, emailAddress}'
  );

  res.json(
    response.map(({ fullName, emailAddress, patientId, phoneNumber }) => ({
      "Full Name": fullName,
      "Email Address": emailAddress,
      "Patient ID": patientId,
      "Phone Number": phoneNumber,
    }))
  );
});

module.exports = Router;
