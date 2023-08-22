import { Container, Main, ButtonBack, Form, InputWrapper, TextArea, SectionIngredients, SendFormWithImage } from "./styles"

import { Header } from "../../components/Header/"
import { Footer } from "../../components/Footer/"
import { Input } from "../../components/Input"
import { NoteItem } from "../../components/NoteItem"
import { Button } from "../../components/Button"

import { IoIosArrowBack } from "react-icons/io"
import { FiUpload } from "react-icons/fi"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../hooks/authContext"
import { api } from "../../services/api"

export function Create() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")

    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")

    const [image, setImage] = useState(null)

    function handleAddIngredient() {
        setIngredients(prevState => [...prevState, newIngredient])
        setNewIngredient("")
    }

    function handleRemoveIngredient(ingredientDeleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== ingredientDeleted))
    }

    async function handleCreateMeal() {
        if (!name) {
            return alert("Dígite o título do prato")
        }

        if (!value) {
            return alert("Adicione um preço ao prato")
        }

        if (!category) {
            return alert("Adicione uma categoria ao prato")
        }

        if (!description) {
            return alert("Adicione uma descrição para o prato que deseja adicionar ao cardápio")
        }

        if (newIngredient) {
            return alert("Você deixou um ingrediente no campo para adicionar")
        }

        const response = await api.post("/meals", { name, description, value, category_name: category, ingredients })

        if (response.status == 401) {
            navigate("/login")
        }

        const mealId = response.data.id

        const formData = new FormData()
        formData.append("image", image)

        await api.patch(`/meals/${mealId}/image`, formData)

        alert("Refeição criada com sucesso")
        navigate("/")
    }

    return (
        <Container>
            <Header />
            {
                user.role == "admin" &&
                    <Main>
                        <ButtonBack>
                            <Link to="/">
                                <IoIosArrowBack size={32} />
                                Voltar
                            </Link>

                            <h2>Adicionar prato</h2>
                        </ButtonBack>

                        <Form>
                            <InputWrapper>
                                <div className="uploadImage">
                                    <label id="file" htmlFor="image">
                                        Imagem do prato
                                        <div className="uploadImageSelect">
                                            <FiUpload size={24} />
                                            <span>Selecione imagem</span>
                                            <input
                                                id="image"
                                                type="file"
                                                onChange={e => setImage(e.target.files[0])}
                                            />
                                        </div>
                                    </label>
                                </div>

                                <Input
                                    label="name"
                                    title="Nome"
                                    type="text"
                                    placeholder="Ex.: Salada Ceasar"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />

                                <Input
                                    label="name"
                                    title="Categoria"
                                    type="text"
                                    placeholder="Categoria"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />

                            </InputWrapper>

                            <label htmlFor="ingredients"> Ingredientes </label>
                            <InputWrapper>
                                <SectionIngredients>
                                    {
                                        ingredients.map((ingredient, index) => (
                                            <NoteItem
                                                key={String(index)}
                                                value={ingredient}
                                                onClick={() => handleRemoveIngredient(ingredient)}
                                            />
                                        ))
                                    }

                                    <NoteItem
                                        isnew="true"
                                        placeholder="Adicionar"
                                        onChange={e => setNewIngredient(e.target.value)}
                                        value={newIngredient}
                                        onClick={handleAddIngredient}
                                    />

                                </SectionIngredients>

                                <Input
                                    className="priceButton"
                                    title="Preço"
                                    type="text"
                                    placeholder="R$ 00,00"
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                />
                            </InputWrapper>

                            <TextArea>
                                <label htmlFor="">Descrição</label>
                                <textarea
                                    placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                >
                                </textarea>
                            </TextArea>
                            <div className="saveButtonDiv">
                                <Button
                                    className="saveButton"
                                    title="Salvar alterações"
                                    onClick={handleCreateMeal}
                                />
                            </div>
                        </Form>
                    </Main>
            }

            <Footer />
        </Container>
    )
}