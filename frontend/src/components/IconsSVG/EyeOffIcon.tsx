import { IconBase, type IconProps } from './IconBase'

export const EyeOffIcon = ({ size = 20, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox="0 0 24 24">
    <path
      d="m4 4 16 16M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.7 3.3M14.1 14.2a3 3 0 0 1-4.2-4.3M6.5 7.5A15.7 15.7 0 0 0 2.5 12s3.5 6 9.5 6a9.5 9.5 0 0 0 3-.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)
