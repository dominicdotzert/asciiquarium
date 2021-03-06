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
      cols: this.getCols(),
      rows: this.getRows(),
      frameCount: 0,
      mounted: false
    };
    this.initBoard();
  }

  initBoard() {
    var tmp = [];
    for (var i = 0; i < this.state.rows; i++) {
      tmp.push(this.setBlank(this.state.cols));
    }
    if (this.state.mounted) {
      this.setState({
        board: tmp
      });
    } else {
      this.state.board = tmp;
    }
    this.initSeaWeed();
  }

  getCols() {
    return Math.floor(window.innerWidth / 13);
  }

  getRows() {
    return Math.floor(window.innerHeight / 24 - 1);
  }

  initSeaWeed() {
    this.state.rendered.seaWeed = [];
    for (var i = 1; i <= 4; i++) {
      for (var j = 0; j < 2; j++) {
        this.state.rendered.seaWeed.push(SeaWeed.getSeaWeed(this.state.board.length, Math.floor(
          (Math.random() * (this.state.cols / 4)) + ((this.state.cols / 4) * (i - 1)))));
      }
    }
  }

  setBlank(width, row) {
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
        if (arr[y]) {
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
    for (var i = top + 1; i < top + 4; i++) {
      arr[i] = Top.getWave(this.state.cols);
    }

    var parent = this;
    this.state.rendered.seaWeed.forEach(function(seaWeed) {
      if (parent.state.frameCount % seaWeed.redraw === 0) {
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
    return Math.floor(Math.random() * (this.state.rows - 14) + 9);
  }

  addAnimal() {
    if (!this.state.rendered.animals)
      this.state.rendered.animals = [];
    this.state.rendered.animals.push(Fish.getFish(Math.floor(Math.random() * 12), this.getRandomAvailableRow(), this.state.cols, this.state.rows));
  }

  updateArray() {

    if (!this.state.rendered.animals || (this.state.rendered.animals.length < this.state.rows / 10 && Math.random() > 0.7))
      this.addAnimal()

    this.clearRendered();
    this.drawBackground();
    this.drawRendered();
  }

  update() {
    this.setState((prevState) => ({
      frameCount: prevState.frameCount + 1,
      array: this.updateArray(),
    }));
  }

  browserResize() {
    this.setState({
      cols: this.getCols(),
      rows: this.getRows()
    });
    this.initBoard();
  }

  renderArray() {
    var str = "";
    var i = 0
    this.state.board.forEach(function(row) {
      if (i === 0) {
        str += "<span style='background-color: #7ec0ee'>"
      } else if (i === 5) {
        str += "</span><div class='underwater'>"
      }
      row.forEach(function(obj) {
        if (obj.char !== " ")
          str += "<span style='color:" + obj.color + "'>" + obj.char + "</span>";
        else
          str += " ";
      });
      str += "<br />";
      i++;
    });
    str += "</div>"
    return str;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 150);
    window.addEventListener('resize', () => this.browserResize());
    this.setState({
      mounted: true
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('resize', () => this.forceUpdate())
    this.setState({
      mounted: false
    });
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