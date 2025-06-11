const locationInput = document.getElementById("locationInput");
const dropdown = document.querySelector(".dropdownContainer");
const locationItemList = dropdown.querySelectorAll(".item");
const guestFilter = document.querySelector(".guestFilter");
const guestDropdown = document.querySelector(".guestDropdownContainer");
const numberOfGuest = document.querySelector(".numOfGuest");
const decreaseBtn = document.querySelector(".decreaseBtn");
const increaseBtn = document.querySelector(".increaseBtn");
const guestCounter = document.querySelector(".counter");
const signInBtn = document.querySelector(".SignIn");
const checkInDateBtn = document.querySelector(".checkinDate");
const checkinDate = document.querySelector(".displayCheckinDate");
const checkoutDateBtn = document.querySelector(".checkoutDate");
const checkoutDate = document.querySelector(".displayCheckoutDate");
const placeElements = document.querySelectorAll(".places");
const foundHotelContainer = document.querySelector(".foundHotelContainer");
const numOfFoundHotel = document.querySelector(".numOfFoundHotel");
let calendar;
let calendar2;

const hotelDescription = [
  {
    hotelName: "Sapphire Haven",
    reviewScore: 4.9,
    hotelLocation: "Bangkok, Thailand",
    coords: [13.72105484407954, 100.50707025462003],
    provinceCoords: [13.736717, 100.523186],
    price: "$ 100",
    hotelImage: "../public/assets/HotelImg.jpg",
  },
  {
    hotelName: "Riva Vibe Hotel",
    reviewScore: 4.8,
    hotelLocation: "Bangkok, Thailand",
    coords: [13.721652594564768, 100.50922081974763],
    provinceCoords: [13.736717, 100.523186],
    price: "$35.09",
    hotelImage: "../public/assets/RivaVibeHotel.jpg",
  },
  {
    hotelName: "Royal Cliff Grand Hotel",
    reviewScore: 4.5,
    hotelLocation: "Pattaya, Thailand",
    coords: [12.923669811620817, 100.86066268343282],
    provinceCoords: [12.927608, 100.877083],
    price: "$140.77",
    hotelImage: "../public/assets/RoyalCliffGrand.jpg",
  },
];

const InitialhotelDescription = [
  {
    hotelName: "Sapphire Haven",
    reviewScore: 4.9,
    hotelLocation: "Bangkok, Thailand",
    coords: [13.72105484407954, 100.50707025462003],
    provinceCoords: [13.736717, 100.523186],
    price: "$ 100",
    hotelImage: "../public/assets/HotelImg.jpg",
  },
  {
    hotelName: "Riva Vibe Hotel",
    reviewScore: 4.8,
    hotelLocation: "Bangkok, Thailand",
    coords: [13.721652594564768, 100.50922081974763],
    provinceCoords: [13.736717, 100.523186],
    price: "$35.09",
    hotelImage: "../public/assets/RivaVibeHotel.jpg",
  },
];

function handleLocationClick(element) {
  element.addEventListener("click", () => {
    let selectedLocation = element.querySelector(".places").textContent;
    locationInput.value = selectedLocation;
    dropdown.classList.add("hidden");
  });
}

function showDropdown(element) {
  element.classList.remove("hidden");
}

const hideFilterDropdown = function (e) {
  if (e.target !== guestDropdown) {
    guestDropdown.classList.add("hidden");
  }
};

const hideLocationDropdown = function (e) {
  let selectedPlace;
  placeElements.forEach(function (element) {
    if (element === e.target) {
      selectedPlace = element;
    }
  });

  if (e.target === selectedPlace) {
    dropdown.classList.add("hidden");
    showHotel(
      selectedPlace.innerHTML.slice(0, selectedPlace.innerHTML.indexOf(","))
    );
  } else if (e.target !== locationInput) {
    dropdown.classList.add("hidden");
  }
};

const updateGuestCount = function (count) {
  guestCounter.textContent = count;
  numberOfGuest.textContent = count;
};

const handleGuestChange = function (e) {
  let currentCount = Number(guestCounter.textContent);

  if (e.target === increaseBtn) {
    currentCount++;
  } else if (e.target === decreaseBtn) {
    currentCount--;
  }

  if (currentCount < 1) currentCount = 1;
  updateGuestCount(currentCount);
};

document.addEventListener("DOMContentLoaded", () => {
  const { Calendar } = window.VanillaCalendarPro;

  calendar = new Calendar("#calendar", {
    onClickDate(self, event) {
      console.log(self);
      checkinDate.textContent = self.context.selectedDates[0];
    },
    onInit(self) {
      self.show();
      self.hide();
    },
    enableDateToggle: false,
    disableDatesPast: true,
    dateMax: "2025-12-31",
    dateMin: "2025-01-01",
  });

  calendar2 = new Calendar("#checkoutCalendar", {
    onClickDate(self, event) {
      console.log(self);
      checkoutDate.textContent = self.context.selectedDates[0];
    },
    onInit(self) {
      self.show();
      self.hide();
    },
    enableDateToggle: false,
    disableDatesPast: true,
    dateMax: "2025-12-31",
    dateMin: "2025-01-01",
  });
  calendar.init();
  calendar2.init();
});

checkInDateBtn.addEventListener("click", (e) => {
  dropdown.classList.add("hidden");
  guestDropdown.classList.add("hidden");
  e.stopPropagation();
  calendar.show();

  window.addEventListener("click", (e) => {
    const calendarElement = document.querySelector("#calendar");
    if (!calendarElement.contains(e.target) && e.target !== checkInDateBtn) {
      calendar.hide();
    }
  });
});

checkoutDateBtn.addEventListener("click", (e) => {
  dropdown.classList.add("hidden");
  guestDropdown.classList.add("hidden");
  e.stopPropagation();
  calendar2.show();

  window.addEventListener("click", (e) => {
    const checkoutCalendarElement = document.querySelector("#checkoutCalendar");
    if (
      !checkoutCalendarElement.contains(e.target) &&
      e.target !== checkoutDateBtn
    ) {
      calendar2.hide();
    }
  });
});

locationItemList.forEach(handleLocationClick);
locationInput.addEventListener("focus", (e) => {
  showDropdown(dropdown);
  window.addEventListener("click", (e) => {
    hideLocationDropdown(e);
  });
});

guestFilter.addEventListener("click", (e) => {
  e.stopPropagation();
  showDropdown(guestDropdown);
  dropdown.classList.add("hidden");
  window.addEventListener("click", (e) => {
    hideFilterDropdown(e);
  });
});

increaseBtn.addEventListener("click", (e) => {
  handleGuestChange(e);
});

decreaseBtn.addEventListener("click", (e) => {
  handleGuestChange(e);
});

const renderHotelMarker = function (hotel, map) {
  console.log(hotel);
  L.marker(hotel.coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        minWidth: 250,
        autoClose: true,
        closeOnClick: false,
        className: "hotelPopup",
      })
    )
    .setPopupContent(
      `<div class="popupTopSection">
        <img
          src=${hotel.hotelImage}
          alt="hotel image"
          class="popupImage"
        />
        <div class="popupHotelDetail">
          <div class="popupHotelNameAndReview">
            <p class="popupHotelName">${hotel.hotelName}</p>
            <div class="popupReview">
              <span class="popupReviewScore">${hotel.reviewScore}</span>
              <i class="bxr bxs-star"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="popupBottomSection">
        <p class="popupPrice">${hotel.price} <span>| per night</span></p>
        <a class="popupBookHotel" href="#">Book now</a>
      </div>`
    );
};

let map;
// setView( [ Need to be coords of selected location] )
const loadMap = function (filteredHotel) {
  let provinceLatLong = filteredHotel[0].provinceCoords;
  map.flyTo(provinceLatLong, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  // filteredHotel.forEach(function (hotel) {
  //   renderHotelMarker(hotel, map);
  // });
};

const loadInitialData = function () {
  map = L.map("map").setView([13.736717, 100.523186], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // InitialhotelDescription.forEach(function (hotel) {
  //   renderHotelMarker(hotel, map);
  // });

  hotelDescription.forEach(function (hotel) {
    renderHotelMarker(hotel, map);
  });

  map.panTo([13.736717, 100.523186]);

  InitialhotelDescription.forEach(function (hotel) {
    foundHotelContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="foundHotel">
            <img
              src="${hotel.hotelImage}"
              alt="${hotel.hotelName}"
              class="hotelImage"
            />
            <div class="hotelDetailContainer">
              <div class="hotelDetail">
                <div class="hotelNameAndReviewContainer">
                  <p class="hotelName">${hotel.hotelName}</p>
                  <div class="review">
                    <span class="reviewScore">${hotel.reviewScore}</span>
                    <i class="bxr bxs-star"></i>
                  </div>
                </div>

                <div class="locationContainer">
                  <i class="bx bx-location"></i>
                  <p class="location">${hotel.hotelLocation}</p>
                </div>

                <div class="facilitiesContainer">
                  <div class="facility">
                    <i class="bxr bxs-bed-alt"></i>
                    <span>2 Beds</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-bath"></i>
                    <span>1 Bathroom</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-wifi"></i>
                    <span>Free Wifi</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-expand-right"></i>
                    <span>400 sq</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-cup-saucer"></i>
                    <span>Have Breakfast</span>
                  </div>
                </div>

                <div class="priceAndMoreDetailContainer">
                  <p class="price">
                    ${hotel.price} <span class="discount">20% off</span>
                  </p>
                  <div class="bookAndViewDetailContainer">
                    <a class="viewDetail" href="#">View Details</a>
                    <a class="bookHotel" href="#">Book now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    );
  });
  numOfFoundHotel.innerHTML = InitialhotelDescription.length;
};

const showHotel = function (place) {
  console.log(place);
  foundHotelContainer.innerHTML = " ";
  let filteredHotel = hotelDescription.filter(function (hotel) {
    return (
      hotel.hotelLocation.slice(0, hotel.hotelLocation.indexOf(",")) === place
    );
  });
  filteredHotel.forEach(function (hotel) {
    foundHotelContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="foundHotel">
            <img
              src="${hotel.hotelImage}"
              alt="${hotel.hotelName}"
              class="hotelImage"
            />
            <div class="hotelDetailContainer">
              <div class="hotelDetail">
                <div class="hotelNameAndReviewContainer">
                  <p class="hotelName">${hotel.hotelName}</p>
                  <div class="review">
                    <span class="reviewScore">${hotel.reviewScore}</span>
                    <i class="bxr bxs-star"></i>
                  </div>
                </div>

                <div class="locationContainer">
                  <i class="bx bx-location"></i>
                  <p class="location">${hotel.hotelLocation}</p>
                </div>

                <div class="facilitiesContainer">
                  <div class="facility">
                    <i class="bxr bxs-bed-alt"></i>
                    <span>2 Beds</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-bath"></i>
                    <span>1 Bathroom</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-wifi"></i>
                    <span>Free Wifi</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-expand-right"></i>
                    <span>400 sq</span>
                  </div>

                  <div class="facility">
                    <i class="bxr bxs-cup-saucer"></i>
                    <span>Have Breakfast</span>
                  </div>
                </div>

                <div class="priceAndMoreDetailContainer">
                  <p class="price">
                    ${hotel.price} <span class="discount">20% off</span>
                  </p>
                  <div class="bookAndViewDetailContainer">
                    <a class="viewDetail" href="#">View Details</a>
                    <a class="bookHotel" href="#">Book now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    );
  });
  loadMap(filteredHotel);
};

loadInitialData();
