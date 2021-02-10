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
