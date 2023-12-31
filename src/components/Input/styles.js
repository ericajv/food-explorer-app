import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_2};

    > label{
        width: 100%;
        color: ${({ theme }) => theme.COLORS.GRAY_2};
    }

    > input {
        height: 4.8rem;
        width: 100%;
        padding: 1.2rem 1.4rem;
        color: ${({ theme }) => theme.COLORS.WHITE_1};
        background: transparent;
        border-radius: 0.5rem;
        border: 1px solid white;
    }
`;