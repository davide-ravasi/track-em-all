import { Categories, Sections } from '../../typescript/types';
import { getApiUrl } from '../../utils';

export interface IFetchShowProps {
  id?: string;
  section: Sections;
  category: Categories;
  pageParam: number;
}

export const fetchShows = async ({
  pageParam,
  section,
  category,
  id,
}: IFetchShowProps) => {
  const url = getApiUrl(section, category, id, pageParam);
  const response = await fetch(url);

  if (!response.ok) throw new Error('Failed to fetch shows');

  return response.json();
};
