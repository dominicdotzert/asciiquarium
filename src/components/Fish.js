import {
  Component
} from 'react';

import Asciifish from './Asciifish.js'

class Fish extends Component {

  static getFish(num, height, maxX) {
    var animal;
    switch (num) {
      case 0:
        animal = Asciifish.getWhaleRight();
        break;
    }
    var maxW = this.getMaxWidth(animal.chars);
    return {
      item: animal,
      y: height,
      x: num % 2 === 0 ? maxX + maxW : 0 - maxW,
      dir: num % 2 === 0 ? -1 : 1

    }
  }

  static getMaxWidth(arr) {
    console.log(arr);
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