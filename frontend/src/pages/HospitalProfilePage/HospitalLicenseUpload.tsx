import cn from 'classnames'
import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { ApiClientError } from '../../api/client'
import { uploadHospitalLicenseRequest } from '../../api/hospitalProfileApi'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { DocumentIcon } from '../../components/IconsSVG/DocumentIcon'
import { ValidationMessage } from '../../components/ValidationMessage/ValidationMessage'
import { useAutoDismissMessage } from '../../hooks/useAutoDismissMessage'
import type { LicenseUploadResponse } from '../../types/api'
import styles from './HospitalLicenseUpload.module.scss'

const maxLicenseFileSize = 10 * 1024 * 1024
const allowedLicenseFileTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
])

type Props = {
  accessToken: string | null
  className?: string
  isProfileEditing: boolean
  licenseDocumentUrl: string | null
  onUploadSuccess: (response: LicenseUploadResponse) => void
}

function validateLicenseFile(file: File) {
  if (!allowedLicenseFileTypes.has(file.type)) {
    return 'Select a PDF, JPG, JPEG, or PNG file.'
  }

  if (file.size > maxLicenseFileSize) {
    return 'The license file must not exceed 10 MB.'
  }

  return ''
}

export const HospitalLicenseUpload = ({
  accessToken,
  className,
  isProfileEditing,
  licenseDocumentUrl,
  onUploadSuccess,
}: Props) => {
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [licenseError, setLicenseError] = useState('')
  const [successMessage, setSuccessMessage] = useAutoDismissMessage()
  const [isUploading, setIsUploading] = useState(false)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null

    setSuccessMessage('')

    if (!file) {
      setLicenseFile(null)
      setLicenseError('Select a license document.')
      return
    }

    const nextError = validateLicenseFile(file)

    if (nextError) {
      setLicenseFile(null)
      setLicenseError(nextError)
      event.target.value = ''
      return
    }

    setLicenseFile(file)
    setLicenseError('')
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isUploading || !accessToken) {
      return
    }

    if (!licenseFile) {
      setLicenseError('Select a license document.')
      return
    }

    const nextError = validateLicenseFile(licenseFile)

    if (nextError) {
      setLicenseError(nextError)
      return
    }

    const uploadForm = event.currentTarget
    setLicenseError('')
    setSuccessMessage('')
    setIsUploading(true)

    try {
      const response = await uploadHospitalLicenseRequest(
        licenseFile,
        accessToken,
      )

      onUploadSuccess(response)
      setSuccessMessage(
        'Your license was uploaded and is pending verification.',
      )
      setLicenseFile(null)
      uploadForm.reset()
    } catch (error) {
      setLicenseError(
        error instanceof ApiClientError
          ? error.message
          : 'We could not upload your license. Please try again.',
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section
      className={cn(styles.upload, className)}
      aria-labelledby='license-upload-title'
    >
      <div className={styles.upload__heading}>
        <div className={styles.upload__titleGroup}>
          <span className={styles.upload__icon} aria-hidden='true'>
            <DocumentIcon size={28} />
          </span>
          <div>
            <p className={styles.upload__eyebrow}>Verification document</p>
            <h2 className={styles.upload__title} id='license-upload-title'>
              Hospital license
            </h2>
          </div>
        </div>
        {licenseDocumentUrl && (
          <span className={styles.upload__badge}>Document uploaded</span>
        )}
      </div>

      <p className={styles.upload__description}>
        Upload one PDF, JPG, JPEG, or PNG file up to 10 MB. The document will be
        reviewed by an administrator.
      </p>

      {licenseDocumentUrl && (
        <p className={styles.upload__notice}>
          Uploading a new license will reset the verification status to pending.
        </p>
      )}

      {isProfileEditing ? (
        <p className={styles.upload__notice}>
          Save the hospital profile before uploading the license.
        </p>
      ) : (
        <form
          className={styles.upload__form}
          onSubmit={handleSubmit}
          aria-busy={isUploading}
          noValidate
        >
          <label className={styles.upload__label} htmlFor='hospital-license'>
            License document <span aria-hidden='true'>*</span>
          </label>
          <input
            accept='.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png'
            aria-describedby={
              licenseError
                ? 'hospital-license-hint hospital-license-error'
                : 'hospital-license-hint'
            }
            aria-invalid={Boolean(licenseError)}
            className={cn(styles.upload__input, {
              [styles['upload__input--error']]: Boolean(licenseError),
            })}
            id='hospital-license'
            name='license'
            onChange={handleFileChange}
            required
            type='file'
          />

          <p className={styles.upload__hint} id='hospital-license-hint'>
            Accepted formats: PDF, JPG, JPEG, PNG. Maximum size: 10 MB.
          </p>

          {licenseFile && (
            <p className={styles.upload__file}>
              Selected file: <strong>{licenseFile.name}</strong>
            </p>
          )}

          {licenseError && (
            <ValidationMessage
              id='hospital-license-error'
              message={licenseError}
            />
          )}

          {successMessage && (
            <FeedbackMessage message={successMessage} type='success' />
          )}

          {isUploading && (
            <progress
              className={styles.upload__progress}
              aria-label='License upload in progress'
            />
          )}

          <button
            className={styles.upload__submit}
            disabled={!licenseFile || isUploading}
            type='submit'
          >
            {isUploading
              ? 'Uploading license...'
              : licenseDocumentUrl
                ? 'Replace license'
                : 'Upload license'}
          </button>
        </form>
      )}
    </section>
  )
}
