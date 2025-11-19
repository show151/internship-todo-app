import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(result => {
        setPermission(result);
        if (result === 'denied') {
          console.warn('通知がブロックされました。ブラウザ設定で許可してください。');
        }
      });
    }
  }, []);

  const sendNotification = (title: string, body: string) => {
    if (!('Notification' in window)) {
      console.warn('このブラウザは通知をサポートしていません');
      return;
    }

    if (Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/vite.svg' });
      } catch (error) {
        console.error('通知の送信に失敗しました:', error);
      }
    } else if (Notification.permission === 'denied') {
      console.warn('通知がブロックされています。ブラウザ設定で許可してください。');
    }
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  return { sendNotification, requestPermission, permission };
};
