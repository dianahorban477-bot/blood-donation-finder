import styles from './RequiredFieldsNote.module.scss'

export const RequiredFieldsNote = () => (
  <p className={styles.note}>
    Fields marked with <span className={styles.note__mark}>*</span> are required.
  </p>
)
