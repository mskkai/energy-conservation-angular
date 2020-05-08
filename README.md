# energy-conservation

An simple UI app to demonstrate the automation the energy consumption of lights and ac in a multi storey building

This app when connected to installed Motion Sensors at appropriate places, acts as a Controller which takes inputs from these sensors and controls various power consumption of various equipments. Connection between motion sensors and the app can be controlled using IOT devices.

App takes input values for Floors, Main corridors, Sub corridors and takes different external inputs for motion in sub corridors. For each input, the program prints out the state of all the lights and ACs in the building. Controls the automatic power off of the equipments when no motions are deducted.

This simple UI app can be used at https://energyconservation.stackblitz.io

On technolgical stack, this app uses

- node
- angular
- prime-ng
- typescript

## Following are the assumption made for the application

The way in the multi storey building eg: hotels, equipments are organised and the requirements for the Controller are listed
below:

- A Hotel can have multiple floors
- Each floor can have multiple main corridors and sub corridors
- Both main corridor and sub corridor have one light each
- Both main and sub corridor lights consume 5 units of power when ON
- Both main and sub corridor have independently controllable ACs
- Both main and sub corridor ACs consume 10 units of power when ON
- All the lights in all the main corridors need to be switched ON between 6PM to 6AM,
  which is the Night Time slot
- By default, all ACs are switched ON, all the time
- When a motion is detected in one of the sub corridors the corresponding lights need to
  be switched ON between 6PM to 6AM (Night Time slot)
