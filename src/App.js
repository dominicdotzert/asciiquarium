import React, { Component } from 'react';
import Top from './components/Top.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [],
      rendered: {}
    };
  }

  updateArray(){
    this.state.array.push(Top.getSolid(window.innerWidth / 14))
  }

  renderArray() {
    this.updateArray();
    var str = "";
    this.state.array.forEach(function(row){
      str += "<p>";
      row.forEach(function(char){
        str += char;
      });
      str += "</p>";
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
