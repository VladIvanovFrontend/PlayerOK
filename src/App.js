import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';
import Header from "./components/header/header";
import GameCard from "./components/gameCard/GameCard";
import Modal from "./components/modal/Modal";
import Screenshots from "./components/screenshots/Screenshots";
import games from "./gamesData";

function App() {
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [backgroundLoaded, setBackgroundLoaded] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const [platformFilter, setPlatformFilter] = useState('all');
    const intervalRef = useRef(null);

    const filteredGames = useMemo(() => {
        let result = [...games];
        if (platformFilter !== 'all') {
            result = result.filter((game) => game.platforms.includes(platformFilter));
        }
        result.sort((a, b) => (sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating));
        return result;
    }, [sortOrder, platformFilter]);

    const manageInterval = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        if (filteredGames.length > 0 && !isModalOpen) {
            intervalRef.current = setInterval(() => {
                setBackgroundLoaded(false);
                setCurrentGameIndex((prevIndex) => (prevIndex + 1) % filteredGames.length);
            }, 10000);
        }
    }, [filteredGames, isModalOpen]);

    const handleDotClick = useCallback(
        (index) => {
            setBackgroundLoaded(false);
            setCurrentGameIndex(index);
            manageInterval();
        },
        [manageInterval]
    );

    const handleCardClick = useCallback(() => {
        setIsModalOpen(true);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setBackgroundLoaded(false);
        setCurrentGameIndex((prevIndex) => (prevIndex + 1) % filteredGames.length);
        manageInterval();
    }, [filteredGames, manageInterval]);

    const handleSortChange = useCallback(
        (e) => {
            setSortOrder(e.target.value);
            setCurrentGameIndex(0);
            manageInterval();
        },
        [manageInterval]
    );

    const handlePlatformChange = useCallback(
        (e) => {
            setPlatformFilter(e.target.value);
            setCurrentGameIndex(0);
            manageInterval();
        },
        [manageInterval]
    );

    useEffect(() => {
        if (filteredGames.length === 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return;
        }

        const img = new Image();
        img.src = filteredGames[currentGameIndex]?.background;
        img.onload = () => setBackgroundLoaded(true);
        img.onerror = () => setBackgroundLoaded(true);

        manageInterval();

        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            img.onload = null;
            img.onerror = null;
        };
    }, [currentGameIndex, isModalOpen, filteredGames, manageInterval]);

    const previousBackground =
        currentGameIndex > 0
            ? filteredGames[currentGameIndex - 1]?.background
            : filteredGames[filteredGames.length - 1]?.background;

    const currentGame = filteredGames[currentGameIndex];

    return (
        <main>
            <div
                className="div__wrapper"
                style={{
                    backgroundImage: backgroundLoaded && currentGame
                        ? `url(${currentGame.background})`
                        : `url(${previousBackground})`,
                }}
            >
                <Header
                    sortOrder={sortOrder}
                    platformFilter={platformFilter}
                    handleSortChange={handleSortChange}
                    handlePlatformChange={handlePlatformChange}
                />
                <section className="main__container">
                    {filteredGames.length > 0 ? (
                        <GameCard game={currentGame} onCardClick={handleCardClick} />
                    ) : (
                        <p>Игры не найдены для выбранной платформы.</p>
                    )}
                </section>
                {isModalOpen && currentGame && (
                    <Modal game={currentGame} onClose={closeModal} />
                )}
                {filteredGames.length > 0 && (
                    <div className="carousel__dots">
                        {filteredGames.map((_, index) => (
                            <span
                                key={index}
                                className={`carousel__dot ${index === currentGameIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>
                )}
                {filteredGames.length > 0 && currentGame && (
                    <Screenshots screenshots={currentGame.screenshots} title={currentGame.title} />
                )}
            </div>
        </main>
    );
}

export default App;
