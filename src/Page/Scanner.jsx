import React, { useState } from 'react'
import HTMLQRPlugin from "../Components/Scanner/HTMLQRPulgin"
import ResulPlugin from "../Components/Scanner/ResultPlugin"
const Scanner = () => {
  const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
    };


  return (
    <div>
      <h1>Scanner</h1>
      <section>
      <HTMLQRPlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
                <ResulPlugin results={decodedResults} />
      </section>
    </div>
  )
}

export default Scanner