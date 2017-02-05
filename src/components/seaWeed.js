import { Component } from 'react';

class SeaWeed extends Component {

  static getOrientation1() {
    return ["B", ")", ")"];
  }

  static getOrientation2() {
    return ["(", "(", "B"];
  }

  static getArray(orientation) {
    var arr = [];
    if (orientation < 0) {
      for(var h = 1; h <= 6; h++) {
        if(h % 2 === 0)
          arr.push(this.getOrientation2());
        else
          arr.push(this.getOrientation1());
      }
    }
    else {
      for(var h = 1; h <= 6; h++) {
        if(h % 2 === 0)
          arr.push(this.getOrientation1());
        else
          arr.push(this.getOrientation2());
      }
    }
    return arr;
  }    

  static getSeaWeed(bottom_height, x_pos) {
    var arr = [];
    var dirn = -1;
    arr = this.getArray(dirn);
    return {
      item: {
        chars: arr,
        color: "green"
      },
      x: x_pos,
      y: bottom_height - 7,
      redraw: 2,
      orientation : dirn
    };
  }

  static flip(seaWeed) {
    var arr = [];
    var dirn = seaWeed.orientation *= -1;
    arr = this.getArray(dirn);
    return {
      item: {
        chars: arr,
        color: "green"
      },
      x: seaWeed.x,
      y: seaWeed.y,
      redraw: 2,
      orientation: dirn
    };
  }

  render() {
    return "";
  }
}

export default SeaWeed;