import { IconBase, type IconProps } from './IconBase'

export const RequestIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M7 3h10v3h3v15H4V6h3V3Zm0 3h10M8 11h8M8 15h5'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
