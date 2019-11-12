import React from 'react';
import './Popup.css'

class Popup extends React.Component {
    articleContent = () => {
        return { __html: `<h2>${this.props.article.title}</h2>` + this.props.article.content }
    }
    render() {
        return (
            <div>
                <div className='popup' onClick={this.props.closePopup} />
                <div className='popup_inner' dangerouslySetInnerHTML={this.articleContent()} />
            </div>
        );
    }
}

export default Popup;