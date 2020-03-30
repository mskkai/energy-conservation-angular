# energy-conservation
An simple UI app to demonstrate the automation the energy consumption of lights and ac in a multi storey building

This app when connected to installed Motion Sensors at appropriate places, acts as a Controller which takes inputs from these sensors and controls various power consumption of various equipments. Connection between motion sensors and the app can be controlled using IOT devices.

App takes input values for Floors, Main corridors, Sub corridors and takes different external inputs for motion in sub corridors. For each input, the program prints out the state of all the lights and ACs in the building. Controls the automatic power off of the equipments when no motions are deducted.

On technolgical stack, this app uses,
- node
- angular
- prime-ng
- typescript
