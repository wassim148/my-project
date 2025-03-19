interface Notification {
    id: number
    message: string
    timeAgo: string
    variant: 'danger' | 'normal' | 'success'
  }