import { useOthers, useSelf } from '@liveblocks/react/suspense';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const StackedAvatar = ({
  avatarUrl,
  name,
  zIndex,
}: {
  avatarUrl: string;
  name: string;
  zIndex: number;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger style={{ zIndex }}>
        <Avatar className='size-8 ring-2 ring-background'>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent side='bottom'>{name}</TooltipContent>
    </Tooltip>
  );
};

const AvatarsStack = () => {
  const others = useOthers();
  const currentUser = useSelf();

  if (others.length === 0) {
    return null;
  }

  return (
    <>
      <div className='flex items-center -space-x-2 isolate'>
        <StackedAvatar
          avatarUrl={currentUser.info.avatarUrl}
          name='You'
          zIndex={others.length}
        />
        {others.map(({ id, info }, index) => (
          <StackedAvatar
            key={id}
            avatarUrl={info.avatarUrl}
            name={info.name}
            zIndex={others.length - index - 1}
          />
        ))}
      </div>
      <Separator orientation='vertical' className='h-6' />
    </>
  );
};

export { AvatarsStack };
