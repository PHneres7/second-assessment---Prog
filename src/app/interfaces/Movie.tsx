export interface PrimaryImage {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  caption?: {
      __typename: string;
  };
  __typename?: string;
}

export interface TitleType {
  text?: string;
  id?: string;
  isSeries?: boolean;
  isEpisode?: boolean;
  categories?: {
      canHaveEpisodes?: boolean;
      __typename?: string;
  };
  __typename?: string;
}

export interface TitleText {
  text: string;
  __typename: string;
}

export interface ReleaseYear {
  year: number;
  endYear?: number | null;
  __typename: string;
}

export interface ReleaseDate {
  day: number;
  month: number;
  year: number;
  __typename: string;
}

export interface Movie {
  _id: string;
  id: string;
  primaryImage?: PrimaryImage;
  titleType?: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear?: ReleaseYear;
  releaseDate: ReleaseDate;
  directors?: string[];
  cast?: string[];
  plot?: string;
}