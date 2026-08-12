import styles from './LoadingIndicator.module.scss'

type Props = {
  label: string
}

export const LoadingIndicator = ({ label }: Props) => (
  <div className={styles.loading} role="status">
    <span className={styles.loading__spinner} aria-hidden="true" />
    <span>{label}</span>
  </div>
)
