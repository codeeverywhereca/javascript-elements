let targets = document.querySelectorAll('*[data-tooltip]');

var createElementEx = function(id, className, innerHTML = '') {
  var el = document.createElement('div');
  el.id = id;
  el.className = className;
  el.innerHTML = innerHTML;
  return el;
};

targets.forEach(function(elem) {
  var uid = '';

  elem.addEventListener('mouseenter', function(event) {
    var elemRect = elem.getBoundingClientRect();
    var top = (elemRect.top),
      left = (elemRect.left) - 4;

    left += Math.floor(elemRect.width / 2) - 4;
    uid = `tooltip-${new Date().getTime()}`;

    var newEl = createElementEx(uid, 'tooltip-outer');
    var text = createElementEx('', 'tooltip-inner', elem.getAttribute('data-tooltip'));
    newEl.appendChild(text);
    document.body.appendChild(newEl);

    var tooltip = document.getElementById(uid);
    var toolRect = tooltip.getBoundingClientRect();
    var tooltipWidth = toolRect.width - 18 - 2;

    if (top > toolRect.height + 25) {
      tooltip.style.top = Math.floor(top - toolRect.height - 8 - 5) + 'px';
      tooltip.style.left = Math.floor(left - Math.floor(toolRect.width / 2) + 8) + 'px';

      var arrow = createElementEx('', 'tooltip-bottom-arrow');
      arrow.style.marginLeft = (tooltipWidth / 2) + 'px';
      tooltip.appendChild(arrow)

    } else {
      tooltip.style.top = Math.floor(elemRect.height + top + 8) + 'px';
      tooltip.style.left = Math.floor(left - Math.floor(toolRect.width / 2) + 8) + 'px';

      var arrow = createElementEx('', 'tooltip-top-arrow', '');
      arrow.style.marginLeft = (tooltipWidth / 2) + 'px';
      tooltip.insertBefore(arrow, tooltip.firstChild);
    }

    if ((left < toolRect.width / 2)) {
      var diff = left - (toolRect.width / 2);
      tooltip.style.left = Math.floor(left - Math.floor(toolRect.width / 2) + 8 - diff) + 'px';
      tooltip.style.marginLeft = ((tooltipWidth / 2) + diff) + 'px';
    }
  });

  elem.addEventListener('mouseleave', function(event) {
    var tooltip = document.getElementById(uid);
    if (tooltip)
      tooltip.parentNode.removeChild(tooltip);
  });
});
