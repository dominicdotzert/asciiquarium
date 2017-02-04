import { Component } from 'react';

class Top extends Component {

  static getSolid(width) {
    var arr = [];
    for(var i=0; i < width; i++){
      arr.push({
        char: "-",
        color: "#000"
      });
    }
    return arr;
  }

  static getWave(width) {
    var arr = [];
    for(var i=0; i < width; i++){
      if(Math.random() > 0.9)
        arr.push({
          char:"~",
          color: "#FFF"
        });
      else
        arr.push({
          char: " ",
          color: ""
          });
    }
    return arr;
  }


  render() {
    return "";
  }
}

export default Top;
