import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})

    async function SignIn({ email, password }) {

        try {
            const response = await api.post("/api/sessions", { email, password })
            const { user, token } = response.data

            localStorage.setItem("@rocketmovies:user", JSON.stringify(user))
            localStorage.setItem("@rocketmovies:token", token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({ user, token })
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data

                if (errorData.errors) {
                    const messages = Object.values(errorData.errors)
                        .flat()
                        .join("\n")

                    alert(`${messages}`)
                } else {
                    alert(errorData.message || "Não foi possível entrar.")
                }
            } else {
                alert("Não foi possível entrar.")
            }
        }
    }

    function SignOut() {
        localStorage.removeItem("@rocketmovies:token")
        localStorage.removeItem("@rocketmovies:user")

        setData({})
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            let updatedUser = { ...user }

            if (avatarFile) {
                const fileUploadForm = new FormData()
                fileUploadForm.append("AvatarFile", avatarFile)

                const avatarResponse = await api.patch("api/files", fileUploadForm)
                updatedUser.avatar = avatarResponse.data.avatar
            }

            const response = await api.put("/api/users", updatedUser)
            if (response.status === 200) {
                updatedUser = response.data.user
                localStorage.setItem("@rocketmovies:user", JSON.stringify(updatedUser))
                setData({ user: updatedUser, token: data.token })

                alert("Perfil atualizado com sucesso!")                
            } else {
                console.log("Erro inesperado na API:", response)
                alert("Erro ao atualizar o perfil. Tente novamente.")
            }

        }catch (error) {
            console.log("Erro no updateProfile:", error);
        
            if (error.response) {
                console.log("Erro da API:", error.response);
                const errorData = error.response.data;
        
                if (errorData.errors) {
                    const messages = Object.values(errorData.errors)
                        .flat()
                        .join("\n");
        
                    alert(`${messages}`);
                } else {
                    alert(errorData.message || "Não foi possível atualizar.");
                }
            } else {
                alert("Erro inesperado ao atualizar o perfil.");
            }
        }     
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketmovies:token")
        const user = localStorage.getItem("@rocketmovies:user")

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            SignIn,
            SignOut,
            updateProfile,
            user: data.user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
