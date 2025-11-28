import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { getDashboardStatsAPI } from '@/apis'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeListings: 0,
    newUsersThisWeek: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const data = await getDashboardStatsAPI()
        setStats(data)
      } catch (error) {
        toast.error('Không thể tải dữ liệu thống kê.')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      <h1 className='text-2xl font-bold mb-6'>Bảng điều khiển</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Tổng số người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>
              {isLoading ? '...' : stats.totalUsers.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tin đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>
              {isLoading ? '...' : stats.activeListings.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Người dùng mới trong tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>
              {isLoading ? '...' : stats.newUsersThisWeek.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
