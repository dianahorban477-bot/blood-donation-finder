import { useState } from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import { BloodRequestSummary } from '../../components/BloodRequestSummary/BloodRequestSummary'
import { BloodRequestsPageLayout } from '../../components/BloodRequestsPageLayout/BloodRequestsPageLayout'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { Pagination } from '../../components/Pagination/Pagination'
import { useHospitalBloodRequests } from '../../hooks/useHospitalBloodRequests'
import { usePagination } from '../../hooks/usePagination'
import { hospitalRequestPaths } from '../../routes/paths'
import styles from './HospitalBloodRequestsPage.module.scss'

type RequestFilter = 'active' | 'closed'

const filterOptions: Array<{ label: string; value: RequestFilter }> = [
  { label: 'Active', value: 'active' },
  { label: 'Closed', value: 'closed' },
]

const requestsPerPage = 6

export const HospitalBloodRequestsPage = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [activeFilter, setActiveFilter] = useState<RequestFilter>('active')
  const { errorMessage, isLoading, requests } = useHospitalBloodRequests({
    accessToken,
  })
  const visibleRequests = requests.filter((request) =>
    activeFilter === 'active'
      ? request.status === 'active'
      : request.status === 'completed' || request.status === 'cancelled',
  )
  const {
    page,
    paginatedItems: paginatedRequests,
    setPage,
    totalPages,
  } = usePagination(visibleRequests, requestsPerPage)
  const emptyMessage =
    activeFilter === 'active'
      ? 'No active blood requests.'
      : 'No closed blood requests.'

  const handleFilterChange = (filter: RequestFilter) => {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <BloodRequestsPageLayout
      description='Review active and closed blood requests created by your hospital.'
      eyebrow='Blood request management'
      headingAction={
        <Link
          className={styles.page__create}
          to={hospitalRequestPaths.create}
        >
          Create blood request
        </Link>
      }
      title='Hospital blood requests'
      titleId='hospital-requests-title'
    >

      <div className={styles.page__filters} aria-label='Request status filter'>
        {filterOptions.map((option) => (
          <button
            aria-pressed={activeFilter === option.value}
            className={styles.page__filter}
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            type='button'
          >
            {option.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingIndicator label='Loading blood requests...' />
      ) : errorMessage ? (
        <FeedbackMessage message={errorMessage} type='error' />
      ) : visibleRequests.length > 0 ? (
        <>
          <div className={styles.page__list}>
            {paginatedRequests.map((request) => (
              <BloodRequestSummary
                detailsPath={hospitalRequestPaths.details(request.id)}
                key={request.id}
                request={request}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            maxVisible={3}
          />
        </>
      ) : (
        <div className={styles.page__empty}>{emptyMessage}</div>
      )}

      <Link className={styles.page__back} to={hospitalRequestPaths.profile}>
        Back to hospital profile
      </Link>
    </BloodRequestsPageLayout>
  )
}
