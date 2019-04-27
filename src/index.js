import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.width = this.props.width;
        this.height = this.props.height;
        const matrix = [];
        for(let i = 0; i < 20; ++i)
            matrix.push(new Array(12).fill(0));
        this.state = {
            position: {
                x: 4,
                y: 1,
            },
            currentBlock: [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ],
            setBlocks: matrix,
        };
        this.last = 0;
        this.counter = 0;
        document.addEventListener('keydown', this.onKeyDown);
    }
    merge = (setBlocks, currentBlock) => {
        currentBlock.forEach((row, y) => {
            row.forEach((value ,x) => {
                    if(value !== 0)
                        setBlocks[y+this.state.position.y][x+this.state.position.x] = value;
            });
        });
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
        this.drawMatrix(this.state.currentBlock);
    }
    drawMatrix = (matrix) => {
        matrix.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value !== 0)
                {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x+this.state.position.x, y+this.state.position.y, 1, 1);
                }
            });
        });
    }
    update = (time = 0) => {
        this.counter += time-this.last;
        this.last = time;
        if(this.counter >= 1000){
            this.last = time;
            let x = this.state.position.x;
            let y = this.state.position.y;
            this.setState({position: {x: x, y: ++y}});
            this.counter = 0;
        }
        this.draw();
        window.requestAnimationFrame(this.update);
    }
    onKeyDown = (event) => {
        let x = this.state.position.x;
        let y = this.state.position.y;
        switch(event.keyCode)
        {
            case 37: 
                this.setState({position: {x: --x, y: y}}); 
                break;
            case 39: 
                this.setState({position: {x: ++x, y: y}}); 
                break;
            case 40: 
                {
                this.setState({position: {x: x, y: ++y}});
                this.counter = 0;
                } 
                break;
        }
    };
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
  