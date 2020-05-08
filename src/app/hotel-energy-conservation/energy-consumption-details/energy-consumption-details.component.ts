import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Floor } from "../hotel-models/floor";
import { Corridor } from "../hotel-models/corridor";
import { MessageService } from "primeng/api";
import { Constants as constants } from "../energy-conservation-constants/energy-conservation-constants";

@Component({
  selector: "app-energy-consumption-details",
  templateUrl: "./energy-consumption-details.component.html",
  styleUrls: ["./energy-consumption-details.component.css"],
  providers: [MessageService],
})
export class EnergyConsumptionDetailsComponent implements OnInit {
  @Input() floors: Floor[] = [];
  @Output() viewFloorPlanEvent = new EventEmitter();
  selectedFloor: Floor = new Floor();
  motions: any;
  private clonedCorridor: { [s: number]: Corridor } = {};
  MAX_LIMIT: number;
  selectedFloorConsumption: any;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    for (let i = 0; i < this.floors.length; i++) {
      this.floors[i].startTimer();
    }

    this.motions = [
      { label: "YES", value: true },
      { label: "NO", value: false },
    ];
  }

  viewFloorPlanDetails() {
    this.viewFloorPlanEvent.emit({ floors: this.floors });

    for (let i = 0; i < this.floors.length; i++) {
      clearInterval(this.floors[i].timer);
    }
  }

  getConsumptionDetails() {
    this.MAX_LIMIT = this.selectedFloor.getMaxConsumption();
    this.selectedFloorConsumption = this.selectedFloor.getFloorConsumption();

    this.selectedFloor.floorConsumption.subscribe((val) => {
      this.selectedFloorConsumption = val;
    });
  }

  onRowEditInit(corridor: Corridor) {
    this.clonedCorridor[corridor.corridorNumber] = { ...corridor };
  }

  onRowEditSave(corridor: Corridor) {
    this.selectedFloor.updateMotionInCorridor(corridor);
    this.selectedFloor.verifyMaxConsumption();
    this.getConsumptionDetails();

    clearInterval(this.selectedFloor.timer);
    this.selectedFloor.startTimer();

    this.messageService.add({
      severity: constants.SEVERITY_SUCCESS,
      summary: "",
      detail: constants.CORRIDOR_MOVEMENT_SUCCESS_MSG,
    });
  }

  onRowEditCancel(corridor: Corridor, index: number) {
    delete this.clonedCorridor[corridor.corridorNumber];
  }

  onCorridorMotion(event) {
    console.log(event);
  }
}
