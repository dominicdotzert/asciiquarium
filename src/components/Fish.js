import {
  Component
} from 'react';

import Asciifish from './Asciifish.js'

class Fish extends Component {

  static getFish(num, height, maxX, maxY) {
    var animal;
    var dir;
    switch (num) {
      case 3:
      case 4:
      case 5:
        animal = Asciifish.getWhaleLeft();
        dir = 5;
        break;
      case 6:
        animal = Asciifish.getDucksRight();
        dir = -3;
        height = 5 + Math.floor(Math.random() * 3)
        break;
      case 7:
        animal = Asciifish.getDucksLeft();
        dir = 3;
        height = 5 + Math.floor(Math.random() * 3)
        break;
      case 8:
        animal = Asciifish.getCrab();
        dir = 1;
        height = maxY - 1 - animal.chars.length;
        break;
      case 9:
        animal = Asciifish.getSharkLeft();
        dir = 4;
        break;
      case 0:
      case 1:
      case 2:
      default:
        animal = Asciifish.getWhaleRight();
        dir = -5;
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