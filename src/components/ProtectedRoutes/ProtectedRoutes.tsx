import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props: any) {
    if (localStorage.getItem("token")) {
        return props.children
    } else {
        return <Navigate to={'/login'}/>
    }
}
