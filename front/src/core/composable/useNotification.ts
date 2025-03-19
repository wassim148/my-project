import { useNotificationStore } from '@/core/stores/notification.store';
import { useToast } from '@/shared/components/ui/toast';

export function useNotification() {
  const toast = useToast();
  const notificationStore = useNotificationStore();

  return {
    success: (message: string) => {
      const id = Date.now();
      notificationStore.addNotification({ id, message, variant: 'success' });
      toast.success(message, { timeout: 5000 });
    },
    error: (message: string) => {
      const id = Date.now();
      notificationStore.addNotification({ id, message, variant: 'error' });
      toast.error(message, { timeout: 5000 });
    },
    info: (message: string) => {
      const id = Date.now();
      notificationStore.addNotification({ id, message, variant: 'info' });
      toast.info(message, { timeout: 5000 });
    },
    warning: (message: string) => {
      const id = Date.now();
      notificationStore.addNotification({ id, message, variant: 'warning' });
      toast.warning(message, { timeout: 5000 });
    }
  };
}
