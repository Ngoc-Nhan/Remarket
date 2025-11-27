// import { useSocket } from '@/components/context/SocketContext'
// import { QUERY_KEY } from '@/config/key'
// import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useNotificationListener() {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    const handleNotification = () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.getNotifications() })
    }

    socket.on('notification', handleNotification)

    return () => {
      socket.off('notification', handleNotification)
    }
  }, [socket, queryClient])
}
