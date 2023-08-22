import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { api } from "../../services/api"
import { Container, Form } from "./styles"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

export function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("É necessário inserir os campos nome, email e senha")
        }

        if (password.length < 6) {
            return alert("É necessário inserir uma senha com pelo menos 6 caracteres")
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("Usuário cadastrado com sucesso")
                navigate("/")
            })
            .catch(error => {
                if (error.response) {
                    alert("Ocorreu um erro ao cadastrar o usuário")
                }
            })
    }

    return (
        <Container>
            <div>
                <svg width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.0318 0.216515L43.4349 12.0919V35.8426L22.0318 47.7179L0.628698 35.8426V12.0919L22.0318 0.216515Z" fill="#065E7C" />
                </svg>
                <h1>food explorer</h1>
            </div>

            <Form>
                <h2>Faça login</h2>

                <Input
                    title="Nome"
                    type="text"
                    label="nome"
                    placeholder="Exemplo: Maria da Silva"
                    required
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    title="Email"
                    type="email"
                    label="email"
                    placeholder="exemplo@exemplo.com.br"
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    title="Senha"
                    type="password"
                    label="password"
                    placeholder="No mínimo 6 caracteres"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Criar conta" onClick={handleSignUp} />

                <Link to="/"> Já tenho uma conta </Link>
            </Form>
        </Container>

    )
}