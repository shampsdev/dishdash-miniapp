import React from 'react'
import { SwipeCard } from './swipe.card'
import { Button } from '@/components/ui/button'
import HeartIcon from '@/assets/icons/heart.icon'
import { ButtonIcon } from '@/components/ui/button-icon'

export const SwipeSection = () => {
  return (
    <div className='grid h-screen place-items-center'>
      <SwipeCard/>
    </div>
  )
}
