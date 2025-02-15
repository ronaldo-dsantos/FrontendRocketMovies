import { Routes, Route, Navigate } from "react-router-dom"

import { New } from "../pages/New"
import { Home } from "../pages/Home"
import { Details } from "../pages/Details"
import { Edit } from "../pages/Edit"
import { Profile } from "../pages/Profile"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}