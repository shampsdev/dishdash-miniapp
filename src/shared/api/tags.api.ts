import axios from 'axios';
import { Tag } from '../types/tag.type';

export const fetchTags = async (): Promise<Tag[] | undefined> => {
  return axios
    .get<Tag[]>(`https://dishdash.ru/api/v1/places/tags`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};
