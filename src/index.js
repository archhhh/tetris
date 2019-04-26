import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Game extends React.Component{

    constructor(props){
        super(props);
        this.width = this.props.width;
        this.height = this.props.height;
    }
    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0, this.width, this.height);
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
  