export interface WikiPageable {
  key: string | null,
  title: string | null,
}

export interface WikiSearchResult extends WikiPageable {
  excerpt: string | null,
  description: string | null,
  html?: string | null,
}

export interface WikiSearch {
  pages: WikiSearchResult[],
}
