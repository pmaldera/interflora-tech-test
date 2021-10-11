import { Frames } from "../models/Frame";
import { CONFIG } from "../config/config";

interface IPointDataReceived {
    token: string,
    points: Frames | Array<Array<number>> | Array<any>
}

interface IPointDataSent {
    token: string,
    points: Array<number>
}

interface ISuccessResponse {
    succes: boolean
}

export async function getData():Promise<IPointDataReceived> {
    const response = await fetch(
        CONFIG.remoteAPIEndpoint, 
        {
            method: 'GET',
            mode: CONFIG.cors,
        }
    );
    if(response.ok) {
        return response.json();
    } else {
        throw Error(`Couldn't get data from remote API: ${response.status}:${response.statusText}`);
    }
}

export async function sendData(data: IPointDataSent):Promise<ISuccessResponse> {
    const response = await fetch(
        CONFIG.remoteAPIEndpoint, 
        {
            method: 'POST',
            mode: CONFIG.cors,
            body: JSON.stringify(data)
        }
    );
    if(response.ok) {
        return response.json();
    } else {
        throw Error(`Couldn't post data from remote API: ${response.status}:${response.statusText}`);
    }
}