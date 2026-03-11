// Service worker for handling dinner reminder notifications

// Handle periodic background sync for notifications
self.addEventListener('sync', event => {
  if (event.tag === 'dinner-reminder-sync') {
    event.waitUntil(showDinnerReminder());
  }
});

// Register periodic sync when service worker is activated
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      try {
        if ('periodicSync' in self.registration) {
          await self.registration.periodicSync.register('dinner-reminder-sync', {
            minInterval: 24 * 60 * 60 * 1000, // 24 hours
          });
        }
      } catch (error) {
        console.log('Periodic sync registration failed:', error);
        // Fall back to setTimeout
        setupNotificationTimeout();
      }
    })()
  );
});

function showDinnerReminder() {
  return self.registration.showNotification('Time to decide what\'s for dinner!', {
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'dinner-reminder',
    requireInteraction: false,
  });
}

function setupNotificationTimeout() {
  // Get the stored notification time from localStorage (if available)
  // Default to 16:00 (4 PM)
  const notificationTime = localStorage?.getItem('notificationTime') || '16:00';
  const [hours, minutes] = notificationTime.split(':').map(Number);
  
  function scheduleNextNotification() {
    const now = new Date();
    const nextNotification = new Date();
    nextNotification.setHours(hours, minutes, 0, 0);
    
    // If the time has already passed today, schedule for tomorrow
    if (nextNotification <= now) {
      nextNotification.setDate(nextNotification.getDate() + 1);
    }
    
    const timeUntilNotification = nextNotification.getTime() - now.getTime();
    
    setTimeout(() => {
      showDinnerReminder();
      // Reschedule for the next day
      scheduleNextNotification();
    }, timeUntilNotification);
  }
  
  scheduleNextNotification();
}

// Initial setup
setupNotificationTimeout();
