import { Component } from 'react';

class Top extends Component {

  static getSolid(width) {
    var arr = [];
    for(var i=0; i < width; i++){
      arr.push("-");
    }
    return arr;
  }

  static getWave(width) {
    var arr = [];
    for(var i=0; i < width; i++){
      if(Math.random() > 0.9)
        arr.push("~");
      else
        arr.push(" ");
    }
    return arr;
  }


  render() {
    return "";
  }
}

export default Top;
