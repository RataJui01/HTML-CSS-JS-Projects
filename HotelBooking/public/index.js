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
let calendar;
let calendar2;

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
  if (e.target !== locationInput) {
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
