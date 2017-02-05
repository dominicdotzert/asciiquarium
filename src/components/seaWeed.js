import { Component } from 'react';

class seaWeed extends Component {

  static getSeaWeed(orientation) {
    var orientation1 = ["(", "(", " "];
    var orientation2 = [" ", ")", ")"]

    if orientation {
      x = orientation1;
      y = orientation2;
    }
    else {
      x = orientation2;
      y = orientation1;
    }

    var arr = [];
    for(var h = 1; h <= 10; h++) {
      for(var w = 0; w < 3; w++) {
        if(x % 2)
          arr[i].push(x);
        else
          arr[i].push(y);
      }
    }
    return arr;
}

  render() {
    return "";
  }
}

export default seaWeed;
