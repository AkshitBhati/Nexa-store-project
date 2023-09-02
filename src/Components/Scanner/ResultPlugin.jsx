import React, { useState } from 'react';
import { collection,doc,getDoc,query,where } from "firebase/firestore"
import { db } from '../../config';
import "./QR.css"


function filterResults (results) {
    let filteredResults = [];
    for (var i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i - 1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

const ResultContainerTable = ({ data }) => {
    //USESTATE FOR MANAGING THE LOCAL STATE
    const [awbNum, setAwbNum] = useState([])

    const results = filterResults(data);

    //FUNCTION FOR DATA FROM AWB NUMBER
    const searchHandler = async(awb) => {

    }
    
    const inputSearchHandler = async() => {
      
    }
  
    return (
        <>
        <div>
            <input type="number"  onChange={(e) => setAwbNum(e.target.value)}/>
            <button onClick={inputSearchHandler}>Search</button>
        </div>
        <table className='Qrcode-result-table'>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Decoded Text</td>
                    <td>Format</td>
                </tr>
            </thead>
            <tbody>
                {
                    results.map((result, i) => {
                        console.log(result);
                        return (<tr key={i}>
                            <td>{i}</td>
                            <td>{result.decodedText}</td>
                            <td>{result.result.format.formatName}</td>
                            <td><button onClick={() => searchHandler(result.decodedText)}>Search</button></td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
</>
    );
};

const ResultContainerPlugin = (props) => {
    const results = filterResults(props.results);

    return (
        <div className='Result-container'>
            <div className='Result-header'>Scanned results ({results.length})</div>
            <div className='Result-section'>
                <ResultContainerTable data={results} />
            </div>
        </div>
    );
};

export default ResultContainerPlugin;