import { useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"

import { Container, Content, Logo, Search, Logout } from "./styles"

import { HeaderButton } from "../../components/HeaderButton/"

import { useAuth } from "../../hooks/authContext"

export function Header({ search }) {
    const { user, signOut } = useAuth()

    const navigate = useNavigate()

    function handleGoToCreateMeal() {
        navigate("/create")
    }

    function handleWrapperSignOut() {
        signOut()
        navigate("/")
    }

    return (
        <Container>
            <Content>
                <Logo to="/">
                    <svg width="30" height="36" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C" />
                    </svg>

                    <h2>food explorer</h2>
                </Logo>

                <Search>
                    {<AiOutlineSearch size={20} />}
                    <input
                        placeholder="Busque por pratos ou ingredientes"
                        type="text"
                        onChange={e => search(e.target.value) }
                    />
                </Search>

                {
                    user.role == "admin"
                        ? <HeaderButton title="Novo prato" onClick={handleGoToCreateMeal} />
                        : <HeaderButton title="Pedidos (0)" />
                }

                <Logout onClick={handleWrapperSignOut}>
                    <FiLogOut />
                </Logout>

            </Content>

        </Container>
    )
}