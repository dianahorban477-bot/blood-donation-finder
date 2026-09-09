import { IconBase, type IconProps } from './IconBase'

type Props = IconProps & {
  direction: 'left' | 'right'
}

export const ChevronIcon = ({ direction, size = 16, ...rest }: Props) => (
  <IconBase {...rest} size={size} viewBox='0 0 16 16'>
    <path
      d={direction === 'left' ? 'M10 3 5 8l5 5' : 'm6 3 5 5-5 5'}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
  </IconBase>
)
