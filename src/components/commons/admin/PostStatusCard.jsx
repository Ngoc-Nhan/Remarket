import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { postStatusToText } from '@/helper'
import { POST_STATUS_OPTIONS } from './constants.js'
import React from 'react'

// type IPostStatus =
//   | 'ALL'
//   | 'PENDING'
//   | 'PUBLISHED'
//   | 'EXPIRED'
//   | 'DELETED'
//   | string

// type Props = {
//   status: IPostStatus
//   onChange: (value: IPostStatus) => void
// }

export function PostStatusTabs({ status, onChange }) {
  return (
    <Tabs value={status} onValueChange={onChange} className='w-full'>
      <TabsList className='flex flex-wrap gap-2'>
        {POST_STATUS_OPTIONS.map((s) => (
          <TabsTrigger
            key={s}
            value={s}
            className='text-xs sm:text-sm px-4 py-2 rounded-full border shadow-sm cursor-pointer'
          >
            {postStatusToText(s)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
