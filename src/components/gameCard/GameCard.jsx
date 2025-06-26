import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onCardClick }) => {
    return (
        <aside className="main__section--rouletteGame" onClick={onCardClick}>
            <div className="main__section--name">
                <h2>{game?.title}</h2>
            </div>
            <div className="main__cardGame">
                <img
                    src={game?.logo}
                    alt="logo-game"
                    className="main__img--logoGame"
                />
                <span>
                    <p><strong>Жанр</strong>: {game?.genre}</p>
                    <p><strong>Платформа</strong>: {game?.platforms}</p>
                    <p><strong>Рейтинг</strong>: {game?.rating}</p>
                    <p>{game?.description}</p>
                </span>
            </div>
        </aside>
    );
};

export default GameCard;
