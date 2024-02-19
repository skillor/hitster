import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { generateSeed } from '../utils';
import Rand from 'rand-seed';

function getDayString(d = new Date()): string {
  return `${d.getFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
}

function matchingDate(d1: Date, d2: Date): boolean {
  return d1.getUTCDate() == d2.getUTCDate() && d1.getUTCMonth() == d2.getUTCMonth() && d1.getUTCFullYear() == d2.getUTCFullYear();
}

@Injectable({
  providedIn: 'root'
})
export class DailyService {

  constructor(
    private http: HttpClient
  ) { }

  startedDaily(): void {
    localStorage.setItem('daily_played', '1');
  }

  getDailyValue(): string | null {
    const dailyValue = localStorage.getItem('daily_value');
    if (dailyValue && matchingDate(new Date(getDayString()), new Date(dailyValue))) return dailyValue;
    return null;
  }

  hasPlayedToday(): boolean {
    const dailyValue = this.getDailyValue();
    if (dailyValue && localStorage.getItem('daily_played') == '1') return true
    return false;
  }

  getDailySeed(): Observable<string> {
    const dailyValue = this.getDailyValue();
    if (dailyValue) return of(generateSeed(undefined, new Rand(dailyValue)));
    localStorage.setItem('daily_played', '0');

    const pair = 'XBTUSD'; // https://docs.kraken.com/rest/#tag/Market-Data/operation/getTradableAssetPairs
    type TickerResponseType = {result: {[k: string]: {o: string}}}; // https://docs.kraken.com/rest/#tag/Market-Data/operation/getTickerInformation
    return this.http.get<TickerResponseType>(`https://api.kraken.com/0/public/Ticker?pair=${pair}`, {observe: 'response'}).pipe(
      map((ticker) => {
        if (!ticker.body) throw new Error(`no body from "${ticker.url}"`);
        const lastModified = ticker.headers.get('last-modified');
        if (!lastModified) throw new Error(`no last modified from "${ticker.url}"`);
        const price = Number(Object.values(ticker.body.result)[0].o);
        const date = new Date(lastModified);
        if (isNaN(+date)) throw new Error(`invalid date ${date} from "${ticker.url}"`);
        if (!matchingDate(date, new Date())) throw new Error(`date ${date} not matching`);
        const dailyValue = `${getDayString(date)} (${price})`;
        const seed = generateSeed(undefined, new Rand(dailyValue));
        localStorage.setItem('daily_value', dailyValue);
        return seed;
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      }),
      retry({ count: 3, delay: 2000 }),
      catchError((err) => {
        console.error('could not get daily lucky number', err);
        return `${getDayString()} (error)`;
      }),
    );
  }
}
