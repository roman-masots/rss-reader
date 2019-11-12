import React from 'react';
import ReactDOM from 'react-dom';

//  Only one window could be open at a time

class MyWindowPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        // Create a container <div>
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    //  If you want to inherit css from main App
    copyStyles = (sourceDoc, targetDoc) => {
        Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
            if (styleSheet.cssRules) { // for <style> elements
                const newStyleEl = sourceDoc.createElement('style');

                Array.from(styleSheet.cssRules).forEach(cssRule => {
                    // write the text of each rule into the body of the style element
                    newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
                });

                targetDoc.head.appendChild(newStyleEl);
            } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
                const newLinkEl = sourceDoc.createElement('link');

                newLinkEl.rel = 'stylesheet';
                newLinkEl.href = styleSheet.href;
                targetDoc.head.appendChild(newLinkEl);
            }
        });
    }


    componentDidMount() {
        // Open a new browser window and store a reference to it
        this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

        // Befor closing window in App.js change 'showWindowPortal' and 'clickedArticle' states.
        this.externalWindow.addEventListener("beforeunload", this.props.closeWindow)

        //  Adding parsed by Mercury title and content to new external window
        this.externalWindow.document.body.innerHTML += `<h2>${this.props.article.title}</h2>`;
        this.externalWindow.document.body.innerHTML += this.props.article.content;

        //  If you want to copy main App styles
        this.copyStyles(document, this.externalWindow.document);

        // Append the container <div> (that has props.children appended to it) to the body of the new window
        //this.externalWindow.document.body.appendChild(this.containerEl);

    }

    componentWillUnmount() {
        this.externalWindow.removeEventListener("beforeunload", this.props.closeWindow)
    }

    render() {
        // Append props.children to the container <div> that isn't mounted anywhere yet
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}

export default MyWindowPortal;