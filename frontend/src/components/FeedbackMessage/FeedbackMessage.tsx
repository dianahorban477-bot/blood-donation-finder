import cn from 'classnames'
import styles from './FeedbackMessage.module.scss'

type Props = {
  message: string
  title?: string
  type: 'error' | 'success'
}

export const FeedbackMessage = ({ message, title, type }: Props) => (
  <div
    className={cn(styles.message, styles[`message--${type}`])}
    role={type === 'error' ? 'alert' : 'status'}
  >
    {title && <strong className={styles.message__title}>{title}</strong>}
    <span className={styles.message__text}>{message}</span>
  </div>
)
