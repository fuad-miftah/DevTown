import React, { useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import productsData from './productsData';

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState('price');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_VALUE);
  const productsPerPage = 6;

  const handleCategoryFilterChange = (newCategory) => {
    setCategoryFilter(newCategory);
  };

  const handleApplyFilters = () => {
    // Filtering logic here
    const filteredProducts = products
      .filter(
        (product) =>
          (categoryFilter === 'all' || product.category === categoryFilter) &&
          product.price >= minPrice &&
          product.price <= maxPrice
      )
      .sort((a, b) => {
        if (sortBy === 'price') {
          return a.price - b.price;
        }
        return a.title.localeCompare(b.title);
      });

    setPage(1);
    setProducts(filteredProducts);
  };

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setMinPrice(0);
    setMaxPrice(Number.MAX_VALUE);
    setSortBy('price');
    setProducts(productsData); // Reset products to the original data
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Container>
      <Content>
        <Header>
          <h1>Product List</h1>
        </Header>
        <FilterContainer>
          <FilterRow>
            <label>Category:</label>
            <select onChange={(e) => handleCategoryFilterChange(e.target.value)}>
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </FilterRow>
          <FilterRow>
            <label>Price Range:</label>
            <input
              type="number"
              placeholder="Min Price"
              onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max Price"
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            />
          </FilterRow>
          <FilterRow>
            <label>Sort by:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Price</option>
              <option value="title">Title</option>
            </select>
          </FilterRow>
          <FilterRow>
            <button onClick={handleApplyFilters}>Apply</button>
            <button onClick={handleResetFilters}>Reset</button>
          </FilterRow>
        </FilterContainer>
        <ProductsContainer>
          {displayedProducts.length > 0
            ? displayedProducts.map((product) => <Product key={product.id} product={product} />)
            : <p>No products match the selected filters.</p>}
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
      </Content>
    </Container>
  );
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  label {
    margin-right: 10px;
  }

  select,
  input {
    margin-right: 10px;
  }

  button {
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
