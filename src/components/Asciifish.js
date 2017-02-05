import { Component } from 'react';

class Asciifish extends Component {

  /*  __v_
     (____\/{ */
  static getWhaleRight() {
    return {
    	chars: [["B","_","_","v","_"], ["(","_","_","_","_","\\","/","{"]],
    	color: "#FF0000"
    };
  }

  /*    _V__
     }\/____)*/
  static getWhaleLeft() {
    return {
    	chars: [["B","B","B","_","v","_","_"], ["}","\\","/","_","_","_","_",")"]],
    	color: "#FF0000"
    };
  }

  render() {
    return "";
  }
}

export default Asciifish;
