
//@ts-ignore
import fp from 'fingerpose'
import { IFingerPose,IGestureDescription } from '../types';
const { Finger, FingerCurl , FingerDirection, GestureDescription} = fp as IFingerPose


// describe pinching gesture 🤏
const Gesture = new GestureDescription('pinching') as IGestureDescription;

// thumb:
Gesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
Gesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, .5);
Gesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, .5);

// all other fingers:
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    Gesture.addCurl(finger, FingerCurl.HalfCurl, 1.0);
    Gesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, .25);
}

export default Gesture;