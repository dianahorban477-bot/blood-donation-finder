import cn from 'classnames'
import { ProfileDetail } from '../../components/ProfileDetail/ProfileDetail'
import type { HospitalApplicationSummary } from '../../types/api'
import { getHospitalOrganizationTypeLabel } from '../../utils/hospitalOrganization'
import styles from './HospitalApplicationItem.module.scss'
import { HospitalLicensePreview } from './HospitalLicensePreview'
import { HospitalVerificationActions } from './HospitalVerificationActions'

type Props = {
  actionError: string
  application: HospitalApplicationSummary
  isProcessing: boolean
  onApprove: (hospitalId: number) => void
  onReject: (hospitalId: number, reason: string) => void
  processingAction: 'approve' | 'reject' | null
}

const verificationStatusLabels = {
  pending: 'Pending verification',
  rejected: 'Rejected',
  verified: 'Approved',
}

const getLocationLabel = (application: HospitalApplicationSummary) => {
  if (!application.location) return 'Not provided'

  return [
    application.location.city,
    application.location.region,
    application.location.country,
  ].join(', ')
}

const getContactDetails = (application: HospitalApplicationSummary) => {
  if (!application.contact_info) {
    return { email: 'Not provided', phone: 'Not provided' }
  }

  if (typeof application.contact_info === 'string') {
    return { email: application.contact_info, phone: 'Not provided' }
  }

  return {
    email: application.contact_info.contact_email,
    phone: application.contact_info.phone_number,
  }
}

export const HospitalApplicationItem = ({
  actionError,
  application,
  isProcessing,
  onApprove,
  onReject,
  processingAction,
}: Props) => {
  const isPending = application.verification_status === 'pending'
  const contactDetails = getContactDetails(application)
  const locationLabel = getLocationLabel(application)
  const organizationTypeLabel = getHospitalOrganizationTypeLabel(
    application.organization_type ?? '',
    application.organization_type_other ?? '',
  ) || 'Not provided'

  return (
    <li className={styles.application}>
      <details className={styles.application__details}>
        <summary className={styles.application__summary}>
          <div>
            <h3 className={styles.application__name}>
              {application.name || 'Hospital name not provided'}
            </h3>
            <p className={styles.application__location}>
              {locationLabel}
            </p>
          </div>
          <span
            className={cn(styles.application__status, {
              [styles['application__status--rejected']]:
                application.verification_status === 'rejected',
              [styles['application__status--verified']]:
                application.verification_status === 'verified',
            })}
          >
            {verificationStatusLabels[application.verification_status]}
          </span>
        </summary>

        <div className={styles.application__content}>
          <dl className={styles.application__information}>
            <ProfileDetail
              className={styles.application__informationItem}
              label='Organization type'
              value={organizationTypeLabel}
            />
            <ProfileDetail
              className={styles.application__informationItem}
              label='Address'
              value={application.address || 'Not provided'}
            />
            <ProfileDetail
              className={styles.application__informationItem}
              label='Location'
              value={locationLabel}
            />
            <ProfileDetail
              className={styles.application__informationItem}
              label='Representative'
              value={application.representative_name || 'Not provided'}
            />
            <ProfileDetail
              className={styles.application__informationItem}
              label='Contact email'
              value={contactDetails.email}
            />
            <ProfileDetail
              className={styles.application__informationItem}
              label='Phone number'
              value={contactDetails.phone}
            />
          </dl>

          <HospitalLicensePreview
            hospitalId={application.id}
            hospitalName={application.name}
            licenseDocumentUrl={application.license_document_url}
          />

          {isPending && (
            <HospitalVerificationActions
              actionError={actionError}
              hospitalId={application.id}
              isProcessing={isProcessing}
              onApprove={onApprove}
              onReject={onReject}
              processingAction={processingAction}
            />
          )}
        </div>
      </details>
    </li>
  )
}
