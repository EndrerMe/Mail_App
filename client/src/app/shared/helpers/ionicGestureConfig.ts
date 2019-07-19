// Vendors
import { Injectable } from "@angular/core";
import { HammerGestureConfig } from "@angular/platform-browser";

@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {

  overrides = {
    'press': { time: 800 }
  };

  buildHammer(element: HTMLElement) {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }
  }