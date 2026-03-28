import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShare, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './BooksSection.css';

const books = [
  {
    id: 1,
    title: "The Power of Dominion",
    author: "Dr. David Ogbueli",
    price: 5000,
    originalPrice: 7500,
    coverImage: "/images/books/power-of-dominion.jpg",
    description: "Discover your authority in Christ and learn to walk in dominion over every circumstance.",
    rating: 4.8,
    reviews: 127,
    category: "Spiritual Growth",
    isBestseller: true,
    isNew: false,
    format: ["Hardcover", "Paperback", "E-book"]
  },
  {
    id: 2,
    title: "Raising Kingdom Leaders",
    author: "Dr. David Ogbueli",
    price: 6500,
    originalPrice: 8500,
    coverImage: "/images/books/raising-kingdom-leaders.jpg",
    description: "Biblical principles for raising leaders who will impact their generations.",
    rating: 4.9,
    reviews: 98,
    category: "Leadership",
    isBestseller: true,
    isNew: false,
    format: ["Hardcover", "Paperback"]
  },
  {
    id: 3,
    title: "Wisdom for Living",
    author: "Dr. David Ogbueli",
    price: 4500,
    originalPrice: 6000,
    coverImage: "/images/books/wisdom-for-living.jpg",
    description: "Daily devotional for practical wisdom and spiritual growth.",
    rating: 4.7,
    reviews: 203,
    category: "Devotional",
    isBestseller: false,
    isNew: true,
    format: ["Paperback", "E-book"]
  },
  {
    id: 4,
    title: "Financial Freedom",
    author: "Pastor John Adekunle",
    price: 5500,
    originalPrice: 7000,
    coverImage: "/images/books/financial-freedom.jpg",
    description: "Biblical principles for financial breakthrough and stewardship.",
    rating: 4.6,
    reviews: 86,
    category: "Finance",
    isBestseller: false,
    isNew: false,
    format: ["Paperback", "E-book"]
  },
  {
    id: 5,
    title: "The Spirit of Prayer",
    author: "Dr. David Ogbueli",
    price: 5000,
    originalPrice: 6500,
    coverImage: "/images/books/spirit-of-prayer.jpg",
    description: "Understanding the power of prayer and developing a consistent prayer life.",
    rating: 4.9,
    reviews: 156,
    category: "Prayer",
    isBestseller: true,
    isNew: false,
    format: ["Hardcover", "Paperback", "E-book"]
  },
  {
    id: 6,
    title: "Marriage That Works",
    author: "Pastor & Mrs. Ogbueli",
    price: 7000,
    originalPrice: 9000,
    coverImage: "/images/books/marriage-that-works.jpg",
    description: "Biblical principles for building a strong and lasting marriage.",
    rating: 4.8,
    reviews: 112,
    category: "Family",
    isBestseller: false,
    isNew: true,
    format: ["Hardcover", "Paperback"]
  }
];

const categories = ["All", "Spiritual Growth", "Leadership", "Devotional", "Finance", "Prayer", "Family"];

const BooksSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState("featured");

  const filteredBooks = books.filter(book => 
    selectedCategory === "All" || book.category === selectedCategory
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "bestseller") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    return 0;
  });

  const addToCart = (book) => {
    setCart([...cart, { ...book, quantity: 1 }]);
    toast.success(`${book.title} added to cart!`);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => item.id !== bookId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success(`Proceeding to checkout! Total: ₦${getCartTotal().toLocaleString()}`);
    // Here you would integrate payment gateway
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} />);
    }
    return stars;
  };

  return (
    <section className="books-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Resources</span>
          <h2>Books & Resources</h2>
          <p>Empowering you with life-transforming materials</p>
        </div>

        {/* Cart Button */}
        <button className="cart-button" onClick={() => setShowCart(true)}>
          <FaShoppingCart />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>

        {/* Filters */}
        <div className="books-filters">
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sort-select">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {sortedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className="book-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {book.isBestseller && <div className="book-badge bestseller">Bestseller</div>}
              {book.isNew && <div className="book-badge new">New Release</div>}
              
              <div className="book-image" onClick={() => setSelectedBook(book)}>
                <img src={book.coverImage} alt={book.title} />
                <div className="book-overlay">
                  <FaEye /> Quick View
                </div>
              </div>
              
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="book-rating">
                  {renderStars(book.rating)}
                  <span>({book.reviews})</span>
                </div>
                <p className="book-description">{book.description.substring(0, 80)}...</p>
                <div className="book-price">
                  <span className="current-price">₦{book.price.toLocaleString()}</span>
                  {book.originalPrice && (
                    <span className="original-price">₦{book.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button className="btn btn-primary" onClick={() => addToCart(book)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="cart-header">
              <h3>Your Cart ({cart.length} items)</h3>
              <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.coverImage} alt={item.title} />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <p>₦{item.price.toLocaleString()}</p>
                      <div className="cart-item-quantity">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>₦{getCartTotal().toLocaleString()}</span>
                </div>
                <button className="btn btn-primary checkout-btn" onClick={checkout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Preview Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="book-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              className="book-modal-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedBook(null)}>×</button>
              <div className="book-modal-grid">
                <div className="book-modal-image">
                  <img src={selectedBook.coverImage} alt={selectedBook.title} />
                </div>
                <div className="book-modal-info">
                  <h2>{selectedBook.title}</h2>
                  <p className="book-author">by {selectedBook.author}</p>
                  <div className="book-rating">
                    {renderStars(selectedBook.rating)}
                    <span>({selectedBook.reviews} reviews)</span>
                  </div>
                  <p className="book-description">{selectedBook.description}</p>
                  <div className="book-price">
                    <span className="current-price">₦{selectedBook.price.toLocaleString()}</span>
                    {selectedBook.originalPrice && (
                      <span className="original-price">₦{selectedBook.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="book-formats">
                    <strong>Available formats:</strong>
                    <div className="format-buttons">
                      {selectedBook.format.map(f => (
                        <button key={f} className="format-btn">{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="book-modal-actions">
                    <button className="btn btn-primary" onClick={() => {
                      addToCart(selectedBook);
                      setSelectedBook(null);
                    }}>
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button className="btn btn-outline">
                      <FaHeart /> Wishlist
                    </button>
                    <button className="btn btn-outline">
                      <FaShare /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BooksSection;