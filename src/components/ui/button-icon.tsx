import { Button, ButtonProps } from './button';

export const ButtonIcon = ({
  children,
  className,
  variant,
  onClick
}: ButtonProps) => {
  return (
    <Button
      variant={variant || 'default'}
      className={`rounded-full ${className}`}
      size="icon"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
