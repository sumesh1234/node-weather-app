const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3VtZXNoMTIzIiwiYSI6ImNpZmkwOHNocmFhM21yN2x4MDhkMm55ZDgifQ.nA62out7asj30K8mRHH-jA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach Mapbox Server", undefined);
    } else if (body.features.length === 0) {
      callback("No Search results found", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;

      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geoCode;
