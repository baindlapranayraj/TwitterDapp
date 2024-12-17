import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css";
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router"
import {Home,Profile,Topics,Users} from "./components/index.ts"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/all-users",
        element:<Users/>
      },
      {
        path:"/topics",
        element:<Topics/>
      }
    ]
  }
])

const queryClinet = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClinet}>
     <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
