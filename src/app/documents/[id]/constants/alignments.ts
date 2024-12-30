import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  LucideIcon,
} from 'lucide-react';

type Alignment = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const alignemnts: Alignment[] = [
  {
    label: 'Align left',
    value: 'left',
    icon: AlignLeftIcon,
  },
  {
    label: 'Align center',
    value: 'center',
    icon: AlignCenterIcon,
  },
  {
    label: 'Align right',
    value: 'right',
    icon: AlignRightIcon,
  },
  {
    label: 'Align justify',
    value: 'justify',
    icon: AlignJustifyIcon,
  },
];

export { alignemnts };
