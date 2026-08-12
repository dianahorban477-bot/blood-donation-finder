import cn from 'classnames'
import styles from './ValidationMessage.module.scss'

type Props = {
  className?: string
  id: string
  message: string
}

export const ValidationMessage = ({ className, id, message }: Props) => (
  <p className={cn(styles.validation, className)} id={id}>
    <span className={styles.validation__icon} aria-hidden="true">
      !
    </span>
    {message}
  </p>
)
