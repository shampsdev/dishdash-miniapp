import { Button } from './button'
import { ChildrenNodeType } from '@/types/children-node.type'

export const ButtonIcon = ({ children, className, variant }: 
  { 
    children: ChildrenNodeType,
    className?: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
  }) => {
  return (
    <Button variant={ variant || "default" } className={`rounded-full ${className}`} size="icon">
      { children }
    </Button>
  )
}
