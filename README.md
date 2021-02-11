# lost-in-translation

*International XR Workshop 2021 demo*

In this VR game, two players -- one in a VR headset and one in physical reality -- must communicate effectively to reach the end of a series of maze-like levels. The 'reality-based' player has a map with directions; the VR player relies on her/him to provide directions.

A WebXR game made with A-Frame  
Showcased at [International XR Workshop 2021](https://sites.google.com/view/xrworkshop/home), 9-12 February @
School of Design, University of Auckland, New Zealand

![](screenshot.png)  
*work in progress screenshot*

# useful resources

* A-Frame is a three.js framework that adopts an Entity-Component-System (ECS) architecture:
  * (a well-known game engine implementing ECS is Unity)
  * https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system
  * http://t-machine.org/index.php/2007/11/11/entity-systems-are-the-future-of-mmog-development-part-2/
  * http://gameprogrammingpatterns.com/component.html
  * http://cowboyprogramming.com/2007/01/05/evolve-your-heirachy/

* hosting
  * Servez is handy for https hosting
  * use https for WebXR; use the 'advanced' in your browser to trust the self-signed certificate
  * use `<ctrl> + <alt> + i` to open the A-Frame inspector

* useful A-Frame add-ons:
  * environment: https://github.com/supermedium/aframe-environment-component
  * state: https://npmjs.com/package/aframe-state-component
  * particle systems: https://github.com/IdeaSpaceVR/aframe-particle-system-component
  * physics: https://github.com/donmccurdy/aframe-physics-system
  * multiuser: https://github.com/haydenjameslee/networked-aframe
  * oceans: https://github.com/donmccurdy/aframe-extras/tree/master/src/primitives
  * teleportation: https://github.com/fernandojsg/aframe-teleport-controls
  * super hands: https://github.com/wmurphyrd/aframe-super-hands-component
  * augmented reality: https://github.com/jeromeetienne/AR.js#augmented-reality-for-the-web-in-less-than-10-lines-of-html

* lights:
  * codepen demo: https://codepen.io/dirkk0/pen/rwggLd

## to-do

- [x] create movement engine
- [x] add maps
- [ ] add lamp
- [ ] constrain player to floors
- [ ] add advancing tween

Created by *Blue Dot Studios* -- Andre, Faisal, Hiroshika, Kun, and Tristan
