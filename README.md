# MARTA Map App

![MARTA guide from marta website](readme-materials/marta-station-line-map.jpg)

## Built With
* React.js
* ES6
* MARTA API

## Development Process
* [1. Concept](#1-concept)
* [2. Initial Planning](#2-initial-planning)
* [3. User Interface Development](#3-user-interface-development)

### 1. Concept

A live updating MARTA map where you can see trains coming and going at any selected station.

- Creating a bunch of empty divs with station names.
- Appending `TRAIN_ID`s to each `StationOnMap` div, so that you can see which trains are at each station in real time.

### 2. Initial Planning

[9-5-17]

- Create a BigMap component (just makes one big div).
- Within the BigMap component, let there be a StationOnMap component (which will spawn divs with the name of each MARTA station).
- I will initialize an empty array as the value for each key in `STATION_DICT`.
    - The reason for the empty array, is so that on refresh, all stations are empty-- not endlessly filled.

Accessing the API:

```
const getMartaData = () => {
    return axios.get(MARTA_URL)
        .then( (res) => {
            return res.data;
        })
    }
```

For each `trainObject` (the JSON object that I'll pull from the MARTA API), I will push `trainObject.TRAIN_ID` to the array at `STATION_DICTIONARY[trainObject.STATION]`:


```
componentWillMount() {
        this.intervalSetter = setInterval( () => {
            getMartaData().then((jsonData) => {
                jsonData.map((trainObject) => {
                    STATION_DICT[trainObject.STATION].push(trainObject.TRAIN_ID);
                });
                this.setState({
                    localTime: new Date()
                })
            }, 1000);
        });
    }
```

I need to figure out how to create a div of each `TRAIN_ID` within each `StationOnMap` component.

Right now I am not passing `trainObject` as props to the `StationOnMap` component because the `intervalSetter` and `getMartaData` function is currenty located in the `componentWillMount()` method... And I think it should stay there? But I should double-check by reading the React docs and clarifying component life-cycle a bit.

However I AM saving the `TRAIN_ID`s to the individual stations by appending to the array in the `STATION_DICT`... But now I'm wondering if I need to move the `STATION_DICT`'s initialization to the `WillMount()` method... Or somewhere where it will be refreshed at the interval, because right now it is defined as a const at the top of the `BigMap.js` file. Hmm I think I will need to move that..

But if I do make that move ^ then where do I put the divs or components for adding each `TRAIN_ID` to `StationOnMap`? In `WillMount()` or `render()`? I'm thinking render, but if so, then how do I iterate through the list of `TRAIN_ID`s within each `STATION_DICT` key?

This is what my render looks like right now... just iterating once through a static list of station names and putting them on the DOM...

```
    render() {
        return (
                <div>
                    {Object.keys(STATION_DICT).map( (station, idx) => {
                        return (
                            <div key={idx}>
                                <StationOnMap station={station} />
                            </div>
                        )
                    })}
                </div>
        )
    }
```

### 3. User Interface Development

[9-7-17]

- need to arrange stations by location on map
- filter `TRAIN_ID`s for uniques
- take the trains that come in and sort by 10 soonest via arrival time

[9-10-17]

- Right now there are too many requests to the API, which is causing 'insufficient resources' errors. I think only printing/identifying the 10 ten latest trains to come into any given station.
- I think I could try to make it so clicking each stationOnMap div reveals the trains currently in each station.
- I think it could also be helpful to print a countdown for when each station will be leaving to the DOM.
