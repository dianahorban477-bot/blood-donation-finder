import cn from 'classnames'
import { useState } from 'react'
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
  onApprove: (hospitalId: number) => Promise<boolean>
  onReject: (hospitalId: number, reason: string) => Promise<boolean>
  processingAction: 'approve' | 'reject' | null
}

const verificationStatusLabels = {
  pending: 'Pending verification',
  rejected: 'Rejected',
  verified: 'Approved',
}

const getLocationLabel = (application: HospitalApplicationSummary) => {
  if (!application.location) {
    return 'Not provided'
  }

  return [
    application.location.city,
    application.location.region,
    application.location.country,
  ].join(', ')
}

const getContactDetails = (application: HospitalApplicationSummary) => ({
  email: application.contact_info.contact_email || 'Not provided',
  phone: application.contact_info.phone_number || 'Not provided',
})

export const HospitalApplicationItem = ({
  actionError,
  application,
  isProcessing,
  onApprove,
  onReject,
  processingAction,
}: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const isPending = application.verification_status === 'pending'
  const hasLicenseDocument = Boolean(application.license_document_url)
  const contactDetails = getContactDetails(application)
  const locationLabel = getLocationLabel(application)
  const organizationTypeLabel = getHospitalOrganizationTypeLabel(
    application.organization_type ?? '',
    application.organization_type_other ?? '',
  ) || 'Not provided'

  return (
    <li className={styles.application}>
      <details
        className={styles.application__details}
        onToggle={(event) => setIsDetailsOpen(event.currentTarget.open)}
      >
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
            {application.verification_status === 'rejected' &&
              application.rejection_reason && (
                <ProfileDetail
                  className={styles.application__informationItem}
                  label='Rejection reason'
                  value={application.rejection_reason}
                />
              )}
          </dl>

          {isDetailsOpen && (
            <HospitalLicensePreview
              hasLicenseDocument={hasLicenseDocument}
              hospitalId={application.id}
              hospitalName={application.name}
            />
          )}

          {isPending && hasLicenseDocument && (
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
