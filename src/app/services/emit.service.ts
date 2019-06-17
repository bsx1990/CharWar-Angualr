import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EmitService {
  public eventEmit: any = new EventEmitter();

  constructor() {}
}
