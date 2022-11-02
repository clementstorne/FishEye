const select = document.querySelector("select");
const selectLabel = document.getElementById("sort-label");

const mediaWrapper = document.querySelector(".photographer-medias");
const sortSelectWrapper = document.createElement("button");
sortSelectWrapper.setAttribute("aria-haspopup", "listbox");
sortSelectWrapper.setAttribute("aria-expanded", "false");
sortSelectWrapper.classList.add("sort-select-wrapper");
mediaWrapper.insertBefore(sortSelectWrapper, selectLabel);

const sortSelect = document.createElement("div");
sortSelect.classList.add("sort-select");
sortSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
sortSelectWrapper.appendChild(sortSelect);

const toggleButton = document.createElement("div");
toggleButton.classList.add("sort-list-toggle-button-expand");
sortSelectWrapper.appendChild(toggleButton);

const newMenu = document.createElement("div");
newMenu.setAttribute("role", "listbox");
newMenu.classList.add("sort-select-list", "hidden");
sortSelectWrapper.appendChild(newMenu);

for (let option of select.options) {
  const newOption = document.createElement("div");
  newOption.setAttribute("role", "option");
  newOption.innerHTML = option.innerHTML;
  newOption.classList.add("sort-select-item", "hidden");
  newMenu.appendChild(newOption);
  newOption.addEventListener("click", function () {
    for (let option of select.options) {
      if (option.innerHTML === this.innerHTML) {
        select.selectedIndex = option.index;
        sortSelect.innerHTML = this.innerHTML;
      }
    }
  });
}

function toggleAriaExpandedAttribute() {
  let isMenuExpanded = sortSelectWrapper.getAttribute("aria-expanded");
  if (isMenuExpanded == "true") {
    sortSelectWrapper.setAttribute("aria-expanded", "false");
  } else if (isMenuExpanded == "false") {
    sortSelectWrapper.setAttribute("aria-expanded", "true");
  }
}

function toggleSelectOptions() {
  toggleAriaExpandedAttribute();
  newMenu.classList.toggle("hidden");
  const selectOptions = document.querySelectorAll(".sort-select-item");
  selectOptions.forEach((option) => {
    option.classList.toggle("hidden");
  });
}

sortSelectWrapper.addEventListener("click", toggleSelectOptions);
