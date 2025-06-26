import React from 'react';
import './Screenshots.css';

const Screenshots = ({ screenshots, title }) => {
    return (
        <div className="screenshots__container">
            <div className="screenshots__list">
                {screenshots.map((screenshot, index) => (
                    <img
                        key={index}
                        src={screenshot}
                        alt={`Скриншот ${index + 1} для ${title}`}
                        className="screenshot__image"
                    />
                ))}
            </div>
        </div>
    );
};

export default Screenshots;
