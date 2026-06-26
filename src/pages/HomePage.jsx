import { useRef } from "react";
import { Link } from "react-router-dom";
import data from "../data/json/data.json";
import "../css/HomePage.css";

function toTitleCase(value) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function isNewGame(game) {
  const createdAt = new Date(`${game.date}T${game.time}`);
  const elapsed = Date.now() - createdAt.getTime();
  return elapsed >= 0 && elapsed <= 2 * 24 * 60 * 60 * 1000;
}

export default function HomePage() {
  const scrollRefs = useRef({});

  const sections = Object.entries(data)
    .filter(([, value]) => Array.isArray(value) && value.length)
    .map(([key, items]) => {
      const sortedGames = [...items].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA;
      });

      return {
        key,
        title: key === "games" ? "Recently Added" : toTitleCase(key),
        description:
          key === "games"
            ? "The new games, you can buy"
            : `Explore all ${toTitleCase(key)}.`,
        items: sortedGames,
      };
    });

  const scrollSection = (key, direction) => {
    const container = scrollRefs.current[key];
    if (!container) return;
    container.scrollBy({
      left: direction * (container.clientWidth * 0.75),
      behavior: "smooth",
    });
  };

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">Welcome to Legend Games</span>
          <h1>The best Games</h1>
          <p>
            Look at this games and see what do you want.
          </p>
        </div>
      </div>

      {sections.map((section) => {
        const newestId = section.items[0]?.id;
        return (
          <div className="home-section" key={section.key}>
            <div className="section-header">
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>

              <div className="section-actions">
                <div className="section-arrows">
                  <button
                    type="button"
                    className="section-arrow"
                    onClick={() => scrollSection(section.key, -1)}
                    aria-label={`Scroll ${section.title} left`}
                  >
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                  <button
                    type="button"
                    className="section-arrow"
                    onClick={() => scrollSection(section.key, 1)}
                    aria-label={`Scroll ${section.title} right`}
                  >
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                </div>
                {section.key === "games" && (
                  <button className="view-all-btn">View all</button>
                )}
              </div>
            </div>

            <div
              className="game-track"
              ref={(element) => {
                scrollRefs.current[section.key] = element;
              }}
            >
              {section.items.map((game) => (
                <article key={game.id} className="game-card">
                  <div className="game-card-image">
                    <img src={game.image} alt={game.name} />
                    {(game.tag || isNewGame(game)) && (
                      <span className="game-tag">
                        {isNewGame(game) ? "New" : game.tag}
                      </span>
                    )}
                  </div>
                  <div className="game-card-body">
                    <div className="game-card-meta">
                      <h3>{game.name}</h3>
                      <span className="game-date">
                        {game.date} • {game.time}
                      </span>
                    </div>
                    <p>{game.description}</p>
                    <div className="game-card-footer">
                      <span className="game-price">{game.price.toFixed(2)} $</span>
                      <Link className="game-action" to={`/prod/${game.id}`}>
                        View
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
