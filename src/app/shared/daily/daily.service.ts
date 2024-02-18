import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { generateSeed } from '../utils';
import Rand from 'rand-seed';

function getDayString(): string {
  const d = new Date();
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
    return null
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
    // https://docs.kraken.com/rest/#tag/Market-Data/operation/getTickerInformation
    const pair = 'XBTUSD'; // https://docs.kraken.com/rest/#tag/Market-Data/operation/getTradableAssetPairs
    type ResponseType = {result: {[k: string]: {o: string}}};
    return this.http.get<ResponseType>(`https://api.kraken.com/0/public/Ticker?pair=${pair}`).pipe(
      map(v => {
        const price = Number(Object.values(v.result)[0].o);
        const d = getDayString();
        const dailyValue = `${d} (${price})`;
        localStorage.setItem('daily_value', dailyValue);
        return generateSeed(undefined, new Rand(dailyValue));
      }),
    );
  }
}
