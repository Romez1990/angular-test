import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, delay, share } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StreamUpdaterService {
  public constructor(
    private http: HttpClient,
  ) { }

  private readonly streamsCount = 3;
  private readonly interval = 130;

  public fetchStreams(): ReadonlyArray<Observable<number>> {
    const number$ = this.http.get<number>('https://www.random.org/integers/?num=1&min=100&max=1000&col=1&base=10&format=plain')
      .pipe(share());
    return new Array(this.streamsCount).fill(null)
      .map((_, i) => number$.pipe(delay(this.interval * i)));
  }
}
