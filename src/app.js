const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geoCode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    lang: "Node Js",
    name: "Sumesh"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Sumesh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "lorem ipsumis asd adf adsf sadf",
    title: "help",
    name: "Sumesh"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter the address to proceed"
    });
  }
  const address = req.query.address;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, (error, Forecastdata) => {
      if (error) {
        return res.send({
          error: error
        });
      }
      res.send({
        forecast: Forecastdata,
        address: address,
        location: location
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide the search term"
    });
  }
  res.send({
    products: []
  });
});

app.listen(port, () => {
  console.log("Express Server is running on  port " + port);
});
