import { useState, useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { FilterBar } from "../../components/FilterBar";
import { SearchBar } from "../../components/SearchBar";
import { CreateProductBtn } from "../../components/CreateProductBtn";
import { ProductsTable } from "../../components/ProductsTable";
import { DiscountModal } from "../../components/DiscountModal";
import { useProducts } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  discountPct?: number;
  discountedPrice?: number;
};

export default function ProductsPage() {
  const { products, updateProduct, deleteProduct } = useProducts();

  const [filters, setFilters] = useState<{ min?: number; max?: number }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const handleOpenDiscount = (p: Product) => {
    setCurrentProduct(p);
    setDiscountOpen(true);
  };
  const handleCloseDiscount = () => {
    setDiscountOpen(false);
    setCurrentProduct(null);
  };
  const handleApplyDiscount = (_type: any, pct: number) => {
    if (!currentProduct) return;
    const discounted = Number(currentProduct.price * (1 - pct / 100));
    updateProduct({
      ...currentProduct,
      discountPct: pct,
      discountedPrice: discounted,
    });
    handleCloseDiscount();
  };

  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (filters.min == null || p.price >= filters.min) &&
            (filters.max == null || p.price <= filters.max)
        )
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [filters, searchTerm, products]
  );

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingBag size={32} strokeWidth={1.5} />
          <h1 className="text-3xl font-semibold">Produtos</h1>
        </div>

        <div className="flex items-center justify-between">
          <FilterBar
            onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
            onApply={() => {}}
          />
          <div className="flex items-center gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CreateProductBtn onClick={() => navigate("/produtos/create")} />
          </div>
        </div>

        <ProductsTable
          products={filtered}
          onDiscount={handleOpenDiscount}
          onDelete={(p) => deleteProduct(p.id)}
        />
      </div>

      <DiscountModal
        open={discountOpen}
        product={currentProduct}
        onClose={handleCloseDiscount}
        onApply={handleApplyDiscount}
      />
    </>
  );
}
