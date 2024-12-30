import { ListIcon, ListOrderedIcon, LucideIcon } from 'lucide-react';

type ListType = 'bulletList' | 'orderedList';

type List = {
  label: string;
  type: ListType;
  icon: LucideIcon;
};

const lists: List[] = [
  {
    icon: ListIcon,
    label: 'Bullet List',
    type: 'bulletList',
  },
  {
    icon: ListOrderedIcon,
    label: 'Ordered List',
    type: 'orderedList',
  },
];

export type { ListType };
export { lists };
