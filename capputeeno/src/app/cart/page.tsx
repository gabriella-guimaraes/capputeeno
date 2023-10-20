"use client"

import styled from "styled-components"
import { DefaultPageLayout } from "../components/default-page-layout"
import { ReturnButton } from "../components/return-button"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Product, ProductInCart } from "../types/product"
import { formatPrice } from "../utils/format-price"
import { CartItem } from "../components/cart/cart-item"

const Container = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: center;
`

const CartListContainer = styled.div`
    margin-top: 24px;

    h4 {
        font-size: 24px;
        font-weight: 500;
        text-transform: uppercase;
        color: (--text-dark-2);
        line-height: 150%;
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
    margin-top: 24px;
`

export default function CartPage(){
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", []);
    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0);
    }
    const cartTotal = formatPrice(calculateTotal(value));

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

    return(
        <DefaultPageLayout>
            <ReturnButton navigate="/"/>
            <Container>
                {/* <ReturnButton navigate="/"/> */}
                <CartListContainer>
                    <h4>Seu carrinho</h4>
                    <p>
                        Total {value.length} produtos
                        <span>{cartTotal}</span>
                    </p>
                    <CartList>
                        {value.map(item => <CartItem product={item} key={item.id} handleUpdateQuantity={handleUpdateQuantity} />)}
                    </CartList>
                </CartListContainer>
            </Container>
        </DefaultPageLayout>
    )
}

//TODO: Cart Page