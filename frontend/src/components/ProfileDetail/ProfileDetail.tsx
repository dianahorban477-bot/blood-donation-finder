import cn from 'classnames'
import type { ReactNode } from 'react'
import styles from './ProfileDetail.module.scss'

type Props = {
  icon?: ReactNode
  isSeparated?: boolean
  label: string
  secondaryValue?: string
  value: string
}

export const ProfileDetail = ({
  icon,
  isSeparated = false,
  label,
  secondaryValue,
  value,
}: Props) => (
  <div
    className={cn(styles.detail, {
      [styles['detail--with-icon']]: Boolean(icon),
      [styles['detail--separated']]: isSeparated,
    })}
  >
    {icon && (
      <span className={styles.detail__icon} aria-hidden='true'>
        {icon}
      </span>
    )}
    <div className={styles.detail__content}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {secondaryValue && (
        <dd className={styles.detail__secondary}>
          {secondaryValue}
        </dd>
      )}
    </div>
  </div>
)
