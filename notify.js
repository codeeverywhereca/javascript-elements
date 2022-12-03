var TIME_ON_SCREEN = 5000;

var createElementEx = function (id, className, innerHTML = '') {
    var el = document.createElement('div');
    el.id = id;
    el.className = className;
    el.innerHTML = innerHTML;
    return el;
};

var notify = function (msg) {
    var uid = `notify-${new Date().getTime()}`;
    var exists = document.querySelectorAll('.notify');

    var newEl = createElementEx(uid, 'notify');
    var text = createElementEx('', 'notify-text', msg);
    newEl.appendChild(text);
    document.body.appendChild(newEl);

    newEl.style.bottom = (25 + 65 * (exists.length)) + 'px';

    setTimeout(function () {
        newEl.className += ' notify-active';
    }, 0);

    setTimeout(function () {
        newEl.className = ' notify';
    }, TIME_ON_SCREEN);

    setTimeout(function () {
        newEl.parentNode.removeChild(newEl);
    }, TIME_ON_SCREEN + 500);
};
