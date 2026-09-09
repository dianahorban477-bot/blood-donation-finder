import type { ReactNode } from 'react'
import styles from './BloodRequestsPageLayout.module.scss'

type Props = {
  children: ReactNode
  description: string
  eyebrow: string
  headingAction?: ReactNode
  title: string
  titleId: string
}

export const BloodRequestsPageLayout = ({
  children,
  description,
  eyebrow,
  headingAction,
  title,
  titleId,
}: Props) => (
  <section className={styles.page} aria-labelledby={titleId}>
    <div className={styles.page__heading}>
      <div>
        <p className={styles.page__eyebrow}>{eyebrow}</p>
        <h1 className={styles.page__title} id={titleId}>
          {title}
        </h1>
        <p className={styles.page__description}>{description}</p>
      </div>

      {headingAction}
    </div>

    {children}
  </section>
)
