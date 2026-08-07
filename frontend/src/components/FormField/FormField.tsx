import cn from 'classnames'
import { type ChangeEventHandler, useState } from 'react'
import { EyeIcon } from '../IconsSVG/EyeIcon'
import { EyeOffIcon } from '../IconsSVG/EyeOffIcon'
import styles from './FormField.module.scss'

type Props = {
  autoComplete: string
  error?: string
  hint?: string
  id: string
  label: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type: 'email' | 'password'
  value: string
}

export const FormField = ({
  autoComplete,
  error,
  hint,
  id,
  label,
  name,
  onChange,
  type,
  value,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPasswordField = type === 'password'
  const hasError = Boolean(error)
  const inputType = isPasswordField && isPasswordVisible ? 'text' : type
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ') || undefined

  function handleVisibilityToggle() {
    setIsPasswordVisible((currentValue) => !currentValue)
  }

  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.field__control}>
        <input
          autoComplete={autoComplete}
          className={cn(styles.field__input, {
            [styles['field__input--withAction']]: isPasswordField,
            [styles['field__input--error']]: hasError,
          })}
          id={id}
          name={name}
          onChange={onChange}
          type={inputType}
          value={value}
          required
          aria-describedby={describedBy}
          aria-invalid={hasError}
        />
        {isPasswordField && (
          <button
            className={styles.field__visibility}
            onClick={handleVisibilityToggle}
            type="button"
            aria-controls={id}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {hint && (
        <p className={styles.field__hint} id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.field__error} id={errorId}>
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  )
}
