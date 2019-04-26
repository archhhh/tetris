import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.width = this.props.width;
        this.height = this.props.height;
        this.state = {
            player: {
                x: 4,
                y: 1,
            },
            matrix: [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ],
        };
        this.last = 0;
    }
    componentDidMount = () => {
        this.canvas = this.refs.canvas;
        this.context= this.canvas.getContext('2d');
        this.context.scale(20,20);
        this.update();
    }
    draw = () => {
        this.context= this.canvas.getContext('2d');
        this.context.fillStyle = '#000';
        this.context.fillRect(0,0, this.width, this.height);
        this.drawMatrix(this.state.matrix);
    }
    drawMatrix = (matrix) => {
        matrix.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value !== 0)
                {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x+this.state.player.x, y+this.state.player.y, 1, 1);
                }
            });
        });
    }
    update = (time = 0) => {
        if(time - this.last >= 1000){
            this.last = time;
            let x = this.state.player.x;
            let y = this.state.player.y;
            this.setState({player: {x: x, y: ++y}});
        }
        this.draw();
        window.requestAnimationFrame(this.update);
    } 
    render(){
        return (
            <canvas ref="canvas" width={this.width} height={this.height}></canvas>
        );
    }

}

ReactDOM.render(
    <Game width="240" height="400"/>,
    document.getElementById('root')
  );
  