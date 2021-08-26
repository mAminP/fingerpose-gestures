
//@ts-ignore
import fp from 'fingerpose'
import { IFingerPose,IGestureDescription } from '../types';
const { Finger, FingerCurl , FingerDirection, GestureDescription} = fp as IFingerPose


// describe oncoming fist gesture 👊
const Gesture = new GestureDescription('oncoming_fist') as IGestureDescription;

// thumb:
Gesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
Gesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, .40);

// index:
Gesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
Gesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, .40);


// Middle:

Gesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);

// Ring:
Gesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);



// Pinky:
Gesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);


export default Gesture;