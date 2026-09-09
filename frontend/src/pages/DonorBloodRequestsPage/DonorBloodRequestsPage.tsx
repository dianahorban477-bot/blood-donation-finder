import { type SubmitEvent, useState } from 'react'
import { Link } from 'react-router'
import type { DonorBloodRequestSearchFilters } from '../../api/bloodRequestsApi'
import { BloodRequestSummary } from '../../components/BloodRequestSummary/BloodRequestSummary'
import { BloodRequestsPageLayout } from '../../components/BloodRequestsPageLayout/BloodRequestsPageLayout'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { Pagination } from '../../components/Pagination/Pagination'
import { usePagination } from '../../hooks/usePagination'
import { donorRequestPaths } from '../../routes/paths'
import { useDonorBloodRequests } from './useDonorBloodRequests'
import styles from './DonorBloodRequestsPage.module.scss'

const emptyFilters: DonorBloodRequestSearchFilters = {
  country: '',
  region: '',
  city: '',
}

const locationFields = [
  { name: 'country', label: 'Country' },
  { name: 'region', label: 'Region' },
  { name: 'city', label: 'City' },
] as const

const requestsPerPage = 6

export const DonorBloodRequestsPage = () => {
  const [formValues, setFormValues] = useState(emptyFilters)
  const [filters, setFilters] = useState(emptyFilters)
  const { errorMessage, isLoading, requests } = useDonorBloodRequests(filters)
  const {
    page,
    paginatedItems: paginatedRequests,
    setPage,
    totalPages,
  } = usePagination(requests, requestsPerPage)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPage(1)
    setFilters({ ...formValues })
  }

  const handleClear = () => {
    setPage(1)
    setFormValues(emptyFilters)
    setFilters(emptyFilters)
  }

  return (
    <BloodRequestsPageLayout
      description='Browse active requests from hospitals and search by location.'
      eyebrow='Donation opportunities'
      title='Blood requests'
      titleId='donor-requests-title'
    >
      <form className={styles.page__search} onSubmit={handleSubmit}>
        <div className={styles.page__fields}>
          {locationFields.map(({ name, label }) => (
            <label className={styles.page__field} key={name}>
              <span>{label}</span>

              <input
                name={name}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    [name]: event.target.value,
                  }))
                }
                type='search'
                value={formValues[name]}
              />
            </label>
          ))}
        </div>

        <div className={styles.page__actions}>
          <button className={styles.page__submit} type='submit'>
            Search
          </button>
          <button
            className={styles.page__clear}
            onClick={handleClear}
            type='button'
          >
            Clear
          </button>
        </div>
      </form>

      {isLoading ? (
        <LoadingIndicator label='Loading blood requests...' />
      ) : errorMessage ? (
        <FeedbackMessage message={errorMessage} type='error' />
      ) : requests.length > 0 ? (
        <>
          <div className={styles.page__list}>
            {paginatedRequests.map((request) => (
              <BloodRequestSummary
                detailsPath={donorRequestPaths.details(request.id)}
                key={request.id}
                request={request}
                showHospitalDetails
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
        <div className={styles.page__empty}>
          <h2>No active blood requests available.</h2>
          <p>There are currently no donation requests to display.</p>
        </div>
      )}

      <Link className={styles.page__back} to={donorRequestPaths.profile}>
        Back to donor profile
      </Link>
    </BloodRequestsPageLayout>
  )
}
