//@ts-ignore
import fb from 'fingerpose'
import { IFingerPose,IGestureDescription } from '../types/';
const { Finger, FingerCurl , FingerDirection, GestureDescription} = fb as IFingerPose

// describe fingerSplayed gesture 🖐
const fingerSplayedGesture = new GestureDescription('finger_splayed') as IGestureDescription;


for (let finger of [
    Finger.Thumb,
    Finger.Index,
    Finger.Middle,
    Finger.Ring,
    Finger.Pinky
]) {

    fingerSplayedGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Thumb
fingerSplayedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.70);
fingerSplayedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.70);

// Index
fingerSplayedGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);
fingerSplayedGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.9);

// Middle
fingerSplayedGesture.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.9);
fingerSplayedGesture.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 0.75);

// Ring
fingerSplayedGesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.9);
fingerSplayedGesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.75);

// Pinky
fingerSplayedGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);
fingerSplayedGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);



export default fingerSplayedGesture;
