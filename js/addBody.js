let count = 1;

function addLength() {
    if (count == 69) {
        alert('nice');
    } else if (count == 420) {
        location.href = './bacatte.html';
    }
    let bacatteContainer = document.getElementById('bacatte-container');

    head = document.createElement('img');
    head.setAttribute('src', './img/body.png');

    bacatteContainer.insertBefore(head, bacatteContainer.childNodes[2]);

    ++count;
}
