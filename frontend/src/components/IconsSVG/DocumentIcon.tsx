import { IconBase, type IconProps } from './IconBase'

export const DocumentIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M6 3h8l4 4v14H6V3Zm8 0v5h5M9 12h6M9 16h6'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
