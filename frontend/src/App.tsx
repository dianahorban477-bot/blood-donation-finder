import type { FC } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app/router'

export const App: FC = () => <RouterProvider router={router} />