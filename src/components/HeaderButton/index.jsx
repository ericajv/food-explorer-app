import { Container } from "./styles"
import { PiReceipt } from "react-icons/pi"

export function HeaderButton({ title, ...rest }) {
    return (
        <Container {...rest} >
            {title == "Pedidos (0)" &&  <PiReceipt />}
            {title}
        </Container>
    )
}