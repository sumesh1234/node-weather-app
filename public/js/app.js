const WeatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

WeatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  msg1.textContent = "Loading";
  msg2.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        msg2.textContent = data.error;
        console.log(data.error);
      } else {
        msg1.textContent = data.forecast;
        msg2.textContent = data.location;
      }
    });
  });

  console.log("submit");
});
