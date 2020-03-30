import { Component } from '@angular/core';
import { Floor } from './hotel-energy-conservation/hotel-models/floor';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  showEnergyConsumption:boolean = false;
  showFloorPlanDetails:boolean = true;
  floors: Floor[] = [];

  onViewEnergyEvent(event){
    console.log(event, 'view energy');
    this.showEnergyConsumption = true;
    this.showFloorPlanDetails = false;
    this.floors =[...event.floors];
  }

  onViewFloorPlanEvent(event){
    console.log(event, 'view floor');
    this.showEnergyConsumption = false;
    this.showFloorPlanDetails = true;
     this.floors =[...event.floors];
  }
}
