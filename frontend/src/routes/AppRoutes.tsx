import { Route, Routes } from 'react-router'
import { PublicLayout } from '../layouts/PublicLayout/PublicLayout'
import { DonorRegistrationPage } from '../pages/DonorRegistrationPage/DonorRegistrationPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { HospitalRegistrationPage } from '../pages/HospitalRegistrationPage/HospitalRegistrationPage'
import { SignInPage } from '../pages/SignInPage/SignInPage'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path="register/donor" element={<DonorRegistrationPage />} />
      <Route path="register/hospital" element={<HospitalRegistrationPage />} />
      <Route path="sign-in" element={<SignInPage />} />
    </Route>
  </Routes>
)
