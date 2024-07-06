document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const shoppingList = document.getElementById("shoppingList");
    const clearListButton = document.getElementById("clearListButton");

    let itemsArray = JSON.parse(localStorage.getItem("shoppingList")) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem("shoppingList", JSON.stringify(itemsArray));
    };

    const renderList = () => {
        shoppingList.innerHTML = "";
        itemsArray.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item.text;
            li.className = item.purchased ? "purchased" : "";
            li.addEventListener("click", () => togglePurchased(index));
            li.addEventListener("dblclick", () => editItem(index));
            shoppingList.appendChild(li);
        });
    };

    const addItem = () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            itemsArray.push({ text: itemText, purchased: false });
            itemInput.value = "";
            saveToLocalStorage();
            renderList();
        }
    };

    const togglePurchased = (index) => {
        itemsArray[index].purchased = !itemsArray[index].purchased;
        saveToLocalStorage();
        renderList();
    };

    const editItem = (index) => {
        const newText = prompt("Edit item:", itemsArray[index].text);
        if (newText !== null) {
            itemsArray[index].text = newText.trim();
            saveToLocalStorage();
            renderList();
        }
    };

    const clearList = () => {
        itemsArray = [];
        saveToLocalStorage();
        renderList();
    };

    addItemButton.addEventListener("click", addItem);
    itemInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });
    clearListButton.addEventListener("click", clearList);

    renderList();
});