let todoForm = document.querySelector(".todoForm");
let ifChecked = document.querySelector("#ifChecked");
let items = document.querySelector(".items");
let itemsLeft = document.querySelector(".items-left p");

// Add event listener to the form submit
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.querySelector("#todoInput");
  let text = input.value;
  let newItem = document.createElement("div");
  newItem.classList.add("single-item");
  if (ifChecked.checked==true){
    console.log("True");
    newItem.classList.add("completed");

  }
  newItem.innerHTML = `
        <input type="radio" class="item-radio">
        <p>${text}</p>
        `;
  items.appendChild(newItem);
  input.value = "";
  updateItemsLeft();
  clearFormInput();
});

// Add event listener to the items container
function ifItemChecked(){
    items.addEventListener("click", function (e) {
        if (e.target.classList.contains("item-radio")) {
          let item = e.target.parentElement;
          item.classList.toggle("completed");
          updateItemsLeft();
        }
      });
}
ifItemChecked()

// Function to update the count of items left
function updateItemsLeft() {
  let completedCount = document.querySelectorAll(".single-item.completed").length;
  let remainingItems = document.querySelectorAll(".single-item").length - completedCount;
  completed_items = document.querySelectorAll(".single-item.completed p")
  
  console.log(completed_items);
  itemsLeft.textContent = `${remainingItems} item${remainingItems !== 1 ? "s" : ""} left`;
}

let singleItems = document.querySelectorAll(".single-item");
let singleItemsCount = singleItems.length;
console.log(singleItemsCount);


function clearFormInput(){
  let theForm = todoForm
  theForm.reset();
}