import React, { useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import productsData from './productsData';

const initialFilters = {
  sortBy: 'price',
  categoryFilter: 'all',
  minPrice: '',
  maxPrice: '',
};

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const productsPerPage = 9;

  const handleCategoryFilterChange = (newCategory) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryFilter: newCategory,
    }));
  };

  const handleApplyFilters = () => {
    const filteredProducts = productsData
      .filter((product) =>
        (filters.categoryFilter === 'all' || product.category === filters.categoryFilter) &&
        (filters.minPrice === '' || product.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' || product.price <= parseFloat(filters.maxPrice))
      )
      .sort((a, b) => {
        if (filters.sortBy === 'price') {
          return a.price - b.price;
        }
        return a.title.localeCompare(b.title);
      });

    setPage(1);
    setProducts(filteredProducts);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setProducts(productsData);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <Container>
      <FilterContainer>
        <FilterRow>
          <LabelText>Category</LabelText>
          <div>
            <StyledSelect
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
              value={filters.categoryFilter}
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </StyledSelect>
          </div>
        </FilterRow>
        <FilterRow>
          <LabelText>Price Range</LabelText>
          <div>
            <StyledInput
              type="number"
              placeholder="Min Price"
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              value={filters.minPrice}
              key="minPrice"
            />
          </div>
          <div>
            <StyledLabel></StyledLabel>
            <StyledInput
              type="number"
              placeholder="Max Price"
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              value={filters.maxPrice}
              key="maxPrice"
            />
          </div>
        </FilterRow>
        <FilterRow>
          <LabelText>Sort by</LabelText>
          <div>
            <StyledSelect
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              value={filters.sortBy}
            >
              <option value="price">Price</option>
              <option value="title">Title</option>
            </StyledSelect>
          </div>
        </FilterRow>
        <ButtonRow>
          <StyledButton onClick={handleApplyFilters}>Apply</StyledButton>
          <StyledButton onClick={handleResetFilters}>Reset</StyledButton>
        </ButtonRow>
      </FilterContainer>
      <Content>
        <Header>
          <BigHeader>Product List</BigHeader>
        </Header>
        <ProductsContainer>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => <Product key={product.id} product={product} />)
          ) : (
            <NoProductsMessage>Bigger Text: No products match the selected filters.</NoProductsMessage>
          )}
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

const FilterContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;

const LabelText = styled.label`
  margin: 5px 0;
`;

const StyledSelect = styled.select`
  width: 200px;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledLabel = styled.label``;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const StyledButton = styled.button`
  width: 48%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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

const BigHeader = styled.h1`
  font-size: 36px; /* Adjust the font size as needed */
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
`;

const NoProductsMessage = styled.p`
  font-size: 20px; /* Adjust the font size as needed */
  color: red;
  font-weight: bold;
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
