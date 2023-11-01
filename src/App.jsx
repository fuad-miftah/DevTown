import React, { useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import productsData from './productsData';

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState('price');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const productsPerPage = 3;

  const handleCategoryFilterChange = (newCategory) => {
    // Reset the page to 1 when a filter is applied
    setPage(1);

    setCategoryFilter(newCategory);
  };

  const filteredProducts = products
    .filter((product) => categoryFilter === 'all' || product.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.title.localeCompare(b.title);
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Container>
      <Header>
        <h1>Product List</h1>
        <FilterContainer>
          <label>Category:</label>
          <select onChange={(e) => handleCategoryFilterChange(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </FilterContainer>
      </Header>
      <ProductsContainer>
        {displayedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsContainer>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageNumber
            key={index}
            isActive={index + 1 === page}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </PageNumber>
        ))}
      </Pagination>
    </Container>
  );
};



const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  background: ${({ isActive }) => (isActive ? '#007bff' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  border-radius: 5px;
  margin: 0 5px;
  transition: background 0.3s;
  &:hover {
    background: ${({ isActive }) => (isActive ? '#0056b3' : '#f0f0f0')};
  }
`;

export default App;
