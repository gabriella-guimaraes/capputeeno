import styled from "styled-components";
import { ReturnIcon } from "./icons/return-icon";
import { useRouter } from "next/navigation";

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: var(--secondary-text);
    background: transparent;
    border: none;
    cursor: pointer;
`

interface ButtonProps {
    navigate: string
}

export function ReturnButton({ navigate }: ButtonProps){
    const router = useRouter();
    const handleNavigate = () => {
        router.push(navigate)
    }
    return(
        <Button onClick={handleNavigate}>
                <ReturnIcon/>
                Voltar
        </Button>
    )
}