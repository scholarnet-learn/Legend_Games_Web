import { Link } from "react-router-dom";
import data from "../data/json/data.json";
import "../css/NewRealasePage.css";

export default function NewReleasesPage() {
  const games = data.games ?? [];

  return (
    <section className="new-release-page">
      <div className="new-release-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">New Releases</span>
          <h1>Latest games available now</h1>
          <p>Find the newest titles, browse details, and click through to buy your favorite game.</p>
        </div>
      </div>

      <div className="new-release-list">
        {games.map((game) => (
          <article key={game.id} className="release-card">
            <div className="release-card-image">
              <img src={game.image} alt={game.name} />
            </div>
            <div className="release-card-body">
              <div className="release-card-meta">
                <h3>{game.name}</h3>
                <span>{game.date} • {game.time}</span>
              </div>
              <p>{game.description}</p>
              <div className="release-card-footer">
                <span className="release-card-price">{game.price.toFixed(2)} $</span>
                <Link className="release-card-action" to={`/prod/${game.id}`}>
                  View
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
