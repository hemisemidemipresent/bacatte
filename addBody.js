let count = 1;

function addLength() {
    let bacatteContainer = document.getElementById('bacatte-container');

    head = document.createElement('img');
    head.setAttribute('src', './body.png');

    bacatteContainer.insertBefore(head, bacatteContainer.childNodes[2]);

    ++count;
}
