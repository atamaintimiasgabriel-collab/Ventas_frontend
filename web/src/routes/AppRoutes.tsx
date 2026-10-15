import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProductsPage } from '../pages/ProductsPage';
import { InventoryPage } from '../pages/InventoryPage';
import { OrdersPage } from '../pages/OrdersPage';
import { SalesPage } from '../pages/SalesPage';
import { NotFoundPage } from '../pages/NotFoundPage';
export function AppRoutes() {
    return <Routes>
    <Route path="/login" element={<LoginPage />}/>
    <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>
    <Route index element={<Navigate to="/dashboard" replace/>}/>
    <Route path="dashboard" element={<DashboardPage />}/>
    <Route path="productos" element={<ProductsPage />}/>
    <Route path="inventario" element={<InventoryPage />}/>
    <Route path="pedidos" element={<OrdersPage />}/>
    <Route path="ventas" element={<SalesPage />}/>
    <Route path="*" element={<NotFoundPage />}/>
    </Route>
    </Route>
    </Routes>;
}
