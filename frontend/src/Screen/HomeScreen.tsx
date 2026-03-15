import { PackageIcon } from "lucide-react"
import React from "react"
import { Introduction } from "../components/home/Introduction"
import { NoProductPlaceholder } from "../components/home/NoProductPlaceholder"
import { ProductCard } from "../components/ProductCard"
import { useGetProducts } from "../hooks/web/useGetProducts"
import { Screen } from "./Screen"

const HomeScreen: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProducts()
  return (
    <Screen isLoading={isLoading} isError={isError}>
      <div className="space-y-10">
        <Introduction />

        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <PackageIcon className="size-5 text-primary" />
            All Products
          </h2>

          {products?.length === 0 ? (
            <NoProductPlaceholder />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((product) => (
                <ProductCard.Root
                  key={product.id}
                  to={`/product/${product.id}`}
                >
                  <ProductCard.Image
                    src={product.imageUrl}
                    alt={product.title}
                  />
                  <div className="card-body p-4">
                    <ProductCard.Title>{product.title}</ProductCard.Title>
                    <ProductCard.Body>{product.description}</ProductCard.Body>
                    <ProductCard.UserDetails
                      name={product.users?.name}
                      imageUrl={product.users?.imageUrl}
                    />
                  </div>
                </ProductCard.Root>
              ))}
            </div>
          )}
        </div>
      </div>
    </Screen>
  )
}

export default HomeScreen
