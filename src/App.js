import React, { Component } from 'react';
import Top from './components/Top.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [],
      rendered: {}
    };
    for(var i = 0; i < window.innerHeight / 24 - 1; i++){
      this.state.array[i] = [];
    }
  }
  setBackground(arr){
    var width = window.innerWidth / 10
    arr[0] = Top.getSolid(width);
    for(var i = 1; i < 4; i ++){
      arr[i] = Top.getWave(width);
    }
    arr[this.state.array.length - 1] = Top.getSolid(width);

  }
  updateArray(){
    var arr = this.state.array;
    this.setBackground(arr);
    return arr;
  }

  update(){
    this.setState((prevState) => ({
      array: this.updateArray()
    }));
  }

  renderArray() {
    var str = "";
    this.state.array.forEach(function(row){
      row.forEach(function(obj){
        str += "<span style='color:" + obj.color + "'>" + obj.char + "</span>";
      });
      str += "<br />";
    });
    return str;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 1000);
  }

  render() {
    return (
      <div className="App" dangerouslySetInnerHTML={{ __html: this.renderArray() }} />
    );
  }
}

export default App;
