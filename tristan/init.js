let xco, yco, zco;
let cardinal;

window.onload = () => {
  // load level 1 map at start
  fetch('level1.html', { method: 'GET' })
    .then(response => response.text())
    .then(mapdata => {
      console.log(mapdata);
      var str = mapdata;
      document.getElementById('map').innerHTML = str;
    });
};

AFRAME.registerComponent('map', {
  // retrieve map x, y, z coords at start
  init: function () {
    let el = this.el;
    xco = el.getAttribute('position').x;
    yco = el.getAttribute('position').y;
    zco = el.getAttribute('position').z;
  }
});

function advanceOne() {
  // 'move' player by shifting the map
  switch (cardinal) {
    case 'N': zco += 1; break;
    case 'S': zco -= 1; break;
    case 'W': xco += 1; break;
    case 'E': xco -= 1; break;
    default : console.log('error: invalid cardinal point');
  }
  document.getElementById('map').setAttribute('position', {x: xco, y: yco, z: zco});
}

// listen for trigger operations
AFRAME.registerComponent('triggerlistener', {
  init: function () {
    // add triggerup (on release) listener
    this.el.addEventListener('triggerup', e => {
      advanceOne();
    });
  }
});

this.addEventListener('keypress', e => {
  if (e.keyCode == 13) {
    advanceOne();
  }
});

// determine which direction user is facing
AFRAME.registerComponent('rotation-reader', {
  tick: function () {
    let camrot = document.querySelector('[camera]').getAttribute('rotation').y % 360;
    // determine if the player is facing N, S, W, E
    if (camrot >= 0) {
      if (camrot < 45) cardinal = 'N';
      else if (camrot < 135) cardinal = 'W';
      else if (camrot < 225) cardinal = 'S';
      else if (camrot < 360) cardinal = 'E';
      else cardinal = camrot; // fall-through case logs rotation value in degrees
    }
    else {
      if (camrot > -45) cardinal = 'N';
      else if (camrot > -135) cardinal = 'E';
      else if (camrot > -225) cardinal = 'S';
      else if (camrot > -360) cardinal = 'W';
      else cardinal = camrot; // fall-through case logs rotation value in degrees
    }

    document.getElementById('hud').setAttribute('value', cardinal);
    //console.log(camrot);
  }
});