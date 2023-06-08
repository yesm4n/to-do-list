'use strict';

// Global data variables
const body = document.querySelector('body');
const background = document.querySelector('.image');
const icon = document.querySelector('[data-icon]');
const input = document.querySelector('[data-input]');
const ul = document.querySelector('[data-ul-list]');

// Theme
let condition = false;
const theme = localStorage.getItem('theme');
if (theme === 'dark-theme') {
  darkTheme();
} else {
  lightTheme();
}

// Dark & Light toggle
icon.addEventListener('click', () => {
  if (condition === false) {
    darkTheme();
  } else {
    lightTheme();
  }
});

// Set light theme
function lightTheme() {
  condition = false;
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');
  background.classList.remove('dark');
  background.classList.add('light');
  icon.setAttribute('src', 'images/icon-moon.svg');
  localStorage.setItem('theme', 'light-theme');
}

// Set dark theme
function darkTheme() {
  condition = true;
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');
  background.classList.remove('light');
  background.classList.add('dark');
  icon.setAttribute('src', 'images/icon-sun.svg');
  localStorage.setItem('theme', 'dark-theme');
}

// Create new elements on Enter key press
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value !== '') {
    createElement();
    updateItems();
  }
});

// Create new list item element
function createElement() {
  if (input.value === '') {
    return;
  } else {
    let div = document.createElement('div');
    div.classList.add('container');
    div.classList.add('list-item');
    div.classList.add('list');

    // Drag and drop functionality
    div.classList.add('draggable');
    div.setAttribute('draggable', true);
    div.addEventListener('dragstart', () => {
      div.classList.add('dragging');
    });
    div.addEventListener('dragend', () => {
      div.classList.remove('dragging');
    });

    ul.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(ul, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        ul.appendChild(draggable);
      } else {
        ul.insertBefore(draggable, afterElement);
      }
      saveData();
    });

    function getDragAfterElement(ul, y) {
      const draggableElements = [
        ...ul.querySelectorAll('.draggable:not(.dragging)'),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
        }
      ).element;
    }

    // Images and text for the list item
    let iconCheck = document.createElement('img');
    iconCheck.classList.add('icon');
    iconCheck.classList.add('icon-check');
    iconCheck.src = 'images/icon-check.svg';
    div.appendChild(iconCheck);

    let li = document.createElement('li');
    li.classList.add('margin-right');
    li.innerHTML = input.value;
    div.appendChild(li);

    let iconCross = document.createElement('img');
    iconCross.classList.add('icon');
    iconCross.classList.add('icon-cross');
    iconCross.src = 'images/icon-cross.svg';
    div.appendChild(iconCross);

    ul.appendChild(div);
  }
  input.value = '';
  saveData();
}

// Toggle class and remove list item on icon click
ul.addEventListener('click', e => {
  if (e.target.classList.contains('icon-cross')) {
    e.target.parentElement.remove();
    updateItems();
    saveData();
  } else if (e.target.classList.contains('icon-check')) {
    e.target.classList.toggle('active');
    const li = e.target.parentElement.querySelector('.margin-right');
    li.classList.toggle('active');
    saveData();
  }
});

// Buttons
const buttonItemsleft = document.querySelector('[data-items-left]');
const buttonAll = document.querySelector('[data-button-all]');
const buttonClear = document.querySelector('[data-button-clear]');

// Update the number of items displayed
function updateItems() {
  let count;
  localStorage.setItem('count', count);
  count = document.querySelectorAll('.list-item').length;
  buttonItemsleft.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

// Update items on page load
window.addEventListener('DOMContentLoaded', () => {
  updateItems();
});

// Toggle all items between active and inactive
buttonAll.addEventListener('click', () => {
  const iconCheck = document.querySelectorAll('.icon-check');
  const li = document.querySelectorAll('.margin-right');
  iconCheck.forEach(icon => {
    icon.classList.toggle('active');
  });
  li.forEach(list => {
    list.classList.toggle('active');
  });
  saveData();
});

// Remove completed items
buttonClear.addEventListener('click', () => {
  const items = document.querySelectorAll('.list-item');
  items.forEach(item => {
    const icon = item.querySelector('.icon-check');
    if (icon.classList.contains('active')) {
      item.remove();
      updateItems();
    }
  });
  updateItems();
  saveData();
});

// Save the list items in local storage
function saveData() {
  localStorage.setItem('element', ul.innerHTML);
}

// Load and display the list items from local storage
function displayData() {
  ul.innerHTML = localStorage.getItem('element');
}

displayData();
