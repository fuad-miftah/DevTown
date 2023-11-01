import styled from 'styled-components';

const Product = ({ product }) => {
  return (
    <ProductContainer>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>${product.price}</Price>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Price = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

export default Product;
