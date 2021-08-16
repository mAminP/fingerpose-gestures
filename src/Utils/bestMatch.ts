import { IGesture } from '../types';
const bestMatch =(gestures: IGesture[]): IGesture | null=>{
    if (gestures.length > 0) {

        const confidence = gestures.map((g) => g.confidence);
        const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
        return gestures[maxConfidence]
    } else{
        return null
    }
}

export {bestMatch} 