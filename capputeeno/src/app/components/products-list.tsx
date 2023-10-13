"use client";

import { useProducts } from "../hooks/useProducts";
import { ProductCart } from "./product-cart";
import { styled } from 'styled-components';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 256px);
    grid-gap: 32px;
    max-width: 100%;
    margin-top: 32px;
`

export function ProductsList() {
  const { data } = useProducts();
  console.log(data);
  return (
    <ListContainer>
      {data?.map((product) => (
        <ProductCart
          key={product.id}
          tittle={product.name}
          price={product.price_in_cents}
          image={product.image_url}
        />
      ))}
    </ListContainer>
  );
}
