import React from 'react';
import { Helmet } from 'react-helmet-async';
import BooksSection from '../components/books/BooksSection';

const Books = () => {
  return (
    <>
      <Helmet>
        <title>Books & Resources | Dominion City</title>
        <meta name="description" content="Browse and purchase life-transforming books and resources from Dominion City Church." />
      </Helmet>
      <main style={{ marginTop: '80px' }}>
        <BooksSection />
      </main>
    </>
  );
};

export default Books;