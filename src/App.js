import React, {
  Component
} from 'react';
import Top from './components/Top.js';
import Fish from './components/Fish.js';
import SeaWeed from './components/SeaWeed.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: [],
      rendered: [],
      cols: Math.floor(window.innerWidth / 13),
      rows: Math.floor(window.innerHeight / 24 - 1)
    };
    this.initBoard();
  }

  initBoard() {
    for (var i = 0; i < this.state.rows; i++) {
      this.state.board.push(this.setBlank(this.state.cols));
    }
    this.initSeaWeed();
  }

  initSeaWeed() {
    this.state.rendered.seaWeed = [];
    for (var i = 0; i < 4; i++) {
      this.state.rendered.seaWeed.push(SeaWeed.getSeaWeed(this.state.board.length, Math.floor(Math.random() * 100)));
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
    var parent = this;
    animal.item.chars.forEach(function(row) {
      row.forEach(function(c) {
        if (c !== 'B')
          arr[y][col] = {
            char: c,
            color: animal.item.color
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
    animal.item.chars.forEach(function(row) {
      row.forEach(function(c) {
        arr[y][col++] = {
          char: " ",
          color: ""
        };
      });
      y++;
      col = animal.x;
    });
  }

  drawBackground() {
    var arr = this.state.board;
    arr[0] = Top.getSolid(this.state.cols);
    for (var i = 1; i < 4; i++) {
      arr[i] = Top.getWave(this.state.cols);
    }
    arr[arr.length - 1] = Top.getSolid(this.state.cols);

    var parent = this;
    this.state.rendered.seaWeed.forEach(function(seaWeed) {
        if(--seaWeed.redraw < 0) {
          parent.clear(seaWeed, arr);
          seaWeed = SeaWeed.flip(seaWeed);
          parent.paste(seaWeed, arr);
        }
      });
  }

  drawRendered() {
    var arr = this.state.board;
    var parent = this;
    if (this.state.rendered.animals) {
      this.state.rendered.animals.forEach(function(animal) {
        parent.clear(animal, arr);
        animal.x += animal.speed;
        if (animal.x < -1 * Fish.getMaxWidth(animal.item.chars) - 1 || animal.x > 1 + parent.state.cols){
          parent.state.rendered.animals.splice(parent.state.rendered.animals.indexOf(animal), 1);
        }
        parent.paste(animal, arr);
      });
    }
  }

  getRandomAvailableRow(){
    return Math.floor(Math.random() * (this.state.rows - 5) + 4);
  }

  addAnimal() {
    if (!this.state.rendered.animals)
      this.state.rendered.animals = [];
    this.state.rendered.animals.push(Fish.getFish(Math.floor(Math.random() * 2), this.getRandomAvailableRow(), this.state.cols));
  }

  updateArray() {

    var arr = this.state.board;
    if (!this.state.rendered.animals || (this.state.rendered.animals.length < 5 && Math.random() > 0.7))
      this.addAnimal()
    this.drawBackground();
   this.drawRendered();
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