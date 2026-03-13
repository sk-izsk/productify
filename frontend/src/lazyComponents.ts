import { lazy } from "react"

const HomeScreen = lazy(() => import("./Screen/HomeScreen"))
const ProductScreen = lazy(() => import("./Screen/ProductScreen"))
const EditProductScreen = lazy(() => import("./Screen/EditProductScreen"))
const CreateProductScreen = lazy(() => import("./Screen/CreateProductScreen"))
const ProfileScreen = lazy(() => import("./Screen/ProfileScreen"))

export {
  CreateProductScreen,
  EditProductScreen,
  HomeScreen,
  ProductScreen,
  ProfileScreen,
}
