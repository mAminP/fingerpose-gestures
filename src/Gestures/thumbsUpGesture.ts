
//@ts-ignore
import fp from 'fingerpose'
import { IFingerPose,IGestureDescription } from '../types';
const { Finger, FingerCurl , FingerDirection, GestureDescription} = fp as IFingerPose


// describe thumbs up gesture 👍
const thumbsUpDescription = new GestureDescription('thumbs_up') as IGestureDescription;

// thumb:
// - not curled
// - vertical up (best) or diagonal up left / right
thumbsUpDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.25);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.25);

// all other fingers:
// - curled
// - horizontal left or right
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsUpDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  thumbsUpDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}

export default thumbsUpDescription;