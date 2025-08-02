import { Router } from "express"
import { UserRoutes } from "./user.route"
import { AuthRoutes } from "./auth.routes"
import { EventRoutes } from "./event.routes"
import { BlogRoutes } from "./blog.routes"


export const router = Router()
const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/event",
        route: EventRoutes
    },
    {
        path: "/blog",
        route: BlogRoutes
    },

]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})