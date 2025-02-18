import { FiArrowLeft } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { Container, Form } from "./styles"
import { api } from "../../services/api"

import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Button } from "../../components/Button"

export function Edit() {
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    function handleBack() {
        navigate("/")
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    function handleClear() {
        setTitle("")
        setRating("")
        setDescription("")
        setTags([])
        setNewTag("")
    }

    async function handleEditMovie() {
        const ratingIsNumber = Math.round(Number(rating))

        if (!title || !rating || !description) {
            return alert("Preencha todos os campos para atualizar o filme.")
        }

        if (ratingIsNumber < 1 || ratingIsNumber > 5 || isNaN(ratingIsNumber)) {
            return alert("Informe uma nota de 1 a 5.")
        }

        if (newTag) {
            return alert("Você inseriu um marcador mas não adicionou, clique em adicionar ou deixe o campo vazio.")
        }

        if (tags.length === 0) {
            return alert("Adicione um ou mais marcadores para o seu filme.")
        }
        try {
            await api.put(`/api/movies/${id}`, {
                title,
                description,
                rating,
                tags
            })

            alert("Filme editado com sucesso!")
            navigate("/")
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data

                if (errorData.errors) {
                    const messages = Object.values(errorData.errors)
                        .flat()
                        .join("\n")

                    alert(`${messages}`)
                } else {
                    alert(errorData.message || "Não foi possível editar o filme.")
                }
            } else {
                alert("Não foi possível editar o filme.")
            }
        }

    }

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await api.get(`/api/movies/${id}`)
                const { movie } = response.data

                setTitle(movie.title)
                setRating(movie.rating)
                setDescription(movie.description)
                setTags(movie.tags.map(tag => tag.name))
            } catch (error) {
                alert("Erro ao carregar os dados do filme.")
                console.error(error)
            }
        }

        fetchMovie()
    }, [id])

    return (
        <Container>
            <Header>
                <Input
                    placeholder="Pesquisar pelo título"
                    onClick={handleBack}
                />
            </Header>

            <main>
                <ButtonText
                    icon={FiArrowLeft}
                    title="Voltar"
                    onClick={handleBack}
                />

                <Form>
                    <header>
                        <h1>Editar filme</h1>
                    </header>

                    <div className="input">
                        <Input
                            placeholder="Título"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                        <Input
                            placeholder="Sua nota (de 1 a 5)"
                            onChange={e => setRating(e.target.value)}
                            value={rating}
                        />
                    </div>

                    <TextArea
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />

                    <h2>Marcadores</h2>

                    <div className="tags">
                        {
                            tags.map((tag, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                />
                            ))
                        }

                        <NoteItem
                            isNew
                            placeholder="Novo marcador"
                            onChange={e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}
                        />
                    </div>

                    <div className="buttons">
                        <Button
                            title="Limpar"
                            onClick={handleClear}
                        />
                        <Button
                            title="Salvar"
                            onClick={handleEditMovie}
                        />
                    </div>
                </Form>
            </main>

        </Container>
    )
}