import { ChildrenNodeType } from '@/shared/types/children-node.type';
import { twMerge } from 'tailwind-merge';

interface HeroCardProps {
  children: ChildrenNodeType;
  className?: string;
}

export const HeroCard = (props: HeroCardProps) => {
  return (
    <div className={twMerge("rounded-3xl h-32 w-32", props.className)}>
      { props.children }
    </div>
  )
}
