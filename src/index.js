import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Game extends React.Component{
    constructor(props){
        super(props);
        this.colors = [
            null,
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF',
        ]
        const matrix = [];
        for(let i = 0; i < 20; ++i)
            matrix.push(new Array(12).fill(0));
        this.position = {
                x: 4,
                y: 0,
            };
        this.currentBlock = [];
        this.setBlocks = matrix;
        this.playerReset();
        this.last = 0;
        this.counter = 0;
        this.lastPressed = [];
        document.addEventListener("keydown", this.onKeyDown);
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
        this.drawMatrix(this.currentBlock, this.position);
        this.drawMatrix(this.setBlocks, {x: 0, y: 0});
    }
    drawMatrix = (matrix, position) => {
        matrix.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if(value !== 0)
                {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x+position.x, y+position.y, 1, 1);
                }
            });
        });
    }
    playerReset = () => {
        let pieces = 'ILJOTSZ';
        this.currentBlock =  this.createPiece(pieces[pieces.length*Math.random() | 0]);
        this.position = {
            y: 0,
            x: (this.setBlocks[0].length / 2 | 0 ) - (this.currentBlock[0].length / 2 | 0)
        };
        if(this.checkCollision()){
            this.setBlocks.forEach((row) => {
                row.fill(0);
            });
        }
    }
    createPiece = (type) => {
        const random = (Math.random()*6+1)|0;
        if(type === 'T'){
            return [
                [random,random,random],
                [0,random,0],
                [0,0,0],
            ];
        }else if(type === 'O'){
            return [
                [random,random],
                [random,random],
            ];    
        }else if(type === 'L'){
            return [
                [0,random,0],
                [0,random,0],
                [0,random,random],
            ];
        }else if(type === 'J'){
            return [
                [0,random,0],
                [0,random,0],
                [random,random,0],
            ];
        }else if(type === 'I'){
            return [
                [0,random,0,0],
                [0,random,0,0],
                [0,random,0,0],
                [0,random,0,0],
            ];
        }else if(type === 'S'){
            return [
                [0,random,random],
                [random,random,0],
                [0,0,0],
            ];
        }else if(type === 'Z'){
            return [
                [random,random,0],
                [0,random,random],
                [0,0,0],
            ];
        }    
    }
    update = (time = 0) => {
        if(this.lastPressed[37] === true)
        {
                --this.position.x;
        }else if(this.lastPressed[39] === true)
        {
                ++this.position.x;
        }else if(this.lastPressed[40] === true){
                ++this.position.y;
                this.counter = 0;
        }
        this.counter += time-this.last;
        this.last = time;
        if(this.checkCollision())
        {  
            if(this.lastPressed[37] === true)
            {
                ++this.position.x;
            }else if(this.lastPressed[39] === true)
            {
                --this.position.x;
            }else {
                --this.position.y;
                this.merge();
                this.playerReset();
                this.counter = 0;
                this.last = time;
            }
        }
        if(this.counter >= 1000){
            this.last = time;
            ++this.position.y;
            this.counter = 0;
        }
        this.draw();
        window.requestAnimationFrame(this.update);
        this.lastPressed = new Array;
    }
    onKeyDown = (event) => {
        this.lastPressed = new Array;
        this.lastPressed[event.keyCode] = true;
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
  