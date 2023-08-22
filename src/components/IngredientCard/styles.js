import styled from "styled-components"

export const Container = styled.section`
    display: flex;
    gap: 4rem;

    .ingredients-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.4rem;

        > span {
            font-size: 1.8rem;
            line-height: 2.6rem;
            font-weight: 300;
            background: ${({ theme }) => theme.COLORS.TABLE};
            padding: 0.7rem 0.7rem 0.7rem;
            border-radius: 0.7rem;
            color: ${({ theme }) => theme.COLORS.GRAY_1};
        }
    }

    @media (max-width: 768px){
        gap: 1rem;

        .ingredients-wrapper{
            gap: 1rem;

            > span {
                font-size: 1.4rem;
                line-height: 2rem;
            }
        }
    }

    @media (max-width: 425px){
        gap: 1rem;

        .ingredients-wrapper{
            gap: 1rem;

            > span {
                font-size: 1.4rem;
                line-height: 2rem;
            }
        }
    }
`;