import { IconBase, type IconProps } from './IconBase'

export const DonationCalendarIcon = ({
  size = 24,
  ...rest
}: IconProps) => (
  <IconBase {...rest} size={size} viewBox='0 0 24 24'>
    <rect
      x='3'
      y='5'
      width='18'
      height='16'
      rx='2'
      stroke='currentColor'
      strokeWidth='1.8'
    />
    <path
      d='M8 3v4M16 3v4M3 10h18M12 12.5s-2.5 2.7-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1.8-2.5-4.5-2.5-4.5Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </IconBase>
)
