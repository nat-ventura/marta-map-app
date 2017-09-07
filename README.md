# MARTA Map App

![MARTA guide from marta website](readme-materials/marta-station-line-map.jpg)

## Built With
* React.js
* ES6
* MARTA API

## Development Process
* [1. Concept](#1-concept)
* [2. Initial Planning](#2-initial-planning)

### 1. Concept

A live updating MARTA map where you can see trains coming and going at any selected station.

- Creating a bunch of empty divs with station names.
- Appending `TRAIN_ID`s to each `StationOnMap` div, so that you can see which trains are at each station in real time.

### 2. Initial Planning

[9-5-17]

- Create a BigMap component
- Within the BigMap component, let there be StationOnMap components
- StationOnMap components are divs associated with each station on the map
- I will initialize an empty array as the value for each key in `STATION_DICTIONARY`.
    - The reason for the empty array, is so that on refresh, all stations are empty-- not endlessly filled.
- Each StationOnMap component will be passed props. For each `trainObject` (the JSON object that I'll pull from the MARTA API), I will check the value of `trainObject.STATION`.
- I will then push `trainObject.TRAIN_ID` to the array at `STATION_DICTIONARY[trainObject.STATION]`.
- Then I need to figure out how to create a div of each `TRAIN_ID` within each `StationOnMap` component.
- Right now I am not passing `trainObject` as props to `StationOnMap` component because the `MartaDataGrabber` function is currenty located in the `componentWillMount()` method... And I think it should stay there? But I should double-check by reading the React docs.
- However I AM saving the `TRAIN_ID`s to the individual stations via appending to the array in the `STATION_DICTIONARY`... But now I'm wondering if I need to move the `STATION_DICT`'s initialization to the `WillMount()` method... Or somewhere where it will be refreshed at the interval. Hmm I think I will need to move that..
- But if I do make that move ^ then where do I put the divs or components for adding each `TRAIN_ID` to `StationOnMap`? In `WillMount()` or `render()`? I'm thinking render right..? If so, then how do I iterate through the list of `TRAIN_ID`s within each `STATION_DICT` key?
