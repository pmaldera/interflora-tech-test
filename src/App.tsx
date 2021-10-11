import { useState } from 'react';
import { getData, sendData } from './services/pointsServices';
import { computePoints } from './utils/scoreUtil';
import './App.css';

function App() {
    // Quick and dirty ui.
    const [state, setState] = useState({
        status: 'Compute bowling game',
        computedFrames: [[3,7],[10,0],[8,2],[8,1],[10,0],[3,4],[7,0],[5,5],[3,2],[2,5]],
        computedResults: computePoints([[3,7],[10,0],[8,2],[8,1],[10,0],[3,4],[7,0],[5,5],[3,2],[2,5]])
    });

    const compute = async () => {
            setState({...state,status:'Computing...'});
        try {
            const data = await getData();
            setState({...state, computedFrames:data.points});
            const points = computePoints(data.points);
            setState({...state, computedResults:points});
            const result = await sendData(
                {
                    token: data.token,
                    points: points
                }
            );
            if(result.succes) {
                setState({...state,status:'✔️'});
            } else {
                setState({...state,status:'❌'});
            }
        } catch(e) {
            setState({...state,status:'❌'});
            alert(e);
        }
    }
    
    return (
        <div className="App">
            <button onClick={compute}>{state.status}</button>
            <pre>
                Received frames: {JSON.stringify(state.computedFrames)} <br/>
                Computed result : {JSON.stringify(state.computedResults)}
            </pre>
        </div>
    );
}

export default App;
