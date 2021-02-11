let xco, yco, zco;

AFRAME.registerComponent('map', {
  // retrieve map x, y, z coords at start
  init: function () {
    let el = this.el;
    xco = el.getAttribute('position').x;
    yco = el.getAttribute('position').y;
    zco = el.getAttribute('position').z;
  }
});

// listen for trigger operations
AFRAME.registerComponent('triggerlistener', {
  init: function () {
    // add triggerup (on release) listener
    this.el.addEventListener('triggerup', function (evt) {
      zco += 1;
      document.getElementById('map').setAttribute('position', {x: xco, y: yco, z: zco});
    });
  }
});

// determine which direction user is facing
AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    let camrot = document.querySelector('[camera]').getAttribute('rotation').y % 360;
    let cardinal;

    if (camrot >= 0) {
      if (camrot < 45) cardinal = 'N';
      else if (camrot < 135) cardinal = 'W';
      else if (camrot < 225) cardinal = 'S';
      else if (camrot < 360) cardinal = 'E';
      else cardinal = camrot;
    }
    else {
      if (camrot > -45) cardinal = 'N';
      else if (camrot > -135) cardinal = 'E';
      else if (camrot > -225) cardinal = 'S';
      else if (camrot > -360) cardinal = 'W';
      else cardinal = camrot;
    }
    
    document.getElementById('hud').setAttribute('value', cardinal);
    console.log(camrot);
  }
});
