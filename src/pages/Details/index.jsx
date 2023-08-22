import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { BiMinus, BiPlus } from "react-icons/bi"

import { Container, Main, ButtonBack, AllIngredientCards, Content } from "./style"
import { Header } from "../../components/Header/"
import { Footer } from "../../components/Footer/"
import { Button } from "../../components/Button/"
import { IngredientCard } from "../../components/IngredientCard/"
import { api } from "../../services/api"
import { useAuth } from "../../hooks/authContext"

export function Details() {
    const [quantity, setQuantity] = useState(1)
    const [data, setData] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const mealImageUrl = data && data.image ? `${api.defaults.baseURL}/files/${data.image}` : null

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

    useEffect(() => {
        async function fetchMeal() {
            const response = await api.get(`/meals/${params.id}`)

            if (response.status == 401) {
                navigate("/login")
            }

            setData(response.data)
        }

        fetchMeal()
    }, [])

    return (
        <Container>
            <Header />
            {
                data &&
                <Main>
                    <ButtonBack>
                        <Link to="/"> <IoIosArrowBack size={32} /> Voltar </Link>
                    </ButtonBack>

                    <Content>
                        <img src={mealImageUrl} alt="Imagem do prato" />

                        <div className="details">
                            <div className="details-wrapper">
                                <h2>{data.name}</h2>
                                <p>{data.description}</p>
                            </div>

                            <AllIngredientCards>
                                {
                                    data.ingredients.map((ingredient, index) => (
                                        <IngredientCard key={String(index)} ingredient={ingredient} />
                                    ))
                                }
                            </AllIngredientCards>

                            <div className="AmountItemsAndBuy-wrapper">
                                {
                                    user.role != "admin"
                                        ? <div className="Amount">
                                            <button
                                                className="MinusItem"
                                                onClick={handleRemoveItem}
                                            >
                                                <BiMinus />
                                            </button>

                                            <span>0{quantity}</span>

                                            <button className="PlusItem" onClick={handleAddItem} >
                                                <BiPlus />
                                            </button>

                                            <Button title={
                                                "incluir · R$ " + String((quantity * data.value).toFixed(2)).replace(".", ",")
                                            } />
                                        </div>
                                        : <div className="Amount">
                                            <Button title="Editar prato" onClick={handleGoToEditPage} />
                                        </div>
                                }

                            </div>

                        </div>

                    </Content>

                </Main>
            }

            <Footer />
        </Container>
    )
}