import { Navigate, Outlet } from 'react-router-dom'
import type { PropsWithChildren } from 'react'
import { useAppSelector } from './redux/reduxHooks'

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children || <Outlet />
}
