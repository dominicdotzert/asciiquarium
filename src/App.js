import React, { Component } from 'react';
import Top from './components/Top.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [],
      rendered: {}
    };
    for(var i = 0; i < window.innerHeight / 24; i++){
      this.state.array[i] = [];
    }
  }
  setBackground(arr){
    arr[0] = Top.getSolid(window.innerWidth / 14);
    for(var i = 1; i < 4; i ++){
      arr[i] = Top.getWave(window.innerWidth / 14);
    }
    //WAVES
    arr[this.state.array.length - 1] = Top.getSolid(window.innerWidth / 14);

  }
  updateArray(){
    var arr = this.state.array;
    this.setBackground(arr);
  }

  renderArray() {
    this.updateArray();
    var str = "";
    console.log(this.state.array);
    this.state.array.forEach(function(row){
      row.forEach(function(char){
        str += char;
      });
      str += "<br />";
    });
    return str;
  }

  render() {
    return (
      <div className="App" dangerouslySetInnerHTML={{ __html: this.renderArray() }} />
    );
  }
}

export default App;
