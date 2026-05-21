import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import "./App.css";

// backend lives on port 3001, but this lets me swap it with an env var later if i need to
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// backup articles so the page still looks finished even if the backend is not running yet
const fallbackArticles = [
  {
    id: 1,
    title: "Pharmac Lists Keytruda for Broader Cancer Coverage",
    subtitle: "Est venenatis - Medsafe Regulatory Approval, New Zealand",
    date: "March 2025",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
  },
  {
    id: 2,
    title: "Medsafe Tightens Direct-to-Consumer Marketing Rules",
    subtitle: "Est venenatis - New Zealand Health Compliance Update",
    date: "February 2025",
    image:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
  },
  {
    id: 3,
    title: "NZ Pharma Brands Pivot to Digital-First Campaign Strategy",
    subtitle: "Est venenatis - Industry Marketing Strategy Trends",
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1646106736273-8911958238ff?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ["NEWS", "OUR TEAM (SPOILER ITS JUST HANS)", "CONTACT US"];

  // desktop gets the normal menu, mobile gets the hamburger menu so it does not get squished
  return (
    <nav className="navbar" data-testid="navbar">
      <div className="nav-inner">
        <a href="#top" className="logo" data-testid="nav-logo">
          Hans Marketing
        </a>

        <div className="desktop-menu" data-testid="nav-desktop-menu">
          {menuItems.map((item) => (
            <a key={item} href="#news" className="nav-link">
              {item}
            </a>
          ))}
          <button className="login-button" data-testid="nav-login-btn">
            Login
          </button>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          data-testid="nav-hamburger-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu" data-testid="nav-mobile-menu">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#news"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mobile-login-button" data-testid="nav-mobile-login-btn">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  // search is just part of the prototype layout, so submitting the form does not actually go anywhere
  return (
    <section id="top" className="hero-section" data-testid="hero-section">
      <div className="page-container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Hans Marketing NZ</span>
            <h1 className="hero-title" data-testid="hero-heading">
              Lorem ipsum
              <br />
              dolor sit amet
            </h1>

            <form
              className="search-form"
              data-testid="hero-search-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="search-input"
                data-testid="hero-search-input"
              />
              <button type="submit" className="search-button" data-testid="hero-search-btn">
                <Search size={15} />
                Search
              </button>
            </form>
          </div>

          <div className="hero-image-wrap" data-testid="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900"
              alt="Professional marketing strategy meeting"
              className="hero-image"
              data-testid="hero-image"
            />
            <div className="image-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ article, index }) {
  // one card for each article, keeping the repeated card markup in one place
  return (
    <article className="news-card" data-testid={`news-card-${index}`}>
      <div className="card-image-wrap" data-testid={`news-card-image-${index}`}>
        <img src={article.image} alt={article.title} className="card-image" />
      </div>
      <div className="card-content">
        <span className="card-date" data-testid={`news-card-date-${index}`}>
          {article.date}
        </span>
        <h3 className="card-title" data-testid={`news-card-title-${index}`}>
          {article.title}
        </h3>
        <p className="card-subtitle" data-testid={`news-card-subtitle-${index}`}>
          {article.subtitle}
        </p>
        <div className="read-more" data-testid={`news-card-readmore-${index}`}>
          <span>Read More</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </article>
  );
}

function NewsGrid() {
  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);

  // asks the backend for the news list, then falls back to the local list if something is offline
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(() => setArticles(fallbackArticles))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="news" className="news-section" data-testid="news-section">
      <div className="page-container">
        <div className="section-header">
          <span className="eyebrow">Latest News</span>
          <h2 className="section-title" data-testid="news-section-heading">
            Industry Updates
          </h2>
        </div>

        {loading ? (
          <div className="loading" data-testid="news-loading">
            Loading articles...
          </div>
        ) : (
          <div className="news-grid" data-testid="news-grid">
            {articles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  // simple footer to finish the page off without adding another whole section
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-inner">
        <div>
          <span className="footer-logo" data-testid="footer-logo">
            Hans Chang
          </span>
          <p className="footer-text">Hans Marketing & Co</p>
        </div>
        <p className="copyright" data-testid="footer-copyright">
          © 2026 Hans Marketing
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  // all the page pieces are stacked here in the same order as the wireframe
  return (
    <div className="page">
      <Navbar />
      <main>
        <HeroSection />
        <NewsGrid />
      </main>
      <Footer />
    </div>
  );
}
