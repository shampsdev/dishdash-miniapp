interface CarouselCardProps {
  primaryText: string;
  secondaryText: string;
  src: string;
  onClick: () => void;
}

export const CarouselCard = ({
  src,
  onClick,
  primaryText,
  secondaryText
}: CarouselCardProps) => {
  return (
    <div className="w-[90%] mx-auto select-none overflow-hidden rounded-xl ">
      <div className="aspect-[7/4] bg-white">
        <img
          src={src}
          alt=""
          className="h-full w-full pointer-events-none object-cover"
        />
      </div>
      <div className="aspect-[7/2] bg-secondary flex items-center p-4">
        <div>
          <h1 className="font-semibold text-[15px]">{primaryText}</h1>
          <p className="text-[13px]">{secondaryText}</p>
        </div>
        <div
          onClick={onClick}
          className="bg-primary active:opacity-90 cursor-pointer h-fit py-2 px-4 rounded-3xl ml-2"
        >
          <p className="font-medium text-white text-[15px]">Перейти</p>
        </div>
      </div>
    </div>
  );
};
