import React from 'react';
import './Modal.css';

const Modal = ({ game, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{game.title}</h2>
                <p><strong>Дата выхода:</strong> {game.releaseDate}</p>
                <p><strong>Издатель:</strong> {game.publisher}</p>
                <p><strong>Локализации:</strong> {game.localization}</p>
                <p><strong>Ключевые слова:</strong> {game.keywords}</p>
                <p><strong>Тираж продаж:</strong> {game.sales}</p>
                <p><strong>Стоимость:</strong> {game.price}</p>
                <p><strong>Жанр:</strong> {game.genre}</p>
                <p><strong>Платформы:</strong> {game.platforms}</p>
                <p><strong>Рейтинг:</strong> {game.rating}</p>
            </div>
        </div>
    );
};

export default Modal;
