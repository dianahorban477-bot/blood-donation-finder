import { IconBase, type IconProps } from './IconBase'

export const EyeIcon = ({ size = 20, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox="0 0 24 24">
    <path
      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </IconBase>
)
