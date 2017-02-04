import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [[]]
      rendered: {}
    };
  }

  renderArray() {
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
