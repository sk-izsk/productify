import { lazy } from "react"

const HomeScreen = lazy(() => import("./screen/HomeScreen"))
const ProductScreen = lazy(() => import("./screen/ProductScreen"))
const EditProductScreen = lazy(() => import("./screen/EditProductScreen"))
const CreateProductScreen = lazy(() => import("./screen/CreateProductScreen"))
const ProfileScreen = lazy(() => import("./screen/ProfileScreen"))

export {
  CreateProductScreen,
  EditProductScreen,
  HomeScreen,
  ProductScreen,
  ProfileScreen,
}
