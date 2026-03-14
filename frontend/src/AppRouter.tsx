import React from "react"
import { Navigate, Route, Routes, type RouteProps } from "react-router"
import { useAuthContext } from "./contexts/authContext"
import {
  CreateProductScreen,
  EditProductScreen,
  HomeScreen,
  ProductScreen,
  ProfileScreen,
} from "./lazyComponents"

const routes: (RouteProps & {
  isPrivate?: boolean
})[] = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/product/:id",
    element: <ProductScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
    isPrivate: true,
  },
  {
    path: "/create",
    element: <CreateProductScreen />,
    isPrivate: true,
  },
  {
    path: "/edit/:id",
    element: <EditProductScreen />,
    isPrivate: true,
  },
]

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuthContext()
  return (
    <Routes>
      {routes.map((route) => {
        const { isPrivate, element, ...routeProps } = route

        return (
          <Route
            key={route.path}
            {...routeProps}
            element={
              isPrivate && !isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                element
              )
            }
          />
        )
      })}
    </Routes>
  )
}
