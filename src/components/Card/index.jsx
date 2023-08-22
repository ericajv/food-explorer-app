import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiMinus, BiPlus } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai"
import { PiPencilSimpleLight } from "react-icons/pi"

import { Container } from "./styles"
import { Button } from "../Button"
import { useAuth } from "../../hooks/authContext"
import { api } from "../../services/api"

export function Card({ data, ...rest }) {
    const mealImageUrl = data.image ? `${api.defaults.baseURL}/files/${data.image}` : null

    const navigate = useNavigate()
    const { user } = useAuth()

    const [quantity, setQuantity] = useState(1)

    function handleAddItem() {
        setQuantity(quantity + 1)
    }

    function handleRemoveItem() {
        if (quantity != 1) {
            setQuantity(quantity - 1)
        }
    }

    function handleGoToEditPage() {
        navigate(`/edit/${data.id}`)
    }

    return (
        <Container {...rest}>
            {
                user.role != "admin"
                    ? <button className="FavoriteMeal" > <AiOutlineHeart /> </button>
                    : <button className="EditMeal" onClick={handleGoToEditPage} >
                        <PiPencilSimpleLight />
                    </button>
            }

            <img src={mealImageUrl} alt="" />

            <Link to={`/details/${data.id}`}>
                <h2>{data.name}</h2>
            </Link>

            <span>{data.description}</span>

            <h4>R$ {String((quantity * data.value).toFixed(2)).replace(".", ",")}</h4>

            {
                user.role != "admin" &&
                    <div className="AmountItemsAndBuy-wrapper">
                        <div className="Amount">
                            <button className="MinusItem" onClick={handleRemoveItem} >
                                <BiMinus />
                            </button>

                            <span>
                                {quantity < 10 ? `0${quantity}` : quantity}
                            </span>

                            <button className="PlusItem" onClick={handleAddItem} >
                                <BiPlus />
                            </button>

                        </div>

                        <Button title="incluir" />
                    </div>
            }
        </Container>
    )
}