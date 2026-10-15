import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DemoSessionContext } from '../contexts/DemoSessionContext';
export function ProtectedRoute(){return useContext(DemoSessionContext).signedIn?<Outlet/>:<Navigate to="/login" replace/>;}
