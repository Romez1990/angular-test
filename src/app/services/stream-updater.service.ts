import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, Subscription, delay, share } from "rxjs";
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

  private readonly streamsCount = 3;
  public readonly streams: ReadonlyArray<Subject<number>>;

  private subscriptions: ReadonlyArray<Subscription> | null = null;

  public updateStreams(): void {
    if (this.subscriptions !== null) {
      this.subscriptions.forEach(newStream => newStream.unsubscribe())
    }
    const newStreams$ = this.fetchStreams();
    this.subscriptions = zip(this.streams, newStreams$)
      .map(([stream, newStream]) =>
        newStream.subscribe(newValue => stream.next(newValue))
      );
  }

  private readonly interval = 130;

  private fetchStreams(): ReadonlyArray<Observable<number>> {
    const number$ = this.http.get<number>('https://www.random.org/integers/?num=1&min=100&max=1000&col=1&base=10&format=plain')
      .pipe(share());
    return new Array(this.streamsCount).fill(null)
      .map((_, i) => number$.pipe(delay(this.interval * i)));
  }
}
