import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

const Cardlist = ({ articles, getClickedArticle }) => {
    return (
        <div className='cardList'>
            {
                articles.map((article, index) => {
                    return (
                        <Card
                            key={index}
                            title={article.title}
                            link={article.link}
                            pubDate={article.pubDate}
                            author={article.author}
                            description={article.description}
                            image={article.image}
                            getClickedArticle={getClickedArticle}
                        />
                    )
                })
            }
        </div>
    );
}

export default Cardlist;