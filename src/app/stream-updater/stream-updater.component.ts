import { Component } from '@angular/core';
import { StreamUpdaterService } from "../services/stream-updater.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-stream-updater',
  templateUrl: './stream-updater.component.html',
  styleUrls: ['./stream-updater.component.scss']
})
export class StreamUpdaterComponent {
  public constructor(private streamUpdater: StreamUpdaterService) {
    this.streams = this.streamUpdater.streams;
    this.updateStreams();
  }

  public readonly streams: ReadonlyArray<Subject<number>>;

  public readonly ordinals: ReadonlyArray<string> = [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
  ];

  public updateStreams(): void {
    this.streamUpdater.updateStreams()
  }
}
