import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // Backend api location
  const backend_url = "http://127.0.0.1:8000/"

  // Current article displayed
  const [currentArticle, setCurrentArticle] = useState(null)

  // Predefined positions for 6 jump link buttons
  const buttonPositions = [
    { top: "50%", left: "15%", transform: "translate(-50%, -50%)"},   // Left
    { top: "50%", left: "85%", transform: "translate(-50%, -50%)"},   // Right
    { top: "15%", left: "20%", transform: "translate(-50%, -50%)"},   // Top-left
    { top: "15%", left: "80%", transform: "translate(-50%, -50%)"},   // Top-right
    { top: "85%", left: "20%", transform: "translate(-50%, -50%)"},   // Bottom-left
  ];
  const randomArticleButtonPosition = { top: "85%", left: "80%", transform: "translate(-50%, -50%)"}

  // For fetching a random starting article upon startup
  function Fetch_Random_Article() {
    fetch(backend_url + "random_article")
    .then((res) => res.json())
    .then((data) => setCurrentArticle(data));
  }

  // For fetching specified article
  function Fetch_Article(article) {
    fetch(backend_url + "article/" + article)
    .then((res) => res.json())
    .then((data) => setCurrentArticle(data));
  }

  // On startup, fetch and display a random wikipedia article
  useEffect(function Startup() {
    Fetch_Random_Article();
  }, []);

  // UI for display + interacting with current article + jump links
  return (
    <div className = "Wiki-app">
      {currentArticle ? (
        <>
          <div
            className="Article"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentArticle.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1>{currentArticle.title_display}</h1>
            <p>{currentArticle.body}</p>
          </div>
          <div className = "Jump_Links">
            {currentArticle.jump_links.slice(0, 5).map((link, idx) => (
              <button 
                key={idx}
                className="Jump-button"
                style={buttonPositions[idx]}
                onClick={() => Fetch_Article(link.to_article)}
              >
                {link.to_article_display}
              </button>
            ))}
            <button 
              className="Random-article-button"
              style={randomArticleButtonPosition}
              onClick={() => Fetch_Random_Article()}
            >
              Random Article
            </button>
          </div>
        </>
      ) : (
        <p> loading... </p>
      )}
    </div>
  )
}

export default App;
