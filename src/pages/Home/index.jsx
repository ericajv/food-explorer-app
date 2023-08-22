import { Container, Main } from "./styles"
import { useState, useEffect } from "react"

import { api } from "../../services/api"

import { Header } from "../../components/Header/"
import { Footer } from "../../components/Footer/"
import { Card } from "../../components/Card/"
import { Section } from "../../components/Section/"

import banner from "../../assets/banner.png"

export function Home() {
    const [meals, setMeals] = useState({})
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchMeals() {
            const response = await api.get(`/meals?search=${search}`)

            if (response.status == 401) {
                navigate("/login")
            }

            setMeals(response.data)
        }

        fetchMeals()
    }, [search])

    return (
        <Container>
            <Header search={setSearch} />

            <Main>
                <section className="Banner">
                    <img src={banner} alt="Macarrons" />

                    <div className="Banner-background">
                        <div>
                            <h2> Sabores inigualáveis </h2>
                            <span> Sinta o cuidado do preparo com ingredientes selecionados </span>
                        </div>
                    </div>
                </section>

                {
                    Object.keys(meals).map(category =>
                        <Section type={category} key={category}>
                            {meals[category].map(meal => <Card key={String(meal.id)} data={meal} />)}
                        </Section>
                    )
                }

            </Main>

            <Footer />
        </Container>
    )
}