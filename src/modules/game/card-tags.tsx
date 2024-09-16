export const CardTag = ({ children }: { children?: string }) => {
  return (
    <p className="px-4 py-2 text-sm rounded-3xl bg-background text-primary">
      {children}
    </p>
  );
};
