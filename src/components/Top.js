import { Component } from 'react';

class Top extends Component {

  static getSolid(width) {
      var arr = [];
      for(var i=0; i < width; i++){
        arr.push("-")
      }
      return arr;
  }


  render() {
    return "";
  }
}

export default Top;
