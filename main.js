import './style.css'

const DEFAULT_LIST = [
    "Авокадо",
    "Апельсин",
    "Арбуз",
    "Банан",
    "Виноград",
    "Грейпфрут",
    "Яблоко",
];

const listElement = document.querySelector("#list");

function renderList(list) {
    list.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list__item");
        li.setAttribute("draggable", "true");
        li.innerText = item;
        listElement.append(li);
    });
}

renderList(DEFAULT_LIST);

listElement.addEventListener("dragstart", ({target}) => {
    target.classList.add("selected");
});

listElement.addEventListener("dragend", ({target}) => {
    target.classList.remove("selected");
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

listElement.addEventListener("dragover", (evt) => {
    evt.preventDefault();
    // debugger;
    const activeElement = listElement.querySelector(".selected");
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`list__item`);

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    listElement.insertBefore(activeElement, nextElement);
});

