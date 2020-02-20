const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/2bad86ec939d10b7b119bf758a7ce773/" +
    latitude +
    "," +
    longtitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach to weather service", undefined);
    } else if (body.error) {
      callback("Unable to load the location", undefined);
    } else {
      const temprature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;
      callback(
        undefined,
        "it is currently " +
          temprature +
          " degrees out.and there is a " +
          precipProbability +
          " chance for rain"
      );
    }
  });
};

module.exports = forecast;
