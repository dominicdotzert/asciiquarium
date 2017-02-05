import { Component } from 'react';

class seaWeed extends Component {

  static getSeaWeed(bottom_height) {

    var orientation1 = ["(", "(", " "];
    var orientation2 = [" ", ")", ")"];


    var arr = [];
    for(var h = 1; h <= 6; h++) {
      if(h % 2 == 0)
        arr.push(orientation1);
      else
        arr.push(orientation2);
    }
    return {
      item: {
        chars: arr,
        color: "green"
      },
      x: 6,
      y: bottom_height - 7
    };
}

  render() {
    return "";
  }
}

export default seaWeed;