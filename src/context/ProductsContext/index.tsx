import React, { createContext, useContext, useState, useCallback } from "react";
import type { RawProduct } from "../../services/ProductService";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  applyCouponDiscount,
  applyPercentDiscount,
  removeDiscount,
} from "../../services/ProductService";

interface ProductsContextType {
  products: RawProduct[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  createProduct: (product: Partial<RawProduct>) => Promise<void>;
  updateProduct: (id: string, product: Partial<RawProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  restoreProduct: (id: string) => Promise<void>;
  applyCouponDiscount: (id: string, couponCode: string) => Promise<void>;
  applyPercentDiscount: (id: string, percent: number) => Promise<void>;
  removeDiscount: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<RawProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateProduct = async (product: Partial<RawProduct>) => {
    try {
      await createProduct(product);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  };

  const handleUpdateProduct = async (
    id: string,
    product: Partial<RawProduct>
  ) => {
    try {
      await updateProduct(id, product);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  };

  const handleRestoreProduct = async (id: string) => {
    try {
      await restoreProduct(id);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao restaurar produto:", error);
      throw error;
    }
  };

  const handleApplyCouponDiscount = async (id: string, couponCode: string) => {
    try {
      await applyCouponDiscount(id, couponCode);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao aplicar cupom:", error);
      throw error;
    }
  };

  const handleApplyPercentDiscount = async (id: string, percent: number) => {
    try {
      await applyPercentDiscount(id, percent);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao aplicar desconto percentual:", error);
      throw error;
    }
  };

  const handleRemoveDiscount = async (id: string) => {
    try {
      await removeDiscount(id);
      await refreshProducts();
    } catch (error) {
      console.error("Erro ao remover desconto:", error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        refreshProducts,
        createProduct: handleCreateProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
        restoreProduct: handleRestoreProduct,
        applyCouponDiscount: handleApplyCouponDiscount,
        applyPercentDiscount: handleApplyPercentDiscount,
        removeDiscount: handleRemoveDiscount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
