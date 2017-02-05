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
    var screenWidth = 100;
    for (var i = 1; i <= 4; i++) {
      for (var j = 0; j < 8; j++) {
        this.state.rendered.seaWeed.push(SeaWeed.getSeaWeed(this.state.board.length, Math.floor(
          Math.random() * ((screenWidth/4)*i - (screenWidth/4)*(i-1)) + ((screenWidth/4)*(i-1)))));
      }
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
    animal.item.chars.forEach(function(row) {
      row.forEach(function(c) {
        if (c !== 'B' && arr[y])
          arr[y][col++] = {
            char: c,
            color: animal.item.color
          };
          else
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
        if(arr[y]){
        arr[y][col++] = {
          char: " ",
          color: ""
        };
      } else
        col++;
      });
      y++;
      col = animal.x;
    });
  }

  drawBackground() {
    var arr = this.state.board;
    var top = 5;
    arr[top] = Top.getSolid(this.state.cols);
    for (var i = top + 1; i < top + 4; i++) {
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
        animal.x += animal.speed;
        if (animal.x < -1 * Fish.getMaxWidth(animal.item.chars) - 1 || animal.x > 1 + parent.state.cols) {
          parent.state.rendered.animals.splice(parent.state.rendered.animals.indexOf(animal), 1);
          parent.clear(animal, arr);
        } else {
          parent.paste(animal, arr);
        }
      });
    }
  }
  
  clearRendered() {
    var arr = this.state.board;
    var parent = this;
    if (this.state.rendered.animals) {
      this.state.rendered.animals.forEach(function(animal) {
        parent.clear(animal, arr);
      });
    }
  }

  getRandomAvailableRow() {
    return Math.floor(Math.random() * (this.state.rows - 12) + 9);
  }

  addAnimal() {
    if (!this.state.rendered.animals)
      this.state.rendered.animals = [];
    this.state.rendered.animals.push(Fish.getFish(Math.floor(Math.random() * 10), this.getRandomAvailableRow(), this.state.cols, this.state.rows));
  }

  updateArray() {

    if (!this.state.rendered.animals || (this.state.rendered.animals.length < 10 && Math.random() > 0.7))
      this.addAnimal()

    this.clearRendered();
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
        if(obj.char !== " ")
          str += "<span style='color:" + obj.color + "'>" + obj.char + "</span>"; 
        else
          str += " ";
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