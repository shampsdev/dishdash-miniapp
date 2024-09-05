export const Empty = () => {
  return (
    <div
      id="cardsWrapper"
      className="w-full flex items-center justify-center flex-col"
    >
      <div className="text-xl font-medium">Извините, здесь пока ничего нет</div>
      <div className="text-xs font-light text-nowrap">
        Перезайдите в приложение и измените параметры поиска
      </div>
    </div>
  );
};
