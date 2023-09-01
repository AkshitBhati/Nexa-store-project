import React from 'react';
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
    const results = filterResults(data);

    //FUNCTION FOR SEARCHING THROUGHT THE AWB NUMBER
    const searchHandler = async(awbNumber) => {
        try{
            const querySearch = await db.collection("data").where("awbNumber", "=", awbNumber) 
            if(querySearch.empty){
                alert("AWB Number does not exists") 
            }
            else{
                querySearch.forEach((doc) => {
                    alert("Found document with AWB number:", doc.data())
                })
            }
        }
        catch(err){
            alert("Error searching AWB Number")
        }
    }

    
    return (
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
                        </tr>);
                    })
                }
            </tbody>
        </table>
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