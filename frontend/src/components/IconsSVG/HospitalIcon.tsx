import { IconBase, type IconProps } from './IconBase'

export const HospitalIcon = ({ size = 24, ...rest }: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <path
      d='M4 21V8h5V3h6v5h5v13M9 21v-4h6v4M12 5v4M10 7h4M7 11h2M7 14h2M15 11h2M15 14h2'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
