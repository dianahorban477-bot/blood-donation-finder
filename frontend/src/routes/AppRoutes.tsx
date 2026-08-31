import { Route, Routes } from 'react-router'
import { PublicLayout } from '../layouts/PublicLayout/PublicLayout'
import { AccessDeniedPage } from '../pages/AccessDeniedPage/AccessDeniedPage'
import { AdminProfilePage } from '../pages/AdminProfilePage/AdminProfilePage'
import { DonorRegistrationPage } from '../pages/DonorRegistrationPage/DonorRegistrationPage'
import { DonorProfilePage } from '../pages/DonorProfilePage/DonorProfilePage'
import { HomePage } from '../pages/HomePage/HomePage'
import { HospitalProfilePage } from '../pages/HospitalProfilePage/HospitalProfilePage'
import { HospitalRegistrationPage } from '../pages/HospitalRegistrationPage/HospitalRegistrationPage'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage/PrivacyPolicyPage'
import { SignInPage } from '../pages/SignInPage/SignInPage'
import { ProfileRedirect } from './ProfileRedirect'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path='register/donor' element={<DonorRegistrationPage />} />
      <Route path='register/hospital' element={<HospitalRegistrationPage />} />
      <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
      <Route path='sign-in' element={<SignInPage />} />
      <Route path='access-denied' element={<AccessDeniedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='profile' element={<ProfileRedirect />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['donor']} />}>
        <Route path='donor/profile' element={<DonorProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['hospital']} />}>
        <Route path='hospital/profile' element={<HospitalProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path='admin/profile' element={<AdminProfilePage />} />
      </Route>
    </Route>
  </Routes>
)
