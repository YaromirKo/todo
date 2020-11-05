import { createWebHistory, createRouter } from "vue-router"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Index from "@/pages/index"

const routes = [
    {
        path: "/",
        name: "index",
        component: Index
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
