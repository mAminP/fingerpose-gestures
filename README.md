# fingerpose-gestures

fingerpose-gestures is a library built on top of Fingerpose classifier for hand landmarks detected by TensorFlow.js' handpose model. It can detect hand gestures inside a webcam source picture.

## How it works

Gesture detection works in 3 steps:

1. Detect the hand landmarks inside the video picture
2. Estimating the direction and curl of each individual finger
3. Comparing the result to a set of gesture description

**Step (1) is performed by TensorFlow's "[handpose](https://www.npmjs.com/package/@tensorflow-models/handpose)",
 Step (2) and (3) are handled by [fingerpose](https://www.npmjs.com/package/fingerpose) library.**

## Installation

Install the module via NPM:

```sh
npm i --save fingerpose-gestures
```

## Usage

A [fully working example](https://github.com/mAminP/fingerpose-gestures/tree/main/demo) can be found inside the `demo` folder. The basic steps are outlined below:

### Include "handpose","fingerpose" and this library

```js
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import * as fp from "fingerpose";
import * as fpg from "fingerpose-gestures";

```

### Configure the gesture recognizer with known gestures

```js
const GE = new fp.GestureEstimator([
    
    // add "✌🏻" and "👍" as sample gestures
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture,
    
    // add other gestures by fingerpose-gestures 
    fpg.Gestures.thumbsDownGesture,
    fpg.Gestures.fingerSplayedGesture,
    fpg.Gestures.raisedHandGesture
    
    // ... and more
]);
```

### Use "handpose" to estimate the landmarks

```js
const model = await handpose.load();
const predictions = await model.estimateHands(video, true);
```

### Estimate the gestures

```js
// using a minimum confidence of 7.5 (out of 10)
const estimatedGestures = GE.estimate(predictions.landmarks, 7.5);
```

The result is an object containing possible gestures and their confidence, for example:

```json
{
    "poseData": [ ... ],
    "gestures": [
        { "name": "thumbs_up", "confidence": 9.25 },
        { ... }
    ]
}
```

## Gestures

| name           | emoji | path                               |
| --             | --    | --                                 |
| thumbs_down    | 👎    | `fpg.Gestures.thumbsDownGesture`   |
| finger_splayed | 🖐    | `fpg.Gestures.fingerSplayedGesture`|
| raised_hand    | ✋    | `fpg.Gestures.raisedHandGesture`   |
