
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
      }
      updateStatus();
    }
  }

  function updateStatus() {
    toggleSelect(gamepads[0].buttons[0], document.getElementsByClassName('b')[0]);
    toggleSelect(gamepads[0].buttons[1], document.getElementsByClassName('a')[0]);
    toggleSelect(gamepads[0].buttons[2], document.getElementsByClassName('y')[0]);
    toggleSelect(gamepads[0].buttons[3], document.getElementsByClassName('x')[0]);

    toggleSelect(gamepads[0].buttons[4], document.getElementsByClassName('left-bumper')[0]);
    toggleSelect(gamepads[0].buttons[5], document.getElementsByClassName('right-bumper')[0]);

    toggleSelect(gamepads[0].buttons[8], document.getElementsByClassName('select')[0]);
    toggleSelect(gamepads[0].buttons[9], document.getElementsByClassName('start')[0]);

    toggleSelect(gamepads[0].buttons[12], document.getElementsByClassName('up')[0]);
    toggleSelect(gamepads[0].buttons[13], document.getElementsByClassName('down')[0]);
    toggleSelect(gamepads[0].buttons[14], document.getElementsByClassName('left')[0]);
    toggleSelect(gamepads[0].buttons[15], document.getElementsByClassName('right')[0]);
  }

  function toggleSelect(button, element) {
    if(button.pressed) {
      if(element.className.indexOf('selected') === -1) {
        element.className += ' selected';
      }
    } else {
      if(element.className.indexOf('selected') !== -1) {
        element.className = element.className.slice(0, -8);
      }
    }
  }

  init();

  return {};
})();
