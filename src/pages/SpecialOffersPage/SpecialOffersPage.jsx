import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpecialOffersPage = () => {
  const { items } = useSelector(state => state.books);
  console.log('items', items);
  // Mock special offers - select some books with discounts
  const specialOffers = [
    {
      code: 'WELCOME15',
      title: 'Welcome Offer',
      description: 'Get 15% off on your first order',
      discount: '15%',
      validUntil: '2024-12-31',
      minPurchase: 0,
    },
    {
      code: 'BULK20',
      title: 'Bulk Purchase',
      description: 'Buy 5 or more books and get 20% off',
      discount: '20%',
      validUntil: '2024-12-31',
      minPurchase: 5,
    },
    {
      code: 'FICTION25',
      title: 'Fiction Lovers',
      description: 'Get 25% off on all fiction books',
      discount: '25%',
      validUntil: '2024-12-31',
      minPurchase: 0,
      category: 'Fiction',
    },
    {
      code: 'SUMMER30',
      title: 'Summer Reading',
      description: 'Special summer discount on selected books',
      discount: '30%',
      validUntil: '2024-08-31',
      minPurchase: 3,
    },
  ];

  // Get featured books for special offers (first 6 books)
  const featuredBooks = items.slice(0, 6);

  return (
    <div className="space-y-8" data-testid="special-offers-page">
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-white">Special Offers</h1>
        <p className="text-lg opacity-95 text-white">Save big with our exclusive promotional codes and deals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialOffers.map((offer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border-2 border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all"
            data-testid={`offer-${index}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-secondary-700 mb-2">{offer.title}</h2>
                <p className="text-secondary-600">{offer.description}</p>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                {offer.discount}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {offer.category && (
                <p className="text-sm text-secondary-600">
                  <span className="font-medium">Category:</span> {offer.category}
                </p>
              )}
              {offer.minPurchase > 0 && (
                <p className="text-sm text-secondary-600">
                  <span className="font-medium">Minimum:</span> {offer.minPurchase} books
                </p>
              )}
              <p className="text-sm text-secondary-600">
                <span className="font-medium">Valid until:</span> {new Date(offer.validUntil).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg p-3 border-2 border-dashed border-primary-300">
              <p className="text-xs text-primary-700 font-semibold mb-1">Promo Code</p>
              <p className="text-xl font-mono font-bold text-primary-700 tracking-wider">{offer.code}</p>
            </div>
          </div>
        ))}
      </div>

      {featuredBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary-700 mb-6">Featured Books on Sale</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredBooks.map(book => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-all"
                data-testid={`featured-book-${book.id}`}
              >
                <img src={book.cover} alt={book.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                <h3 className="font-medium text-sm text-secondary-700 line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-xs text-secondary-500 mb-2">{book.author}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary-700">${(book.price * 0.85).toFixed(2)}</span>
                  <span className="text-sm text-secondary-400 line-through">${book.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl p-6 border-2 border-primary-200">
        <h3 className="text-xl font-bold text-primary-800 mb-2">How to Use Promo Codes</h3>
        <ol className="list-decimal list-inside space-y-2 text-secondary-700">
          <li>Add books to your cart</li>
          <li>Proceed to checkout</li>
          <li>Enter your promo code in the designated field</li>
          <li>Click "Apply" to see your discount</li>
          <li>Complete your order and enjoy your savings!</li>
        </ol>
      </div>
    </div>
  );
};

export default SpecialOffersPage;
