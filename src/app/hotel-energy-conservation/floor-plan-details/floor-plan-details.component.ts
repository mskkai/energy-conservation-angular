import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Floor } from "../hotel-models/floor";
import { Constants as constants } from "../energy-conservation-constants/energy-conservation-constants";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-floor-plan-details",
  templateUrl: "./floor-plan-details.component.html",
  styleUrls: ["./floor-plan-details.component.css"],
  providers: [MessageService],
})
export class ConserveEnergyComponent implements OnInit {
  private noOfFloors: number = 2;
  private clonedFloor: { [s: number]: Floor } = {};
  private noOfMainCorridors: number = 1;
  private noOfSubCorridors: number = 1;

  @Input() floors: Floor[] = [];
  @Output() viewEnergyEvent = new EventEmitter();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    if (!this.floors || (this.floors && this.floors.length == 0)) {
      this.createFloors();
    }
  }

  createFloors() {
    this.floors = [];
    for (let i = 0; i < this.noOfFloors; i++) {
      let floor: Floor = new Floor(1, 2);
      floor.floorNumber = i + 1;
      this.floors.push(floor);
    }

    this.messageService.add({
      severity: constants.SEVERITY_SUCCESS,
      summary: "",
      detail: constants.FLOOR_SUCCESS_MSG,
    });
  }

  viewEnergyConsumption() {
    this.viewEnergyEvent.emit({ floors: this.floors });
  }

  onRowEditInit(floor: Floor) {
    this.noOfMainCorridors = floor.mainCorridors.length;
    this.noOfSubCorridors = floor.subCorridors.length;
    this.clonedFloor = { [floor.floorNumber]: floor };
  }

  onRowEditSave(floor: Floor) {
    if (this.noOfMainCorridors > 0 && this.noOfSubCorridors > 0) {
      let updatedFloor: Floor = new Floor(
        this.noOfMainCorridors,
        this.noOfSubCorridors
      );
      updatedFloor.floorNumber = floor.floorNumber;
      let floorCurrentIndex = this.floors.findIndex(
        (val) => val.floorNumber == floor.floorNumber
      );
      this.floors.splice(floorCurrentIndex, 1, updatedFloor);
      this.messageService.add({
        severity: constants.SEVERITY_SUCCESS,
        summary: "",
        detail: constants.FLOOR_PLAN_SUCCESS_MSG,
      });
    } else {
      this.messageService.add({
        severity: constants.SEVERITY_ERROR,
        summary: "",
        detail: constants.FLOOR_PLAN_ERROR_MSG,
      });
    }
  }

  onRowEditCancel(floor: Floor, index: number) {
    delete this.clonedFloor[floor.floorNumber];
  }
}
