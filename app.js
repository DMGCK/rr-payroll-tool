const calendarStartElement = document.getElementById("startDate");
const calendarEndElement = document.getElementById("endDate");
const routesElement = document.getElementById("routeList");
const routesFieldContainerElement = document.getElementById(
  "routesFieldContainer"
);

routesFieldContainer;
// prettier-ignore
const routes = { Boise: 15, Meridian: 10, Nampa: 15, Caldwell: 20, Eagle: 15, Emmett: 25, Fruitland: 50, Homedale: 50, Kuna: 15, Middleton: 25, Marsing: 25, Melba: 25, Midvale: 75, Mountain_Home: 40, New_Plymouth: 40, Ontario: 50, Parma: 50, Payette: 50, Vale: 75, Weiser: 50,};
let activeRoutes = {};
let startDate = null;
let endDate = null;

calendarStartElement.addEventListener("change", setStartDate);
calendarEndElement.addEventListener("change", setEndDate);
routesElement.addEventListener("change", updateActiveRoutes);

function setStartDate(event) {
  startDate = event.srcElement.value;
  calendarEndElement.min = startDate;
  drawFields();
}

function setEndDate(event) {
  endDate = event.srcElement.value;
  calendarStartElement.max = event.srcElement.value;
  drawFields();
}

function updateActiveRoutes(event) {
  const isRouteActive = event.target.checked;
  const selectedRoute = event.target.id;
  activeRoutes[selectedRoute] = isRouteActive;
  drawFields();
}

function createRouteCheckBox(route) {
  const visibleString = route.replace("_", " ");
  return `<div class="col-3">
      <input type="checkbox" name="${route}" id="${route}" />
      ${visibleString}
    </div>`;
}

for (route in routes) {
  activeRoutes[route] = false;
  routesElement.innerHTML = `${routesElement.innerHTML}${createRouteCheckBox(
    route
  )}`;
}

function drawFields() {
  routesFieldContainerElement.innerHTML = "";
  if (typeof startDate != "string" || typeof endDate != "string") {
    return;
  }

  let startDateCopy = document.createElement("input");
  startDateCopy.type = "date";
  startDateCopy.value = startDate;

  for (let days = 0; days < 40; days++) {
    if (startDateCopy.value[0] == 1) {
      break;
    }
    if (startDateCopy.value > endDate) {
      break;
    }
    //  y / m / d
    const dateInfo = startDateCopy.value.split("-");

    for (route in activeRoutes) {
      if (
        activeRoutes[route] === true &&
        document.getElementById(`${route}Container`) == null
      ) {
        routesFieldContainerElement.innerHTML += createRouteField(route);
      }
    }

    for (route in activeRoutes) {
      if (
        document.getElementById(`${route}Container`) != null &&
        document.getElementById(`${route}${dateInfo[1]}${dateInfo[2]}Field`) ==
          null
      )
        document.getElementById(`${route}Container`).innerHTML +=
          createRouteDayField(dateInfo[1], dateInfo[2], route);
    }

    startDateCopy.stepUp();
  }
}

function createRouteField(route) {
  console.log("createRouteField");
  const template = `
    <div class="row route">
    <div class="col-1">${route}</div>
    <div class="col-11 d-flex" id="${route}Container">
    
    </div>
    </div>`;

  return template;
}

function createRouteDayField(month, day, route) {
  console.log("createRouteDayField");
  const template = `<div class="mx-1">
        ${month}/${day}
        <input type="number" name="${route}${month}${day}" id="${route}${month}${day}Field" />
    </div>`;
  return template;
}
