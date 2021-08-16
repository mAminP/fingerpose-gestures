interface IGesture {
    name: string;
    confidence: number;
}

interface IGestureDescription {
    addCurl(finger: number, fingerCurl: number, confidence: number): void;
    addDirection(finger: number, fingerDirection: number, confidence: number): void;
}

declare const raisedHandGesture: IGestureDescription;

declare const fingerSplayedGesture: IGestureDescription;

declare const thumbsDownGesture: IGestureDescription;

declare const index$1_raisedHandGesture: typeof raisedHandGesture;
declare const index$1_fingerSplayedGesture: typeof fingerSplayedGesture;
declare const index$1_thumbsDownGesture: typeof thumbsDownGesture;
declare namespace index$1 {
  export {
    index$1_raisedHandGesture as raisedHandGesture,
    index$1_fingerSplayedGesture as fingerSplayedGesture,
    index$1_thumbsDownGesture as thumbsDownGesture,
  };
}

declare const bestMatch: (gestures: IGesture[]) => IGesture | null;

declare const index_bestMatch: typeof bestMatch;
declare namespace index {
  export {
    index_bestMatch as bestMatch,
  };
}

export { index$1 as Gestures, index as Utils };
