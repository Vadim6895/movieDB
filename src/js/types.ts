export interface Film {
  id: number;
  poster?: {
    previewUrl: string;
  };
  rating?: {
    kp: number;
  };
  name: string;
}

export interface PremiereFilm {
  id: number;
  name: string;
  year: number;
  ageRating?: number;
  movieLength: number;
  backdrop: {
    url: string;
  };
  rating: {
    imdb: number;
  };
  genres: { name: string }[];
}

export type PremieresFilms = {
  docs: PremiereFilm[];
};

export interface Category {
  profession: string;
  actor: {
    id: number;
    name: string;
    enName: string;
  };
}

export interface Persons {
  actors: {
    id: number;
    name: string;
    enName: string;
  }[];
  otherPersons: {
    category: {
      profession: string;
      actor: {
        id: number;
        name: string;
        enName: string;
      };
    };
  }[];
}

export interface Person {
  id: number;
  name: string;
  enName: string;
  photo: string;
  enProfession: string;
  profession: string;
}

export type dynamicPersonObject = {
  [key: string | number | symbol]: Person[];
};

export type dynamicKeysObject = {
  [key: string | number | symbol]: unknown;
};

export interface Trailer {
  [key: string]: string;
}

export type Option = { title?: string; name: string; id: string };

export interface playerObj {
  iframeUrl: string;
  source: string;
}
