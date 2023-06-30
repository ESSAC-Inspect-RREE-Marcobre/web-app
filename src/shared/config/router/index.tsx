import React from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import NotFound from '@/shared/ui/pages/NotFound'
import Home from '@/shared/ui/pages/Home'
import ErrorPage from '@/shared/ui/pages/ErrorPage'
import TermsAndConditions from '@/shared/ui/pages/TermsAndConditions'
import Redirect from '@/shared/ui/components/Layout/Redirect'
import RoutesView from '@/routes/ui/pages/RoutesView'
import RouteDetailView from '@/routes/ui/pages/RouteDetailView'
import CheckpointsView from '@/checkpoints/ui/pages/CheckpointsView'
import AdminRequired from '@/shared/ui/components/Layout/AdminRequired'
import UsersView from '@/users/ui/pages/UsersView'
import ReportTypesView from '@/reports/ui/pages/ReportTypesView'
import FieldsView from '@/fields/ui/pages/FieldsView'
import VehicleTypesView from '@/vehicles/ui/pages/VehicleTypesView'
import VehiclesView from '@/vehicles/ui/pages/VehiclesView'
import MaterialsView from '@/vehicles/ui/pages/MaterialsView'
import ProfileView from '@/profiles/ui/pages/ProfileView'
import Layout from '@/shared/ui/components/Layout/Layout'
import LoginView from '@/auth/ui/pages/LoginView'
import KeyRequired from '@/shared/ui/components/Layout/KeyRequired'

const authRequiredRoutes: RouteObject[] = [
  {
    index: true,
    path: '',
    element: <Redirect />
  },
  {
    path: 'inicio',
    element: <Home />
  },
  {
    path: 'recorridos',
    element: <RoutesView />
  },
  {
    path: 'detalle-recorrido',
    element: <RouteDetailView />
  },
  {
    path: 'detalle-checkpoints',
    element: <CheckpointsView />
  },
  {
    path: 'admin',
    element: <AdminRequired />,
    children: [
      {
        path: 'usuarios',
        element: <UsersView />
      },
      {
        path: 'reportes',
        element: <ReportTypesView />
      },
      {
        path: 'campos',
        element: <FieldsView />
      },
      {
        path: 'tipo-vehiculos',
        element: <VehicleTypesView />
      },
      {
        path: 'vehiculos',
        element: <VehiclesView areCarts={false} />
      },
      {
        path: 'carretas',
        element: <VehiclesView areCarts={true} />
      },
      {
        path: 'tipo-materiales',
        element: <MaterialsView />
      }
    ]
  },
  {
    path: 'perfil',
    element: <ProfileView />
  }
]

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView />
  },
  {
    path: 'vista-detalle-recorrido',
    element: <KeyRequired />,
    children: [
      {
        path: '',
        element: <RouteDetailView isPreviewPage={true}/>
      }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: authRequiredRoutes
  },
  {
    path: '/terminos-y-condiciones',
    element: <TermsAndConditions />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
