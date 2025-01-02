'use client';

import { useInboxNotifications } from '@liveblocks/react/suspense';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import { BellIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Inbox = () => {
  const { inboxNotifications: notifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative' size='icon'>
          {notifications.length > 0 && (
            <span className='absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center'>
              {notifications.length}
            </span>
          )}
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {notifications.length > 0 ? (
          <InboxNotificationList>
            {notifications.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
              />
            ))}
          </InboxNotificationList>
        ) : (
          <div className='p-2 w-[400px] text-center text-sm text-muted-foreground'>
            <span>No notifications</span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Inbox };
