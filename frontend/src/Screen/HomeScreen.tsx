import { ChevronDownIcon, FilterIcon } from "lucide-react";
import React from "react";
import { Introduction } from "../components/home/Introduction";
import { NoProductPlaceholder } from "../components/home/NoProductPlaceholder";
import { ProductCard } from "../components/ProductCard";
import { usePagination } from "../hooks/usePagination";
import { useGetProducts } from "../hooks/web/useGetProducts";
import { Screen } from "./Screen";

const HomeScreen: React.FC = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts();

  const products = data?.pages.flat() || [];

  const loadMoreRef = usePagination({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <Screen isLoading={isLoading} isError={isError}>
      <div className="max-w-[1600px] mx-auto w-full">
        <Introduction />

        {/* Product Grid Header */}
        <section className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6 px-4 md:px-0">
          <div>
            <h2 className="text-4xl font-light text-blue-900 tracking-tighter mb-2">
              Curated Arrivals
            </h2>
            <p className="text-on-surface-variant font-light">
              Explore unique pieces from our global ateliers.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-low rounded-xl text-sm font-medium hover:bg-surface-container transition-colors">
              <FilterIcon className="size-5" />
              Filter
            </button>
            <div className="h-10 w-[1px] bg-outline-variant/30 self-center hidden sm:block"></div>
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-low rounded-xl text-sm font-medium hover:bg-surface-container transition-colors">
              Sort by: Featured
              <ChevronDownIcon className="size-5" />
            </button>
          </div>
        </section>

        {products.length === 0 ? (
          <NoProductPlaceholder />
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 px-4 md:px-0">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>

            {hasNextPage && (
              <div
                ref={loadMoreRef}
                className="py-20 flex flex-col items-center justify-center gap-4"
              >
                {isFetchingNextPage && (
                  <>
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-manrope text-xs uppercase tracking-widest text-on-surface-variant">
                      Discovering more pieces...
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Screen>
  );
};

export default HomeScreen;
