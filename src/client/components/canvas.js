import React, { useState, Component } from 'react';
import './styles.css';
class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skinTone: ''
        }
    }

    componentDidMount() {
        this.getSkinTone()
    }

    getSkinTone() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;
        canvas.width= img.width;
        canvas.height = img.height;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, 200, 100);
            let data = imageData.data;
            let rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
            this.setState({ skinTone: rgb });
            if(rgb)
            this.props.setMelaninMix(rgb);
        }
     
    }
    
    render() {
        const { width, height, imageToShow} = this.props;
        return (
            <>
                <div className="hide-image">
                    {/* Original Image */}
                    <img ref="image" width={width} height={height} src={imageToShow} />
                    {/* Canvas Image */}
                    <canvas ref="canvas" width={width} height={height} />
                </div>
            </>
        );
    }
}

export default Canvas;