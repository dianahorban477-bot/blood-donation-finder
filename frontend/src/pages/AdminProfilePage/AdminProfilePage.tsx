import cn from 'classnames'
import { useState } from 'react'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { RefreshIcon } from '../../components/IconsSVG/RefreshIcon'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { useLogout } from '../../features/auth/useLogout'
import styles from './AdminProfilePage.module.scss'
import { HospitalApplicationItem } from './HospitalApplicationItem'
import { useAdminHospitalApplications } from './useAdminHospitalApplications'

type ApplicationTab = 'approved' | 'pending' | 'rejected'

const emptyMessages: Record<ApplicationTab, string> = {
  approved: 'No approved hospital applications.',
  pending: 'No pending hospital applications.',
  rejected: 'No rejected hospital applications.',
}

const applicationTabs: Array<{ id: ApplicationTab; label: string }> = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
]

export const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ApplicationTab>('pending')
  const { handleLogout, isLoggingOut } = useLogout()
  const {
    actionError,
    applications: applicationGroups,
    approveApplication,
    errorMessage,
    isLoading,
    processingAction,
    refreshApplications,
    rejectApplication,
    successMessage,
  } = useAdminHospitalApplications()
  const applications = applicationGroups[activeTab]
  const applicationCount = Object.values(applicationGroups).reduce(
    (total, group) => total + group.length,
    0,
  )

  return (
    <section className={styles.admin} aria-label='Administration'>
      <p className={styles.admin__eyebrow}>Administration</p>

      {successMessage && (
        <div className={styles.admin__message}>
          <FeedbackMessage message={successMessage} type='success' />
        </div>
      )}

      <section
        className={styles.admin__applications}
        aria-labelledby='hospital-applications-title'
      >
        <div className={styles.admin__heading}>
          <h2
            className={styles.admin__title}
            id='hospital-applications-title'
          >
            Hospital applications ({applicationCount})
          </h2>
          <button
            className={styles.admin__refresh}
            disabled={isLoading || processingAction !== null}
            onClick={() => void refreshApplications()}
            type='button'
            aria-label='Refresh hospital applications'
            title='Refresh hospital applications'
          >
            <RefreshIcon
              className={
                isLoading
                  ? styles['admin__refreshIcon--loading']
                  : undefined
              }
            />
          </button>
        </div>

        <div
          className={styles.admin__tabs}
          aria-label='Hospital application status'
        >
          {applicationTabs.map((tab) => (
            <button
              className={cn(styles.admin__tab, {
                [styles['admin__tab--active']]: activeTab === tab.id,
              })}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type='button'
              aria-pressed={activeTab === tab.id}
            >
              {tab.label} ({applicationGroups[tab.id].length})
            </button>
          ))}
        </div>

        <div
          className={styles.admin__content}
          aria-live='polite'
        >
          {isLoading ? (
            <LoadingIndicator label='Loading hospital applications...' />
          ) : errorMessage ? (
            <FeedbackMessage message={errorMessage} type='error' />
          ) : applications.length > 0 ? (
            <ul className={styles.admin__list}>
              {applications.map((application) => (
                <HospitalApplicationItem
                  actionError={
                    actionError?.hospitalId === application.id
                      ? actionError.message
                      : ''
                  }
                  application={application}
                  isProcessing={processingAction !== null}
                  key={application.id}
                  onApprove={approveApplication}
                  onReject={rejectApplication}
                  processingAction={
                    processingAction?.hospitalId === application.id
                      ? processingAction.type
                      : null
                  }
                />
              ))}
            </ul>
          ) : (
            <div className={styles.admin__empty}>
              <p>{emptyMessages[activeTab]}</p>
            </div>
          )}
        </div>
      </section>

      <div className={styles.admin__actions}>
        <button
          className={styles.admin__logout}
          disabled={isLoggingOut}
          onClick={handleLogout}
          type='button'
        >
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </section>
  )
}
