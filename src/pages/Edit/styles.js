import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 10.4rem auto 7.2rem;
    grid-area:
    "header"
    "main"
    "footer";

`;

export const Main = styled.main`
    grid-area: "main";
    margin: 0 auto;
    width: 136.8rem;

    display: flex;
    flex-direction: column;
    padding: 2.4rem 12.3rem;

    .editButton {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 2.4rem;
    }

    .saveButton{
        width: 18%;
    }

    .deleteButton{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_INPUT};
        color: ${({ theme }) => theme.COLORS.WHITE_1};

        width: 18%;
        height: 4.8rem;

        border-radius: 0.5rem;

        padding: 1.2rem 3.2rem;

        &:disabled{
            opacity: 0.5;
        }
    }
`;

export const ButtonBack = styled.div`
    margin: 1.8rem 0;
    max-width: 136.8rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    > a {
        background-color: transparent;
        color: ${({ theme }) => theme.COLORS.GRAY_1};

        display: flex;
        align-items: center;

        font-size: 2.4rem;
        font-weight: 500;
        line-height: 3.6rem;
    }

    > h2 {
        font-size: 3.2rem;
        font-weight: 500;
        line-height: 4.48rem;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 136.8rem;

    label {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1};
        color: ${({ theme }) => theme.COLORS.GRAY_2};
    }

    .uploadImage {

        #file {
            color: ${({ theme }) => theme.COLORS.GRAY_2};

            display: flex;
            flex-direction: column;

            gap: 0.8rem;

            .uploadImageSelect {
                display: flex;
                align-items: center;
                justify-content: center;

                gap: 3rem;
                border-radius: 0.5rem;
                height: 4.8rem;
                width: 30rem;

                color: ${({ theme }) => theme.COLORS.WHITE_1};
                border: 1px solid ${({ theme }) => theme.COLORS.WHITE_1};
            }
        }

        input[type="file"] {
            display: none;
        }

        .priceButton {
            height: 7rem;
        }
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-bottom: 3.2rem;
`;

export const TextArea = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 0.8rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1};

    margin-bottom: 4.8rem;
    > label{
        margin-top: 3.2rem;
        width: 100%;
        color: ${({ theme }) => theme.COLORS.GRAY_2};
    }

    > textarea {
        height: 17.2rem;
        width: 100%;
        padding: 1.4rem;
        color: ${({ theme }) => theme.COLORS.WHITE_1};
        background: transparent;
        border-radius: 0.5rem;
        border: 1px solid white;
        resize: none;
    }

`;

export const SectionIngredients = styled.section`
    display: flex;
    flex-wrap: nowrap;
    gap: 1.6rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid white;
    padding: 1rem;
`;

export const SendFormWithImage = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    > button{
        width: 40%;
    }
`;

export const MainUser = styled.main`
    grid-area: "main";
    margin: 0 auto;
    width: 136.8rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    img{
        width: 30rem;
        height: 30rem;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        h4{
            font-size: 1.8rem;
            font-weight: 300;
        }

        h2 {
        font-size: 5rem;

        > span{
            color: ${({ theme }) => theme.COLORS.TEXT_DELETE}
        }
        }
    }
`;