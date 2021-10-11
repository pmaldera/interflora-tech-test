import { Frames } from "../models/Frame";

export function computePoints(framesPoints: Frames) {
    let framesTotals:Array<number> = [];

    // It is way easier to work with an array of pinfall and not frames.
    // We obtain an array of numbers with each number being a pinfall
    const pinfalls = framesPoints.reduce((acc, value) => acc.concat(value), []);

    for (let pinIndex = 0; pinIndex < pinfalls.length; pinIndex+=2) {

        let scoreToAdd = 0;
        
        // In any case we add the previous total to the 2 pinfalls of this frame
        scoreToAdd = (framesTotals[(pinIndex-2)/2] ?? 0) + pinfalls[pinIndex] + pinfalls[pinIndex+1];

        if(pinfalls[pinIndex] + pinfalls[pinIndex+1] === 10) { // If the current frame is strike or spare ...
            if(pinfalls[pinIndex] === 10) { // If current frame is a strike ...
                scoreToAdd += pinfalls[pinIndex+2] ?? 0; // We add the next pinfall ...
                if(pinfalls[pinIndex+2] === 10) { // ... if this pinfall was a strike we had the next frame's first pinfall
                    scoreToAdd += pinfalls[pinIndex+4] ?? 0;
                } else { // ... if it isn't we add the next pinfall of the current frame.
                    scoreToAdd += pinfalls[pinIndex+3] ?? 0; 
                }
            } else { // If current frame is a spare ...
                scoreToAdd += pinfalls[pinIndex+2] ?? 0; // ... we add the next fram first pinfall .
            }
        }
        framesTotals[pinIndex/2] = scoreToAdd;
    }

    return framesTotals.slice(0,10);
}