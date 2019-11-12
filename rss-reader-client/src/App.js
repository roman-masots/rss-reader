import React from 'react';
import CardList from './components/CardList/CardList';
import Popup from './components/Popup/Popup';
import MyWindowPortal from './components/MyWindowPortal/MyWindowPortal';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      showWindowPortal: false,
      clickedArticle: {},
      showPopup: false,
    }
  }

  componentDidMount() {
    fetch('https://still-atoll-11844.herokuapp.com/getdata')
      .then(res => res.json())
      .then(res => {
        res.forEach(obj => {
          for (let key in obj) { this.entityDecode(key, obj[key], obj) } // Loop through object values, decode and if needed update key values.
          this.setState(prevState => ({
            articles: [...prevState.articles, obj]
          }))
        })
      })
  }

  entityDecode = (key, value, obj) => {
    const doc = new DOMParser().parseFromString(value, "text/html");
    const txt = document.createElement("textarea");
    txt.innerHTML = doc.querySelector('body').textContent;

    // Replace in text appeared html tags and other symbols with space and then overwrite changes
    const replacedText = txt.value.replace(/<br>|•|<p>|<\/p>|<b>|<\/b>|<i>|<\/i>|tl;dr|TL;DR/g, '')
    txt.innerHTML = replacedText;

    obj[key] = txt.value;
  }

  getClickedArticle = result => {
    this.setState({ clickedArticle: result })
    this.setState({ showWindowPortal: true });
    this.togglePopup();
  }

  closeWindow = () => {
    this.setState({ showWindowPortal: false });
    this.setState({ clickedArticle: {} })
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className="App">
        <CardList articles={this.state.articles} getClickedArticle={this.getClickedArticle} />

        {/* using Popup Window for article*/}
        {this.state.showPopup ?
          <Popup
            article={this.state.clickedArticle}
            closePopup={this.togglePopup}//.bind(this)}
          />
          : null
        }

        {/* Using New Window for article */}
        {/* <div id='articleNewWindow'>
          {this.state.showWindowPortal && (
            <MyWindowPortal article={this.state.clickedArticle} closeWindow={this.closeWindow} />
          )}
        </div> */}

      </div>
    );
  }
}

export default App;