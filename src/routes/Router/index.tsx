import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import HomePage from "../../pages/Home";
import ProductsPage from "../../pages/Products";
import ReportPage from "../../pages/Reports";
import AdmPage from "../../pages/AdmPage";
import CreateProductPage from "../../components/CreateProduct";
import EditProductPage from "../../components/EditProduct";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />

        <Route path="produtos">
          <Route index element={<ProductsPage />} />
          <Route path="create" element={<CreateProductPage />} />
          <Route path=":id/edit" element={<EditProductPage />} />
        </Route>

        <Route path="relatorios" element={<ReportPage />} />
        <Route path="admin" element={<AdmPage />} />
      </Route>
    </Routes>
  );
}
