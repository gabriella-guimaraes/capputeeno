"use client"

import styled from "styled-components"
import { DefaultPageLayout } from "../components/default-page-layout"
import { ReturnButton } from "../components/return-button"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Product, ProductInCart } from "../types/product"
import { formatPrice } from "../utils/format-price"
import { CartItem } from "../components/cart/cart-item"
import { Divider } from "../components/divider"

const Container = styled.div`
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
    flex-direction: row;
    gap: 32px;

    @media(min-width: ${props => props.theme.desktopBreakPoint}) {
        flex-direction: row;
        //the media query responsive isn't working isn't working... why?
    }
`

const CartListContainer = styled.div`
    //margin-top: 24px;

    h3 {
        font-size: 24px;
        font-weight: 500;
        text-transform: uppercase;
        color: (--text-dark-2);
        line-height: 150%;
        margin-top: 24px;
    }

    p {
        font-size: 16px;
        font-weight: 300;
        line-height: 150%;
        color: var(--text-dark-2);

        span {
            font-weight: 600;
        }
    }

`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 23px;
`

const CartResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: white;
    height: 100%;
    min-width: 352px;
    padding: 16px 24px;

    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--tex-dark-2);
        text-transform: uppercase;
        margin-bottom: 30px;
    }
`

const TotalItem = styled.div<{ isBold: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: ${props => props.isBold ? '600' : '400'};
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 12px;
`

const ShopButton = styled.button`
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 4px;
    background: var(--success-color);
    padding: 12px;
    width: 100%;
    margin-top: 40px;
`

export default function CartPage(){
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", []);
    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0);
    }
    const cartTotal = formatPrice(calculateTotal(value));
    const deliveryFee = 4000;
    const cartTotalWithDelivery = formatPrice(calculateTotal(value) + deliveryFee);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = value.map (item => {
            if(item.id !== id) return item
            return {
              ...item,
                quantity
            }
        })
        console.log(newValue);
        updateLocalStorage(newValue);
    }

    const handleDeleteItem = (id: string) => {
        const newValue = value.filter (item => {
            if(item.id !== id) return item
        })

        updateLocalStorage(newValue);
    }

    return (
      <DefaultPageLayout>
        <Container>
          <CartListContainer>
          <ReturnButton navigate="/" />
            <h3>Seu carrinho</h3>
            <p>
              Total {value.length} produtos
              <span>{cartTotal}</span>
            </p>
            <CartList>
              {value.map((item) => (
                <CartItem
                  product={item}
                  key={item.id}
                  handleDelete={handleDeleteItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </CartList>
          </CartListContainer>
          <CartResultContainer>
            <h3>Resumo do Pedido</h3>
            <TotalItem isBold={false}>
                <p>Subtotal de produtos</p>
                <p>{cartTotal}</p>
            </TotalItem>
            <TotalItem isBold={false}>
                <p>Entrega</p>
                <p>{formatPrice(deliveryFee)}</p>
            </TotalItem>
            <TotalItem isBold={true}>
                <p>Total</p>
                <p>{cartTotalWithDelivery}</p>
            </TotalItem>
            <Divider/>
            <ShopButton>FINALIZAR COMPRA</ShopButton>
          </CartResultContainer>
        </Container>
      </DefaultPageLayout>
    );
}