import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 0.5rem;
    padding: 0.2rem;
    height: 2.6rem;

    // Background condicional:
    background-color: ${({isnew}) => isnew? "transparent" : "rgba(255, 255, 255, 0.1)"};

    color: ${({theme}) => theme.COLORS.WHITE_1};

    // Borda condicional:
    border: ${({theme, isnew}) => isnew ? `2px dashed ${theme.COLORS.GRAY_3}` : "none"};

    border-radius: 1rem;
    padding-right: 1rem;

    > Button {
        border: none;
        background: none;
    }

    .button-delete{
        color: ${({theme}) => theme.COLORS.TEXT_NOT_OK}
    }

    .button-add{
        color: ${({theme}) => theme.COLORS.TEXT_OK}
    }

    > input {
        height: 3rem;
        max-width: 13rem;
        padding: 2rem;
        color: ${({theme}) => theme.COLORS.WHITE_1};
        border: none;
        background: transparent;
    }
`;