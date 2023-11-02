import styled from 'styled-components';

const Product = ({ product }) => {
  return (
    <ProductContainer>
      <Image src={product.image} alt={product.title} />
      <Content>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <Price>${product.price}</Price>
      </Content>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
  width: 26%; /* Adjust the width to fit 4 cards per row */
  margin: 10px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Content = styled.div`
  padding: 10px;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  color: #333;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
`;

const Price = styled.div`
  font-weight: bold;
  margin-top: 10px;
  color: #ff5733;
`;

export default Product;
