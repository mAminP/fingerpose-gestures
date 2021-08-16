export interface IGestureDescription {
    // constructor(name: string){

    // }
    addCurl(finger: number, fingerCurl: number, confidence: number): void
    addDirection(finger: number, fingerDirection: number, confidence: number): void
}