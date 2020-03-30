import { Corridor } from "./corridor";
import { Utilities } from "./utilities";
import { Observable, Subject } from "rxjs";
import {Constants as constants} from "../energy-conservation-constants/energy-conservation-constants";

export class Floor {
  floorNumber: number;
  mainCorridors: Corridor[] = [];
  subCorridors: Corridor[] = [];
  timer: any;
  floorConsumption = new Subject();

  constructor(numberOfMainCorridors?: number, numberOfSubCorridors?: number) {
    this.mainCorridors = [];
    this.mainCorridors = this.createCorridor(numberOfMainCorridors);

    this.mainCorridors.forEach((val)=>{
      val.utilities.lightStatus = true;
    });

    this.subCorridors = [];
    this.subCorridors = this.createCorridor(numberOfSubCorridors);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.resetSubCorridorEnergyConsumption();
    }, constants.TIMER_CONSTANT);
  }

  resetSubCorridorEnergyConsumption() {
    console.log("RESET SUB CORRIDOR STATUS FOR:", this.floorNumber);
    this.subCorridors.forEach(corridor => {
      corridor.motionDetected = false;
      let utilities: Utilities = new Utilities();
      utilities.lightStatus = false;
      utilities.acStatus = true;
      corridor.utilities = { ...utilities };
    });
    this.floorConsumption.next(this.getFloorConsumption());
  }

  createCorridor(size: number) {
    let corridors = [];
    for (let i = 0; i < size; i++) {
      let corridor: Corridor = new Corridor();
      corridor.corridorNumber = i + 1;
      corridors.push(corridor);
    }
    return corridors;
  }

  updateMotionInCorridor(corridor: Corridor){
    this.subCorridors.forEach(val => {
      if (val.corridorNumber == corridor.corridorNumber) {
        val.motionDetected = true;
        val.utilities.acStatus = true;
        val.utilities.lightStatus = true;
        return;
      }
    });
  }

  verifyMaxConsumption() {
    if (this.getFloorConsumption() > this.getMaxConsumption()) {
      this.subCorridors.forEach(corridor => {
        if (corridor.motionDetected) {
          corridor.utilities.acStatus = true;
          corridor.utilities.lightStatus = true;
        } else {
          corridor.utilities.acStatus = false;
          corridor.utilities.lightStatus = false;
        }
      });
      
      this.masterCheckOnConsumption();
      this.floorConsumption.next(this.getFloorConsumption());
    }
  }

  masterCheckOnConsumption(){
    if (this.getFloorConsumption() > this.getMaxConsumption()) {
       this.subCorridors.forEach(corridor => {
        if (corridor.motionDetected) {
          corridor.utilities.acStatus = false;
          corridor.utilities.lightStatus = true;
        } 
      });
    }
  }

  getAcConsumption() {
    let acConsumption = 0;

    this.mainCorridors.forEach(corridor => {
      if (corridor.utilities.acStatus) {
        acConsumption++;
      }
    });

    this.subCorridors.forEach(corridor => {
      if (corridor.utilities.acStatus) {
        acConsumption++;
      }
    });

    return acConsumption * 10;
  }

  getLightsConsumption() {
    let lightsConsumption = 0;

    this.mainCorridors.forEach(corridor => {
      if (corridor.utilities.lightStatus) {
        lightsConsumption++;
      }
    });

    this.subCorridors.forEach(corridor => {
      if (corridor.utilities.lightStatus) {
        lightsConsumption++;
      }
    });

    return lightsConsumption * 5;
  }

  getFloorConsumption() {
    let acConsumption: number = this.getAcConsumption();
    let lightsConsumption: number = this.getLightsConsumption();
    return acConsumption + lightsConsumption;
  }

  getMaxConsumption() {
    return (
      this.getNumberOfMainCorridors() * 15 + this.getNumberOfSubCorridors() * 10
    );
  }

  getNumberOfMainCorridors() {
    return this.mainCorridors.length;
  }

  getNumberOfSubCorridors() {
    return this.subCorridors.length;
  }
}
