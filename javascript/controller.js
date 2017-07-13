
var controllers = (function() {
  var interval;
  var haveEvents = 'ongamepadconnected' in window;
  var gamepads = {};

  function init() {
    window.addEventListener("gamepadconnected", connectHandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);

    if (!haveEvents) {
      interval = setInterval(scangamepads, 16);
    }
  }

  function connectHandler(e) {
    gamepads[e.gamepad.index] = e.gamepad;
  }

  function disconnecthandler() {
    delete gamepads[gamepads.index];
  }

  function scangamepads() {
    var scanedGamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < scanedGamepads.length; i++) {
      if (scanedGamepads[i]) {
        gamepads[scanedGamepads[i].index] = scanedGamepads[i];
        updateStatus();
      }
    }
  }

  function updateStatus() {
    var controller = getCurrentController();

    toggleSelect(gamepads[0].buttons[controller.b], document.getElementsByClassName('b')[0]);
    toggleSelect(gamepads[0].buttons[controller.a], document.getElementsByClassName('a')[0]);
    toggleSelect(gamepads[0].buttons[controller.y], document.getElementsByClassName('y')[0]);
    toggleSelect(gamepads[0].buttons[controller.x], document.getElementsByClassName('x')[0]);

    toggleSelect(gamepads[0].buttons[controller.leftBumper], document.getElementsByClassName('left-bumper')[0]);
    toggleSelect(gamepads[0].buttons[controller.rightBumper], document.getElementsByClassName('right-bumper')[0]);

    toggleSelect(gamepads[0].buttons[controller.select], document.getElementsByClassName('select')[0]);
    toggleSelect(gamepads[0].buttons[controller.start], document.getElementsByClassName('start')[0]);

    if(controller.dpad == 'axes') {
      toggleAxis(gamepads[0].axes[controller.up] , -1, document.getElementsByClassName('up')[0]);
      toggleAxis(gamepads[0].axes[controller.down], 1, document.getElementsByClassName('down')[0]);
      toggleAxis(gamepads[0].axes[controller.left], -1, document.getElementsByClassName('left')[0]);
      toggleAxis(gamepads[0].axes[controller.right], 1, document.getElementsByClassName('right')[0]);
    } else { 
      toggleSelect(gamepads[0].buttons[controller.up], document.getElementsByClassName('up')[0]);
      toggleSelect(gamepads[0].buttons[controller.down], document.getElementsByClassName('down')[0]);
      toggleSelect(gamepads[0].buttons[controller.left], document.getElementsByClassName('left')[0]);
      toggleSelect(gamepads[0].buttons[controller.right], document.getElementsByClassName('right')[0]);
	}
  }

  function toggleSelect(button, element) {
    if(button.pressed != (element.className.indexOf('selected') > -1)) {
    	toggleClass(element, 'selected');
    }
  }

  function toggleAxis(axies, value, element) {
  	if((axies != value) == (element.className.indexOf('selected') > -1)) {
  		toggleClass(element, 'selected');
  	}
  }

  function toggleClass(element, className) {
  	if(element.className.indexOf(className) === -1) {
      element.className += ' ' + className;
    } else if(element.className.indexOf(className) !== -1) {
      element.className = element.className.split(className).join("").trim();
    }
  }

  function getCurrentController() {
    var controller;
    if (gamepads[0].id.indexOf("Xbox One") > -1) {
      controller = xboxOneController;
    } else if (gamepads[0].id.indexOf("SNES") > -1)  {
      controller = snes8bitController;
    } else {
      controller = defaultController;
    }

    return controller;
  }

  init();

  return {};
})();
