import {
  Component
} from 'react';

import Asciifish from './Asciifish.js'

class Fish extends Component {

  static getFish(num, height, maxX) {
    var animal;
    var dir;
    switch (num) {
      case 0:
        animal = Asciifish.getWhaleRight();
        dir = -5;
        break;
      case 1:
        animal = Asciifish.getWhaleLeft();
        dir = 5;
        break;
    }
    return {
      item: animal,
      y: height,
      x: dir < 0 ? maxX : 0 - this.getMaxWidth(animal.chars),
      speed: dir
    }
  }

  static getMaxWidth(arr) {
    var max = arr[0].length;
    if (arr[0].constructor === Array) {
      arr.forEach(function(a) {
        if (a.length > max) {
          max = a.length;
        }
      });
    }
    return max;
  }

}

export default Fish;