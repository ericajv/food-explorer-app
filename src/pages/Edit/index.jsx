import { Container, Main, ButtonBack, Form, InputWrapper, TextArea, SectionIngredients } from "./styles"

import { Header } from "../../components/Header/"
import { Footer } from "../../components/Footer/"
import { Input } from "../../components/Input"
import { NoteItem } from "../../components/NoteItem"
import { Button } from "../../components/Button"

import { IoIosArrowBack } from "react-icons/io"
import { FiUpload } from "react-icons/fi"

import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/authContext"
import { api } from "../../services/api"

export function Edit() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const params = useParams()

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

    async function handleDeleteMeal() {
        const confirm = window.confirm("Deseja deletar a refeição?")

        if (confirm) {
            await api.delete(`/meals/${params.id}`)
            navigate("/")
        }
    }

    async function handleEditMeal() {
        if (!image) {
            return alert("Adicione uma imagem para o prato")
        }

        if (!name) {
            return alert("Adicione um titulo para o prato")
        }

        if (!description) {
            return alert("Adicione uma descrição para o prato")
        }

        if (!category) {
            return alert("Adicione um categoria para o prato")
        }

        if (!value) {
            return alert("Adicione um preço para o prato")
        }

        if (newIngredient) {
            return alert("Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio.")
        }

        await api.patch(`/meals/${params.id}`, { name, description, value, category_name: category, ingredients })

        const response = await api.get(`/meals/${params.id}`)

        if (response.status == 401) {
            navigate("/login")
        }

        if (image != response.data.image) {
            const formData = new FormData()
            formData.append("image", image)
            await api.patch(`/meals/${params.id}/image`, formData)
        }

        alert("Refeição modificada com sucesso")
        navigate("/")
    }

    useEffect(() => {
        async function fetchMeal() {
            const response = await api.get(`/meals/${params.id}`)

            if (response.status == 401) {
                navigate("/login")
            }

            const { name, description, category_name, value, ingredients, image } = response.data

            setName(name)
            setDescription(description)
            setCategory(category_name)
            setValue(value)
            setIngredients(ingredients)
            setImage(image)
        }

        fetchMeal()
    }, [])

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

                            <h2>Editar prato</h2>
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
                            <div className="editButton">
                                <button
                                    className="deleteButton"
                                    title="Excluir prato"
                                    onClick={handleDeleteMeal}
                                >
                                    Excluir prato
                                </button>
                                <Button
                                    className="saveButton"
                                    title="Salvar alterações"
                                    onClick={handleEditMeal}
                                />
                            </div>
                        </Form>
                    </Main>
            }

            <Footer />

        </Container>

    )
}