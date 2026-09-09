import { Route, Routes } from 'react-router'
import { PublicLayout } from '../layouts/PublicLayout/PublicLayout'
import { AccessDeniedPage } from '../pages/AccessDeniedPage/AccessDeniedPage'
import { AdminProfilePage } from '../pages/AdminProfilePage/AdminProfilePage'
import { CreateBloodRequestPage } from '../pages/CreateBloodRequestPage/CreateBloodRequestPage'
import { ContactTeamPage } from '../pages/ContactTeamPage/ContactTeamPage'
import { DonorRegistrationPage } from '../pages/DonorRegistrationPage/DonorRegistrationPage'
import { DonorProfilePage } from '../pages/DonorProfilePage/DonorProfilePage'
import { DonorBloodRequestsPage } from '../pages/DonorBloodRequestsPage/DonorBloodRequestsPage'
import { DonorBloodRequestDetailsPage } from '../pages/DonorBloodRequestDetailsPage/DonorBloodRequestDetailsPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { HospitalBloodRequestsPage } from '../pages/HospitalBloodRequestsPage/HospitalBloodRequestsPage'
import { HospitalBloodRequestDetailsPage } from '../pages/HospitalBloodRequestDetailsPage/HospitalBloodRequestDetailsPage'
import { HospitalProfilePage } from '../pages/HospitalProfilePage/HospitalProfilePage'
import { HospitalRegistrationPage } from '../pages/HospitalRegistrationPage/HospitalRegistrationPage'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage/PrivacyPolicyPage'
import { SignInPage } from '../pages/SignInPage/SignInPage'
import { donorRequestPaths, hospitalRequestPaths } from './paths'
import { ProfileRedirect } from './ProfileRedirect'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path='register/donor' element={<DonorRegistrationPage />} />
      <Route path='register/hospital' element={<HospitalRegistrationPage />} />
      <Route path='privacy-policy' element={<PrivacyPolicyPage />} />
      <Route path='contact-team' element={<ContactTeamPage />} />
      <Route path='sign-in' element={<SignInPage />} />
      <Route path='access-denied' element={<AccessDeniedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='profile' element={<ProfileRedirect />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['donor']} />}>
        <Route path='donor/profile' element={<DonorProfilePage />} />
        <Route
          path={donorRequestPaths.list}
          element={<DonorBloodRequestsPage />}
        />
        <Route
          path={donorRequestPaths.detailsPattern}
          element={<DonorBloodRequestDetailsPage />}
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['hospital']} />}>
        <Route path='hospital/profile' element={<HospitalProfilePage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            allowedRoles={['hospital']}
            requireVerifiedHospital
          />
        }
      >
        <Route
          path={hospitalRequestPaths.list}
          element={<HospitalBloodRequestsPage />}
        />
        <Route
          path={hospitalRequestPaths.create}
          element={<CreateBloodRequestPage />}
        />
        <Route
          path={hospitalRequestPaths.detailsPattern}
          element={<HospitalBloodRequestDetailsPage />}
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path='admin/profile' element={<AdminProfilePage />} />
      </Route>
    </Route>
  </Routes>
)
