import { useEffect, useState } from 'react'
import { fetchHospitalLicenseRequest } from '../../api/adminApi'
import { ApiClientError } from '../../api/client'
import { useAppSelector } from '../../app/hooks'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import styles from './HospitalLicensePreview.module.scss'

type Props = {
  hasLicenseDocument: boolean
  hospitalId: number
  hospitalName: string | null
}

export const HospitalLicensePreview = ({
  hasLicenseDocument,
  hospitalId,
  hospitalName,
}: Props) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [licenseObjectUrl, setLicenseObjectUrl] = useState('')
  const [isImageLicense, setIsImageLicense] = useState(false)
  const [isLoading, setIsLoading] = useState(
    hasLicenseDocument && Boolean(accessToken),
  )
  const [errorMessage, setErrorMessage] = useState('')
  const displayName = hospitalName || 'hospital'

  useEffect(() => {
    if (!hasLicenseDocument || !accessToken) {
      return
    }

    const controller = new AbortController()
    let objectUrl = ''
    let isCurrent = true

    fetchHospitalLicenseRequest(hospitalId, accessToken, controller.signal)
      .then((blob) => {
        if (!isCurrent) return

        objectUrl = URL.createObjectURL(blob)
        setIsImageLicense(blob.type.startsWith('image/'))
        setLicenseObjectUrl(objectUrl)
      })
      .catch((error: unknown) => {
        if (
          !isCurrent ||
          (error instanceof DOMException && error.name === 'AbortError')
        ) {
          return
        }

        setErrorMessage(
          error instanceof ApiClientError
            ? error.message
            : 'We could not load the license document. Please try again.',
        )
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
      controller.abort()
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [accessToken, hasLicenseDocument, hospitalId])

  return (
    <section
      className={styles.license}
      aria-labelledby={`license-title-${hospitalId}`}
    >
      <h4
        className={styles.license__title}
        id={`license-title-${hospitalId}`}
      >
        Verification document
      </h4>

      {!hasLicenseDocument ? (
        <p className={styles.license__empty}>
          No license document uploaded.
        </p>
      ) : !accessToken ? (
        <p className={styles.license__error} role='alert'>
          Your admin session is unavailable. Please sign in again.
        </p>
      ) : isLoading ? (
        <LoadingIndicator label='Loading license document...' />
      ) : errorMessage ? (
        <p className={styles.license__error} role='alert'>
          {errorMessage}
        </p>
      ) : licenseObjectUrl ? (
        isImageLicense ? (
          <a
            className={styles.license__imageLink}
            href={licenseObjectUrl}
            target='_blank'
            rel='noreferrer'
            aria-label={`Open the full-size license document for ${displayName}`}
          >
            <img
              className={styles.license__image}
              src={licenseObjectUrl}
              alt={`License document for ${displayName}`}
              loading='lazy'
            />
          </a>
        ) : (
          <a
            className={styles.license__link}
            href={licenseObjectUrl}
            target='_blank'
            rel='noreferrer'
          >
            Open license document
          </a>
        )
      ) : null}
    </section>
  )
}
