import { type ReactNode, type SVGProps, useId } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
  title?: string | null
  viewBox?: string
  children?: ReactNode
}

export const IconBase = ({
  size = 16,
  title = null,
  viewBox = '0 0 20 20',
  className,
  children,
  ...rest
}: IconProps) => {
  const id = useId()
  const titleId = title ? `icon-title-${id}` : undefined

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      {...rest}
    >
      {title && <title id={titleId}>{title}</title>}
      {children}
    </svg>
  )
}
