import { useState, useEffect } from "react"
import { FiArrowLeft, FiEdit } from "react-icons/fi"
import { LuClock3 } from "react-icons/lu"
import { useParams, useNavigate } from "react-router-dom"

import { Container, Content, Title, Author, Tags } from "./styles"

import { api } from "../../services/api"
import { formatDateTime } from "../../services/formatDateTime"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { ButtonText } from "../../components/ButtonText"
import { Tag } from "../../components/Tag"
import { Rating } from "../../components/Rating"
import { Button } from "../../components/Button"

export function Details() {
    const [data, setData] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

    function handleEdit() {
        navigate(`/edit/${params.id}`)
    }

    async function handleRemove() {
        const confirm = window.confirm("Deseja realmente excluir o filme?")

        if (confirm) {
            await api.delete(`/api/movies/${params.id}`)
            handleBack()
        }
    }

    useEffect(() => {
        async function fetchMovie() {
            const response = await api.get(`/api/movies/${params.id}`)
            setData(response.data)
        }

        fetchMovie()
    }, [])

    return (
        <Container>
            <Header>
                <Input
                    placeholder="Pesquisar pelo título"
                    onClick={handleBack}
                />
            </Header>

            {
                data &&
                <Content>
                    <ButtonText
                        icon={FiArrowLeft}
                        title="Voltar"
                        onClick={handleBack}
                    />

                    <Title>
                        <div>
                            <h1>
                                {data.movie.title}
                            </h1>

                            <Rating rating={data.movie.rating} />
                        </div>
                    </Title>

                    <Author>
                        <img
                            src={data.userAvatar ? `${api.defaults.baseURL}/api/files/${data.userAvatar}` : avatarPlaceholder}
                            alt={data.userName}
                        />
                        <p>{data.userName}</p>
                        <LuClock3 />
                        <p>{formatDateTime(data.movie.createdAt)}</p>
                    </Author>

                    {
                        data.movie.tags &&
                        <Tags>
                            {
                                data.movie.tags.map(tag => (
                                    <Tag
                                        key={String(tag.id)}
                                        title={tag.name}
                                    />
                                ))
                            }
                        </Tags>
                    }

                    <p>
                        {data.movie.description}
                    </p>

                    <div className="buttons">
                        <Button
                            id="remove"
                            title="Excluir filme"
                            onClick={handleRemove}
                        />
                        <Button
                            id="edit"
                            title="Editar filme"
                            onClick={handleEdit}
                        />
                    </div>
                </Content>
            }

        </Container>
    )
}