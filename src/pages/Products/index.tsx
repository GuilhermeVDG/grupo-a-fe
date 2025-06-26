import { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { ProductsTable } from "../../components/ProductsTable";
import { CreateProductBtn } from "../../components/CreateProductBtn";
import { DiscountModal } from "../../components/DiscountModal";
import type { RawProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

export function Products() {
  const {
    products,
    refreshProducts,
    deleteProduct,
    applyCouponDiscount,
    applyPercentDiscount,
    removeDiscount,
  } = useProducts();

  const [discountOpen, setDiscountOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<RawProduct | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const handleOpenDiscount = (p: RawProduct) => {
    setCurrentProduct(p);
    setDiscountOpen(true);
  };

  const handleCloseDiscount = () => {
    setCurrentProduct(null);
    setDiscountOpen(false);
  };

  const handleApplyCoupon = async (couponCode: string) => {
    if (!currentProduct) return;
    await applyCouponDiscount(currentProduct.id.toString(), couponCode);
    handleCloseDiscount();
  };

  const handleApplyPercent = async (percent: number) => {
    if (!currentProduct) return;
    await applyPercentDiscount(currentProduct.id.toString(), percent);
    handleCloseDiscount();
  };

  const handleRemoveDiscount = async () => {
    if (!currentProduct) return;
    await removeDiscount(currentProduct.id.toString());
    handleCloseDiscount();
  };

  const handleDelete = async (product: RawProduct) => {
    if (
      window.confirm(`Deseja realmente excluir o produto "${product.name}"?`)
    ) {
      try {
        await deleteProduct(product.id.toString());
      } catch (e) {
        alert("Erro ao excluir produto");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <CreateProductBtn onClick={() => navigate("/produtos/create")} />
      </div>

      <ProductsTable
        products={products}
        onDiscount={handleOpenDiscount}
        onDelete={handleDelete}
      />

      {currentProduct && (
        <DiscountModal
          open={discountOpen}
          onClose={handleCloseDiscount}
          onApplyCoupon={handleApplyCoupon}
          onApplyPercent={handleApplyPercent}
          onRemoveDiscount={handleRemoveDiscount}
          product={currentProduct}
        />
      )}
    </div>
  );
}

export default Products;
