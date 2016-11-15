// Native Javascript for Bootstrap 3 | Internal Utility Functions
// by dnp_theme

var addClass = function(el,c) { // where modern browsers fail, use classList
    if (el.classList) { el.classList.add(c); } else { el.className += ' '+c; el.offsetWidth; }
  },
  removeClass = function(el,c) {
    if (el.classList) { el.classList.remove(c); } else { el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,''); }
  },
  isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
  getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
  // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    var f = s.charAt(0);
    for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
      if ( f === '.' ) {// If selector is a class
        if ( document.querySelector(s) !== undefined ) { return el; }
      }
      if ( f === '#' ) { // If selector is an ID
        if ( el.id === s.substr(1) ) { return el; }
      }
    }
    return false;
  },
  // tooltip / popover stuff
  isElementInViewport = function(t) { // check if this.tooltip is in viewport
    var r = t.getBoundingClientRect();
    return (
      r.top >= 0 &&
      r.left >= 0 &&
      r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      r.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
  getScroll = function() { // also Affix and scrollSpy uses it
    return {
      y : window.pageYOffset || document.documentElement.scrollTop,
      x : window.pageXOffset || document.documentElement.scrollLeft
    }
  },
  mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
  tipPositions = /\b(top|bottom|left|top)+/;

var makeDraggable = function(element){
    if(!element)
        element = !element ? document.querySelectorAll(".draggable-box")
                : typeof element == "string" ? document.querySelectorAll(element)
                : typeof element == "object" && element.length == 1 ? [element]
                : typeof element == "object" ? element : [];
    var nb_draggable = element.length;

    function startDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        var parent_box = this.parentElement.parentElement.parentElement,
            child_modal_dialog = parent_box.childNodes[0],
            bbox_modal = child_modal_dialog.getBoundingClientRect(),
            alreadyDragged = child_modal_dialog.getAttribute("dragged");

        if(!alreadyDragged){
            child_modal_dialog.setAttribute("dragged", true);
            child_modal_dialog.style.margin = "0";
            parent_box.style.left = window.innerWidth / 2 - bbox_modal.width / 2 + "px";
            parent_box.style.top = bbox_modal.y + "px";

        var diffX = event.clientX - parent_box.offsetLeft,
            diffY = event.clientY - parent_box.offsetTop;

        } else {
            var diffX = +parent_box.style.left.replace("px", "") - event.clientX + parent_box.offsetLeft;
            var diffY = +parent_box.style.top.replace("px", "") - event.clientY + parent_box.offsetTop;
        }

        function move(event) {
            event.preventDefault();
            event.stopPropagation();
            var left = parseInt(event.clientX - diffX),
                top = parseInt(event.clientY - diffY);

            top = top > window.innerHeight-1
                    ? window.innerHeight - 1 : top < 0
                    ? 0 : top;
            left = left > window.innerWidth - 1
                    ? window.innerWidth - 1 : left < 0
                    ? 0 : left

            parent_box.style.left = left + 'px';
            parent_box.style.top = top + 'px';
        }

        function stopDrag() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stopDrag);
        }
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', move);
        return false;
    }

    for(var i = 0; i < nb_draggable; i++){
        var el = element[i].querySelector(".modal-header") || element[i];
        el.addEventListener("mousedown", startDrag);
    }
}