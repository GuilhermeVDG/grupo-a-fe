import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import HomePage from "../../pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
