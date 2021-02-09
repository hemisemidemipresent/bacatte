let count = 1;

function addLength() {
    if (count == 69) {
        alert('nice');
    }
    let bacatteContainer = document.getElementById('bacatte-container');

    head = document.createElement('img');
    head.setAttribute('src', './body.png');

    bacatteContainer.insertBefore(head, bacatteContainer.childNodes[2]);

    ++count;
}
