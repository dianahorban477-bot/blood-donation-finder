import cn from 'classnames'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { ValidationMessage } from '../ValidationMessage/ValidationMessage'
import styles from './ProfileField.module.scss'

type CommonProps = {
  error?: string
  id: string
  label: string
  name: string
  value: string
}

type ProfileFieldProps = CommonProps & {
  autoComplete?: string
  disabled?: boolean
  hint?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  required?: boolean
  type?: 'date' | 'email' | 'tel' | 'text'
}

type ProfileSelectFieldProps = CommonProps & {
  children: ReactNode
  onBlur: FocusEventHandler<HTMLSelectElement>
  onChange: ChangeEventHandler<HTMLSelectElement>
}

function getDescriptionIds(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(' ') || undefined
}

export const ProfileField = ({
  autoComplete,
  disabled = false,
  error,
  hint,
  id,
  inputMode,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  required = true,
  type = 'text',
  value,
}: ProfileFieldProps) => (
  <div className={styles.field}>
    <label className={styles.field__label} htmlFor={id}>
      {label}
      {required && (
        <span className={styles.field__required} aria-hidden='true'>
          {' '}*
        </span>
      )}
    </label>
    <input
      aria-describedby={getDescriptionIds(id, hint, error)}
      aria-invalid={Boolean(error)}
      autoComplete={autoComplete}
      className={cn(styles.field__control, {
        [styles['field__control--error']]: Boolean(error),
      })}
      disabled={disabled}
      id={id}
      inputMode={inputMode}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
    {hint && (
      <p className={styles.field__hint} id={`${id}-hint`}>
        {hint}
      </p>
    )}
    {error && (
      <ValidationMessage id={`${id}-error`} message={error} />
    )}
  </div>
)

export const ProfileSelectField = ({
  children,
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  value,
}: ProfileSelectFieldProps) => (
  <div className={styles.field}>
    <label className={styles.field__label} htmlFor={id}>
      {label}
      <span className={styles.field__required} aria-hidden='true'>
        {' '}*
      </span>
    </label>
    <select
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={Boolean(error)}
      className={cn(styles.field__control, {
        [styles['field__control--error']]: Boolean(error),
      })}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      required
      value={value}
    >
      {children}
    </select>
    {error && (
      <ValidationMessage id={`${id}-error`} message={error} />
    )}
  </div>
)
