import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Game extends React.Component{
    constructor(props){
        super(props)
        const matrix = [];
        for(let i = 0; i < 20; ++i)
            matrix.push(new Array(12).fill(0));
        this.position = {
                x: 4,
                y: 0,
            };
        this.currentBlock = [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ];
        this.setBlocks = matrix;
        this.last = 0;
        this.counter = 0;
        document.addEventListener('keydown', this.onKeyDown);
    }
    merge = () => {
        const matrix = [];
        for(let i = 0; i < 20; ++i)
            matrix[i] = Array.from(this.setBlocks[i]);
        this.currentBlock.forEach((row, y) => {
            row.forEach((value ,x) => {
                    if(value !== 0)
                        matrix[y+this.position.y][x+this.position.x] = value;
            });
        });
        this.setBlocks = matrix;
    }
    checkCollision = () => {
        for(let y = 0; y < this.currentBlock.length; ++y){
            for(let x = 0; x < this.currentBlock[y].length; ++x){
                if(this.currentBlock[y][x] && (this.setBlocks[y+this.position.y] === undefined 
                    || this.setBlocks[y+this.position.y][x+this.position.x] === undefined 
                    || this.setBlocks[y+this.position.y][x+this.position.x])){
                    return true;
                }
            }
        }
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
        this.context.fillRect(0,0, 240, 400);
        this.drawMatrix(this.currentBlock);
    }
    drawMatrix = (matrix) => {
        matrix.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value !== 0)
                {
                    this.context.fillStyle = 'red';
                    this.context.fillRect(x+this.position.x, y+this.position.y, 1, 1);
                }
            });
        });
    }
    update = (time = 0) => {

        this.counter += time-this.last;
        this.last = time;
        if(this.counter >= 1000){
            this.last = time;
            ++this.position.y;
            if(this.checkCollision())
            {  
                --this.position.y;
                this.merge();
                this.position.y = 0;
            }
            this.counter = 0;

        }
        this.draw();
        window.requestAnimationFrame(this.update);
    }
    onKeyDown = (event) => {
        switch(event.keyCode)
        {
            case 37: 
                --this.position.x;
                break;
            case 39: 
                ++this.position.x;
                break;
            case 40: 
                {
                ++this.position.y;
                this.counter = 0;
                } 
                break;
        }
    };
    render(){
        return (
            <canvas ref="canvas" width="240" height="400"></canvas>
        );
    }

}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
  );
  