import React from 'react';
import './header.css';
import logoUrl from '../../assets/logo.svg';

const Header = ({ sortOrder, platformFilter, handleSortChange, handlePlatformChange }) => {
    return (
        <header className="header__container">
            <img src={logoUrl} className="logo" alt="logo" />
            <h1 className="main__h2--title">Лучшие игры 2013 года</h1>
            <div className="header__div--filterMenu">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="header__select--filterMenu"
                >
                    <option value="desc">Сортировка: по убыванию рейтинга</option>
                    <option value="asc">Сортировка: по возрастанию рейтинга</option>
                </select>
                <select
                    value={platformFilter}
                    onChange={handlePlatformChange}
                    className="header__select--filterMenu"
                >
                    <option value="all">Все платформы</option>
                    <option value="Windows">PC</option>
                    <option value="PlayStation 3">PS3</option>
                    <option value="Xbox 360">Xbox 360</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
