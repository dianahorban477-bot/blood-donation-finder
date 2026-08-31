import { getApiResourceUrl } from '../../api/client'
import styles from './HospitalLicensePreview.module.scss'

type Props = {
  hospitalId: number
  hospitalName: string | null
  licenseDocumentUrl: string | null
}

export const HospitalLicensePreview = ({
  hospitalId,
  hospitalName,
  licenseDocumentUrl,
}: Props) => {
  const licenseUrl = licenseDocumentUrl
    ? getApiResourceUrl(licenseDocumentUrl)
    : ''
  const isImageLicense = /\.(jpe?g|png)(?:\?.*)?$/i.test(licenseUrl)
  const displayName = hospitalName || 'hospital'

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

      {licenseUrl ? (
        isImageLicense ? (
          <a
            className={styles.license__imageLink}
            href={licenseUrl}
            target='_blank'
            rel='noreferrer'
            aria-label={`Open the full-size license document for ${displayName}`}
          >
            <img
              className={styles.license__image}
              src={licenseUrl}
              alt={`License document for ${displayName}`}
              loading='lazy'
            />
          </a>
        ) : (
          <a
            className={styles.license__link}
            href={licenseUrl}
            target='_blank'
            rel='noreferrer'
          >
            Open license document
          </a>
        )
      ) : (
        <p className={styles.license__empty}>
          No license document uploaded.
        </p>
      )}
    </section>
  )
}
