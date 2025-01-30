import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WikiSearchResult, WikiSearch } from './wiki-types';
import { Observable, bufferCount, combineLatest, concatMap, from, map, of, reduce, switchMap } from 'rxjs';
import { getLanguage } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class WikiApiService {

  constructor(
    private http: HttpClient,
  ) { }

  searchAll(searches: string[], language = getLanguage(), chunkSize = 10, limit = 1): Observable<WikiSearchResult[][]> {
    return this.searchAllAlternatives(searches.map(s => [{search: s, language: language}]), chunkSize, limit);
  }

  searchAllAlternatives(searches: {search: string, language: string, check?: (p: WikiSearchResult[]) => any}[][], chunkSize = 10, limit = 1): Observable<WikiSearchResult[][]> {
    return from(searches).pipe(
      bufferCount(chunkSize),
      concatMap(chunk => combineLatest(chunk.map(v => this.searchAlternatives(v, limit)))),
      reduce((acc: WikiSearchResult[][], chunkResponse) => [...acc, ...chunkResponse], []),
    );
  }

  searchAlternatives(search: {search: string, language: string, check?: (p: WikiSearchResult[]) => any}[], limit = 1): Observable<WikiSearchResult[]> {
    // console.log(search.length, 'Searching', search[0].search);
    return this.searchPage(search[0].search, limit, search[0].language).pipe(switchMap(s => {
      if (s.pages.length > 0 && search[0].check && search[0].check([s.pages[0]])) return of(s.pages);
      if (s.pages.length > 0) return combineLatest(s.pages.filter(v => v.key).map(v => this.page(v.key!, search[0].language))).pipe(switchMap(r => {
        const result = s.pages.map((v, i) => ({...v, html: r[i]}));
        if (search.length > 1 && search[0].check && !search[0].check(result)) return this.searchAlternatives(search.slice(1), limit);
        return of(result);
      }));
      if (search.length > 1) return this.searchAlternatives(search.slice(1), limit);
      return of([]);
    }));
  }

  page(key: string, language = getLanguage()): Observable<string> {
    return this.http.get(`https://${language}.wikipedia.org/w/rest.php/v1/page/${encodeURIComponent(key)}/html`, { responseType: 'text', } );
  }

  searchPage(search: string, limit = 1,
    language = getLanguage(),
    // language = 'en',
  ): Observable<WikiSearch> {
    return this.http.get<WikiSearch>(`https://${language}.wikipedia.org/w/rest.php/v1/search/page`, {
      params: {
        q: search,
        limit: limit,
      }
    }); // dont ask me but the search works better with a space at the end
  }
}
