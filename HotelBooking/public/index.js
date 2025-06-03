const locationInput = document.getElementById("locationInput");
const dropdown = document.querySelector(".dropdownContainer");
const locationItemList = dropdown.querySelectorAll(".item");

locationItemList.forEach(function (element) {
  element.addEventListener("click", () => {
    let selectedLocation = element.querySelector(".places").textContent;
    locationInput.value = selectedLocation;
    dropdown.classList.add("hidden");
  });
});

locationInput.addEventListener("focus", () => {
  dropdown.classList.remove("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target !== locationInput) {
    dropdown.classList.add("hidden");
  }
});
