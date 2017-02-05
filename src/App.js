import React, {
  Component
} from 'react';
import Top from './components/Top.js';
import Fish from './components/Fish.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [],
      rendered: []
    };
    this.initBoard();
  }

  initBoard(){
    for (var i = 0; i < window.innerHeight / 24 - 1; i++) {
      this.state.board.push(this.setBlank(window.innerWidth / 12));
    }
  }

  setBlank(width) {
    var tmp = []
    for (var i = 0; i < width; i++) {
      tmp.push({
        char: " "
      });
    }
    return tmp;
  }

  paste(realAnimal, arr) {
    var animal = JSON.parse(JSON.stringify(realAnimal));
    var col = animal.x;
    var y = animal.y;
    animal.animal.chars.forEach(function(row) {
      row.forEach(function(c) {
        if (c !== 'B')
          arr[y][col] = {
            char: c,
            color: animal.animal.color
          };
          col++;
      });
      y++;
      col = animal.x;
    });
  }

  clear(realAnimal, arr) {
    var animal = JSON.parse(JSON.stringify(realAnimal));
    var col = animal.x;
    var y = animal.y;
    animal.animal.chars.forEach(function(row) {
      row.forEach(function(c) {
        if (c !== 'B')
          arr[y][col] = {
            char: " ",
            color: ""
          };
          col++;
      });
      y++;
      col = animal.x;
    });
  }

  drawBackground() {
    var arr = this.state.board;
    var width = window.innerWidth / 12
    arr[0] = Top.getSolid(width);
    for (var i = 1; i < 4; i++) {
      arr[i] = Top.getWave(width);
    }
    arr[arr.length - 1] = Top.getSolid(width);
  }

  drawRendered() {
    var arr = this.state.board;
    var parent = this;
    if (this.state.rendered.animals) {
      this.state.rendered.animals.forEach(function(animal) {
        parent.clear(animal, arr);
        animal.x -= 5;
        parent.paste(animal, arr);
      });
    }
  }

  addAnimal() {
    if (!this.state.rendered.animals)
      this.state.rendered.animals = [];
    this.state.rendered.animals.push(Fish.getFish(Math.floor(Math.random() * 0), 10, window.innerWidth / 12));
  }

  updateArray() {

    var arr = this.state.board;
    if (!this.state.rendered.animals || (this.state.rendered.animals.length < 1 && Math.random() > 0.7))
      this.addAnimal()
    this.drawBackground();
    this.drawRendered();
    return arr;
  }

  update() {
    this.setState((prevState) => ({
      array: this.updateArray()
    }));
  }

  renderArray() {
    var str = "";
    this.state.board.forEach(function(row) {
      row.forEach(function(obj) {
        str += "<span style='color:" + obj.color + "'>" + obj.char + "</span>";
      });
      str += "<br />";
    });
    return str;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 500);
  }

  render() {
    return ( <
      div className = "App"
      dangerouslySetInnerHTML = {
        {
          __html: this.renderArray()
        }
      }
      />
    );
  }
}

export default App;