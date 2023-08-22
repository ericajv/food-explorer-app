import styled from "styled-components"

export const Container = styled.button`
    background-color: ${({ theme }) => theme.COLORS.BUTTON};
    color: ${({ theme }) => theme.COLORS.WHITE_1};

    width: 15rem;
    height: 5.2rem;

    border-radius: 0.5rem;

    padding: 1.2rem 3.2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    > svg {
        width: 3.2rem;
        height: 3.2rem;
    }

    @media (max-width: 768px){
        padding: 1.2rem 1.2rem;
    }

    @media (max-width: 425px){
        font-size: 1.2rem;
        padding: 0.5rem 0.5rem;
    }
`;