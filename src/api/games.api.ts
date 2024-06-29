import { Game, Card } from "@/types/game.type";

export const games: Game[] = [
  {
    id: 1,
    cards: [
      // {
      //   title: "Булочная Ф. Вольчека",
      //   image: "./",
      //   tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
      //   description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
      // },
      // {
      //   title: "Булочная Ф. Вольчека",
      //   image: "./",
      //   tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
      //   description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
      // },
      // {
      //   title: "Булочная Ф. Вольчека",
      //   image: "./",
      //   tags: ["Кафе", "Кофейня", "Пекарня", "Кондитерская"],
      //   description: "Место, где можно насладиться свежей выпечкой и пирогами с различными начинками."
      // }
    ],
  },
];

export const getGames = async (): Promise<Game[]> => games;

export const getGame = async (gameId: number): Promise<Game> => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

export const getInitialGame = (gameId: number) => {
  return { id: gameId, cards: reversedCards(games[gameId].cards) };
};

const reversedCards = (cards: Card[]) => {
  return cards
    .map((item, i) => {
      return { ...item, id: i + 1 };
    })
    .reverse();
};