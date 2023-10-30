import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../App/hooks'

export default function ProtectedRoutes(props: any) {
    const {isLoggedIn} = useAppSelector(state => state.login)
    if (isLoggedIn === true) {
        return props.children
    } else {
        return <Navigate to={'/login'}/>
    }
}
