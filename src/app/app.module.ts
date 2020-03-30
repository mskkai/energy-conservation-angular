import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ConserveEnergyComponent } from './hotel-energy-conservation/floor-plan-details/floor-plan-details.component';
import { EnergyConsumptionDetailsComponent } from './hotel-energy-conservation/energy-consumption-details/energy-consumption-details.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,InputTextModule, DropdownModule, ButtonModule,ToastModule, BrowserAnimationsModule,TableModule ],
  declarations: [ AppComponent, ConserveEnergyComponent, EnergyConsumptionDetailsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
