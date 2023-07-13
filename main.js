let todoForm = document.querySelector(".todoForm");
let ifChecked = document.querySelector("#ifChecked");
let items = document.querySelector(".items");

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let input = document.querySelector("#todoInput");
    let text = input.value;
    let newItem = document.createElement("div");
    newItem.classList.add("single-item");
    newItem.innerHTML = `<input type="radio" id="ifChecked">
    <p>${text}</p>`;
    items.appendChild(newItem);
    input.value = "";
});


