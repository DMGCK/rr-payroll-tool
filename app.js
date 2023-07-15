const calendarStartElement = document.getElementById("startDate");
const calendarEndElement = document.getElementById("endDate");
const routesElement = document.getElementById("routeList");
const routesFieldContainerElement = document.getElementById(
  "routesFieldContainer"
);
const totalsContainerElement = document.getElementById("totalsContainer");

// prettier-ignore
const routes = { Boise: 15, Meridian: 10, Nampa: 15, Caldwell: 20, Eagle: 15, Emmett: 25, Fruitland: 50, Homedale: 50, Kuna: 15, Middleton: 25, Marsing: 25, Melba: 25, Midvale: 75, Mountain_Home: 40, New_Plymouth: 40, Ontario: 50, Parma: 50, Payette: 50, Vale: 75, Weiser: 50,};
let activeRoutes = {};
let startDate = null;
let endDate = null;

calendarStartElement.addEventListener("change", setStartDate);
calendarEndElement.addEventListener("change", setEndDate);
routesElement.addEventListener("change", updateActiveRoutes);
routesFieldContainerElement.addEventListener("input", updateTotals);

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

function updateTotals() {
  const valueForDay = {};
  let totalRuns = 0;
  const inputs = document.querySelectorAll(`#routesFieldContainer div input`);
  for (field in inputs) {
    const date = inputs[field].id?.substring(0, 4);
    const route = inputs[field].id?.substring(4, inputs[field].id?.length);
    const runs = parseInt(inputs[field]?.value);
    const routeDayValue = runs * routes[route];

    if (typeof valueForDay[date] != "object") {
      valueForDay[date] = {
        perStop: 0,
        routePay: 0,
        gasDiem: 0,
        total: 0,
      };
    }
    // PER RUN PER DAY
    // TODO evaluate if need if statement
    if (typeof routeDayValue == "number") {
      valueForDay[date].routePay += routeDayValue;
      valueForDay[date].perStop += runs * 6;
    }

    totalRuns += runs ? runs : 0;
  }
  //   document.getElementById("totalStops").innerText = totalRuns;

  let totalsHtml = "";

  for (date in valueForDay) {
    // GAS ALLOWANCE
    if (valueForDay[date].gasDiem != 14 && valueForDay[date].perStop > 1) {
      valueForDay[date].gasDiem = 14;
    }
    valueForDay[date].total =
      valueForDay[date].perStop +
      valueForDay[date].gasDiem +
      valueForDay[date].routePay;

    if (date[0] != "u") {
      totalsHtml += createTotalsField(date, "", valueForDay[date]);
    }
  }
  totalsContainerElement.innerHTML = totalsHtml;
}

function drawFields() {
  totalsContainerElement.innerHTML = "";
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

    // createGridTotalDay();

    for (route in activeRoutes) {
      if (
        activeRoutes[route] === true &&
        document.getElementById(`${route}Container`) == null
      ) {
        routesFieldContainerElement.innerHTML += createRouteField(route);
      }
      if (
        document.getElementById(`${route}Container`) != null &&
        document.getElementById(`${dateInfo[1]}${dateInfo[2]}${route}`) == null
      ) {
        document.getElementById(`${route}Container`).innerHTML +=
          createRouteDayField(dateInfo[1], dateInfo[2], route);
      }
      if (
        document.getElementById(`${dateInfo[1]}${dateInfo[2]}Total`) == null
      ) {
        totalsContainerElement.innerHTML += createTotalsField(
          dateInfo[1],
          dateInfo[2],
          0
        );
      }
    }
    startDateCopy.stepUp();
  }
}

function createRouteCheckBox(route) {
  const visibleString = route.replace("_", " ");
  return `<div class="col-3 ">
  <div class="route-checkbox"> 
  ${visibleString}
      <input class="route-input" 
      type="checkbox" 
      name="${route}" id="${route}" />
    </div></div>`;
}

function createRouteField(route) {
  const template = `
    <div class="row route my-2">
      <div class="col-1">${route}</div>
      <div class="col-11 d-flex" 
      id="${route}Container"></div>
    </div>`;

  return template;
}

function createRouteDayField(month, day, route) {
  const template = `<div class="route-day-field">
  ${month}/${day}
        <input value="0" type="number" 
        name="${route}${month}${day}" 
        id="${month}${day}${route}" />
    </div>`;
  return template;
}

function createTotalsField(month, day, totals) {
  //prettier-ignore
  const template = `<div class="totals-field">
          ${day ? `${month}/${day}` : `${month.substring(0,2)}/${month.substring(2,4)}`} 
          <div id=""> 
            <div onclick="copyToClipBoard(${totals.total})" title="Click to Copy" id="${month}${day}Total">${totals.total ? totals.total : 0}</div>
            <div id="${month}${day}RoutePay">${totals.routePay ? totals.routePay : 0}</div>
            <div id="${month}${day}GasDiem">${totals.gasDiem ? totals.gasDiem : 0}</div>
            <div id="${month}${day}PerStop">${totals.perStop ? totals.perStop : 0}</div>
          </div>
      </div>`;
  return template;
}

function createGridTotalDay() {
  return;
}

function copyToClipBoard(number) {
  navigator.clipboard.writeText(number);
}

function hideInfo() {
  const elements = document.querySelectorAll(".hideable");
  // const isHidden = {};
  // TODO
  try {
    for (elem in elements) {
      elements[elem].hidden = !elements[elem].hidden;
    }
  } catch (error) {
    console.error(error);
  }
}

for (route in routes) {
  activeRoutes[route] = false;
  routesElement.innerHTML = `${routesElement.innerHTML}${createRouteCheckBox(
    route
  )}`;
}

startDate = "2023-07-01";
endDate = "2023-07-14";
for (n in activeRoutes) {
  activeRoutes[n] = true;
}
drawFields();
