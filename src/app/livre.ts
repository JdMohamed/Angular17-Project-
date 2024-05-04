export interface auteur {
  nom: string;
  bio: string;
}
export interface categorie {
  nom:string;
}

export interface Livre {
    id: string;
    titre: string;
    auteurs: auteur[];
    categories: categorie[];
    isbn: string;
    synopsis: string;
  }

