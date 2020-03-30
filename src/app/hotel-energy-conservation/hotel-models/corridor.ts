import { Utilities } from "./utilities";

export class Corridor {
  corridorNumber: number;
  motionDetected: boolean;
  utilities: Utilities;

  constructor() {
    this.motionDetected = false;
    this.utilities = new Utilities();
  }
}
