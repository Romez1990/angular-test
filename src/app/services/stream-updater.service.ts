import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, delay, share } from "rxjs";
import { zip } from "../utils/functions";

@Injectable({
  providedIn: 'root'
})
export class StreamUpdaterService {
  public constructor(
    private http: HttpClient,
  ) {
    this.streams = new Array(this.streamsCount).fill(null)
      .map(_ => new Subject());
  }

  public readonly streams: ReadonlyArray<Subject<number>>;

  public updateStreams(): void {
    const newStreams = this.fetchStreams();
    zip(this.streams, newStreams)
      .forEach(([stream, newStream]) =>
        newStream.subscribe(newValue => stream.next(newValue))
      );
  }

  private readonly streamsCount = 3;
  private readonly interval = 130;

  private fetchStreams(): ReadonlyArray<Observable<number>> {
    const number$ = this.http.get<number>('https://www.random.org/integers/?num=1&min=100&max=1000&col=1&base=10&format=plain')
      .pipe(share());
    return new Array(this.streamsCount).fill(null)
      .map((_, i) => number$.pipe(delay(this.interval * i)));
  }
}
