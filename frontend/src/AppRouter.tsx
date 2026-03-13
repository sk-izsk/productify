import React from "react"
import { Route, Routes, type RouteProps } from "react-router"
import {
  CreateProductScreen,
  EditProductScreen,
  HomeScreen,
  ProductScreen,
  ProfileScreen,
} from "./lazyComponents"

const routes: RouteProps[] = [
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
  },
  {
    path: "/create",
    element: <CreateProductScreen />,
  },
  {
    path: "/edit/:id",
    element: <EditProductScreen />,
  },
]

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  )
}
