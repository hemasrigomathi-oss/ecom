import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="shoppy-home">

      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small-title">WELCOME TO SHOPPY</p>

          <h1>
            Style That
            <span> Speaks For You.</span>
          </h1>

          <p className="hero-description">
            Discover fashion, lifestyle essentials, and everyday products
            carefully selected to make your shopping experience simple,
            stylish, and enjoyable.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-primary-btn">
              Shop Now
            </Link>

            <Link to="/about" className="hero-secondary-btn">
              Explore More
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80"
              alt="Fashion collection"
            />
          </div>

          <div className="hero-floating-card">
            <span>NEW</span>
            <p>
              Fresh styles
              <br />
              just arrived
            </p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>
          <h2>Find What Fits Your Style</h2>
          <span>
            Explore our handpicked collections made for every mood and moment.
          </span>
        </div>

        <div className="category-grid">
          <Link to="/products" className="category-item">
            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
                alt="Fashion"
              />
            </div>

            <div className="category-content">
              <h3>Fashion</h3>
              <p>Modern looks for everyday confidence</p>
              <span>Explore Collection →</span>
            </div>
          </Link>

          <Link to="/products" className="category-item">
            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
                alt="Accessories"
              />
            </div>

            <div className="category-content">
              <h3>Accessories</h3>
              <p>Small details that complete your look</p>
              <span>Explore Collection →</span>
            </div>
          </Link>

          <Link to="/products" className="category-item">
            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=700&q=80"
                alt="Lifestyle"
              />
            </div>

            <div className="category-content">
              <h3>Lifestyle</h3>
              <p>Products designed for better living</p>
              <span>Explore Collection →</span>
            </div>
          </Link>

          <Link to="/products" className="category-item">
            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
                alt="Footwear"
              />
            </div>

            <div className="category-content">
              <h3>Footwear</h3>
              <p>Comfort and style in every step</p>
              <span>Explore Collection →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="trending-section">
        <div className="section-heading">
          <p>OUR PICKS</p>
          <h2>Trending Right Now</h2>
          <span>
            Popular products our shoppers are loving right now.
          </span>
        </div>

        <div className="trend-grid">
          <div className="trend-card">
            <div className="trend-image">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
                alt="Trending fashion"
              />
              <span className="trend-label">TRENDING</span>
            </div>

            <div className="trend-content">
              <h3>Everyday Essentials</h3>
              <p>Simple pieces that never go out of style.</p>
            </div>
          </div>

          <div className="trend-card">
            <div className="trend-image">
              <img
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80"
                alt="Premium collection"
              />
              <span className="trend-label">POPULAR</span>
            </div>

            <div className="trend-content">
              <h3>Premium Collection</h3>
              <p>Elevated styles made for special moments.</p>
            </div>
          </div>

          <div className="trend-card">
            <div className="trend-image">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
                alt="New arrivals"
              />
              <span className="trend-label">NEW</span>
            </div>

            <div className="trend-content">
              <h3>Fresh Arrivals</h3>
              <p>Discover something new for your wardrobe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-heading">
          <p>WHY SHOPPY</p>
          <h2>Shopping Made Simple</h2>
          <span>
            Everything you need for a smooth and enjoyable shopping journey.
          </span>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✦</div>
            <h3>Curated Products</h3>
            <p>
              Carefully selected products that bring style and value together.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">♡</div>
            <h3>Made For You</h3>
            <p>
              Collections designed to match different lifestyles and tastes.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">↗</div>
            <h3>Easy Shopping</h3>
            <p>
              Browse, add to cart, and checkout with a simple experience.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">✓</div>
            <h3>Secure Checkout</h3>
            <p>
              A smooth checkout experience designed with your convenience in mind.
            </p>
          </div>
        </div>
      </section>

      <section className="final-shopping-section">
        <div className="final-shopping-content">
          <p>YOUR NEXT FAVORITE FIND</p>

          <h2>
            Good Style.
            <br />
            Good Choices.
            <br />
            <span>Good Shopping.</span>
          </h2>

          <p className="final-description">
            Take a look around and discover products that feel right for you.
          </p>

          <Link to="/products" className="final-shop-btn">
            Start Shopping
            <span>→</span>
          </Link>
        </div>

        <div className="final-shopping-visual">
          <div className="visual-card visual-card-one">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"
              alt="Shopping collection"
            />
          </div>

          <div className="visual-card visual-card-two">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80"
              alt="Fashion style"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
