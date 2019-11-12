import React from 'react';
import no_image from './no_image.png';
import './Card.css';

class Card extends React.Component {
    //  Send article link to server where it content will be freed from clutter by Mercury Web Parser
    onElementClick = () => {
        fetch('https://still-atoll-11844.herokuapp.com/mercury', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: this.props.link,
            })
        })
            .then(response => response.json())
            .then(response => {
                this.props.getClickedArticle(response)
                console.log(response);

            })
    }

    //  If image loading from url fails then use no_image.png
    changeImgSrc = e => {
        e.target.src = no_image
    }

    render() {
        const { title, description, image } = this.props;
        return (
            <div className='card col-m-12 col-t-5 col-d-3 col-w-2'>
                <div className='imgContainer'>
                    <img
                        src={(image !== 'null') ? image : no_image}
                        onError={this.changeImgSrc}
                        alt='article'
                        onClick={this.onElementClick}
                        className='cardImg' />
                </div>
                <div className='textContainer'>
                    <h4 className='cardh4' onClick={this.onElementClick}>{title}</h4>
                    <p className='cardP' onClick={this.onElementClick}>{description}</p>
                </div>
            </div>
        )
    }
}

export default Card;