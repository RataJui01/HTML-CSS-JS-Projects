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
