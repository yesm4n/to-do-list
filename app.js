"use strict";

let counter = 0;

// Dark & Light mode settings
const bodyClasses = document.body.classList;
const backgroundImage = document.querySelector(".background-image-light");
const toggleIcon = document.querySelector(".icon");
let condition = false;

function setDarkMode() {
  condition = true;
  bodyClasses.remove("lightMode");
  bodyClasses.add("darkMode");
  backgroundImage.classList.remove("background-image-light");
  backgroundImage.classList.add("background-image-dark");
  toggleIcon.setAttribute("src", "images/icon-sun.svg");
  localStorage.setItem("theme", "darkMode");
}

function setLightMode() {
  condition = false;
  bodyClasses.remove("darkMode");
  bodyClasses.add("lightMode");
  backgroundImage.classList.add("background-image-light");
  backgroundImage.classList.remove("background-image-dark");
  toggleIcon.setAttribute("src", "images/icon-moon.svg");
  localStorage.setItem("theme", "lightMode");
}

// Event listener for dark & light mode
toggleIcon.addEventListener("click", () => {
  if (condition === false) {
    setDarkMode();
  } else {
    setLightMode();
  }
});

// Check local storage for theme preference
const theme = localStorage.getItem("theme");
if (theme === "darkMode") {
  setDarkMode();
} else if (theme === "lightMode") {
  setLightMode();
}

// Creating new element for the to-do-list
const input = document.getElementById("input");
const myUl = document.getElementById("myUl");
const textItems = document.querySelector(".text-items");
const textClear = document.querySelector(".text-clear");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value !== "") {
    createNewElement();
  }
});

function createNewElement() {
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  counter++;

  const iconCheck = document.createElement("img");
  iconCheck.classList.add("icon-check");
  iconCheck.src = "images/icon-check.svg";
  listItem.appendChild(iconCheck);

  const listItemText = document.createElement("li");
  listItemText.classList.add("list-text");
  const inputValue = input.value;
  listItemText.textContent = inputValue;
  listItem.appendChild(listItemText);

  const iconCross = document.createElement("img");
  iconCross.classList.add("icon-cross");
  iconCross.src = "images/icon-cross.svg";
  listItem.appendChild(iconCross);

  iconCheck.addEventListener("click", () => {
    if (iconCheck.classList.toggle("active")) {
      listItemText.style.color = "var(--gray4)";
      listItemText.style.textDecoration = "line-through";
      counter--;
      textItemsLeft();
    } else {
      listItemText.style.color = "";
      listItemText.style.textDecoration = "";
      counter++;
      textItemsLeft();
    }
  });

  iconCross.addEventListener("click", () => {
    listItem.style.display = "none";
    if (iconCheck.classList.contains("active")) {
      textItemsLeft();
    } else {
      counter--;
      textItemsLeft();
    }
  });

  const firstListItem = myUl.querySelector(".list-item");
  if (firstListItem) {
    myUl.insertBefore(listItem, firstListItem);
  } else {
    myUl.appendChild(listItem);
  }

  input.value = "";

  // Items counter update
  function textItemsLeft() {
    textItems.textContent = `${counter} items left`;
  }

  textItemsLeft();

  // Clear completed items
  textClear.addEventListener("click", () => {
    if (iconCheck.classList.contains("active")) {
      listItem.style.display = "none";
    }
  });
}
