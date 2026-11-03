// 1. Select the elements
// cars container
// build the url
// fetch that url -> get
// parse into js object
// iterate over the cars
// build an HTML card for each car
// insert the card into the cars container
const carsContainer = document.querySelector(".cars-list");
const url = "https://garage.api.lewagon.com/tiger/cars";
const form = document.querySelector(".car-form");

const insertCar = (car) => {
  const card = `
      <div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${car.brand}" />
        </div>
        <div class="car-info">
          <h4>${car.brand} - ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
        </div>
      </div>
    `;
  carsContainer.insertAdjacentHTML("beforeend", card);
};

const fetchCars = async () => {
  const response = await fetch(url);
  const cars = await response.json();
  cars.forEach((car) => {
    insertCar(car);
  });
};
// on page load, get all the cars
fetchCars();

const createCar = async () => {
  // fetch -> POST
  const brandInput = document.querySelector('input[name="brand"]');
  const modelInput = document.querySelector('input[name="model"]');
  const ownerInput = document.querySelector('input[name="owner"]');
  const plateInput = document.querySelector('input[name="plate"]');

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brand: brandInput.value,
      model: modelInput.value,
      owner: ownerInput.value,
      plate: plateInput.value,
    }),
  });
  const car = await response.json();
  insertCar(car);
  form.reset();
};

// 1. Select brand, model, owner, plate, form
// add event to submit of form

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createCar();
});
