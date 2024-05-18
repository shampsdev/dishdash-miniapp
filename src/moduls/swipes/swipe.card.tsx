import HeartIcon from '@/assets/icons/heart.icon'
import { InfoIcon } from '@/assets/icons/info.icon'
import XMarkIcon from '@/assets/icons/x-mark.icon'
import { ButtonIcon } from '@/components/ui/button-icon'
import volchek from "@/assets/volcheck.jpg"
import SwipeTag from './swipe.tag'

const card = {
  title: "Булочная Ф. Вольчека",
  image: "./",
  tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
  description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
}

export const SwipeCard = () => {
  return (
    <div>
      <div>
        <div className='h-[420px] w-[360px] relative'>
          <img className='rounded-3xl' src={volchek}/>
          <div className='absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center'>
            <h3 className='py-2 px-4 rounded-3xl bg-white bg-opacity-80 backdrop-blur-sm'>{card.title}</h3>
            <ButtonIcon variant='outline' className='bg-white bg-opacity-80 backdrop-blur-sm h-10 w-10'>
              <InfoIcon/>
            </ButtonIcon>
          </div>
        </div>
        <div className='-translate-y-12 pt-4 h-52 w-[360px] rounded-3xl bg-white shadow-md'>
          <div className='mx-4 flex flex-wrap gap-2'>
            { card.tags.map((el, index) => <SwipeTag key={index}>{ el }</SwipeTag>) }
          </div>
          <p className='p-4'>{ card.description }</p>
        </div>
      </div>

      <div className='flex justify-center gap-x-12'>
        <ButtonIcon variant="secondary">
          <HeartIcon/>
        </ButtonIcon>

        <ButtonIcon>
          <XMarkIcon/>
        </ButtonIcon>
      </div>
    </div>
  )
}

