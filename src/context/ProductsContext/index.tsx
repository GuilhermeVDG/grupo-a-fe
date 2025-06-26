import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../pages/Products";
import {
  fetchProducts as fetchProductsAPI,
  type RawProduct,
} from "../../services/ProductService";

interface ProductsContextData {
  products: Product[];
  createProduct: (newProduct: Product) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextData | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const raw: RawProduct[] = await fetchProductsAPI();
        const mapped: Product[] = raw.map((r) => ({
          id: String(r.id),
          name: r.name,
          description: r.description,
          category: "",
          price: parseFloat(r.price),
          stock: r.stock,
          discountPct:
            r.discountType === "percent"
              ? Number(r.discount)
              : Math.round(
                  ((parseFloat(r.price) - r.discountPrice) /
                    parseFloat(r.price)) *
                    100
                ),
          discountedPrice: Number(r.discountPrice),
        }));
        setProducts(mapped);
      } catch (e) {
        console.error("Erro ao carregar produtos", e);
      }
    }
    load();
  }, []);

  const createProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
