import { Container } from "./styles"

export function IngredientCard({ ingredient }) {
    return (
        <Container>
            <div className="ingredients-wrapper">
                <span>{ingredient}</span>
            </div>
        </Container>
    )
}