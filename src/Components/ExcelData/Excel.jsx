import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { writeBatch, collection, doc } from 'firebase/firestore';
import { db } from '../../config';
import './Excel.css';
import { useNavigate } from 'react-router-dom';

const Excel = () => {
  const [awb, setAwb] = useState('');
  const [firmName, setFirmName] = useState('');
  const [sborder, setSborder] = useState('');
  const [rtype, setRtype] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');

  //FUNCTION FOR SUBMITTING THE DATA
  const handleSubmit = async() => {
    try{
      const awbExistsQuery = query(collection(db, 'data'), where('awb', '==', awb));
    const awbExistsSnapshot = await getDocs(awbExistsQuery);

    if (!awbExistsSnapshot.empty) {
      console.log('AWB number already exists. Please enter a different one.');
      alert("AWB number already exists. Please enter a different one.")
      return;
    }
    const data = await addDoc(collection(db, 'data'), {
      awb: awb,
      firmname: firmName,
      suborder_id: sborder,
      returnType: rtype,
      sku: sku,
      category: category,
      qty: qty,
    });
    }
    catch(err){
      console.log(err)
    }
  }

  //FUNCTION FOR UPLOADING, PARSING AND READING EXCEL DATA
  const handleUpload = async (e) => {
    try{
    const uploadedFile = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Combine Excel data with existing form data
      const mergedData = [
        ...excelData,
        {
          awb: awb,
          firmname: firmName,
          suborder_id: sborder,
          returnType: rtype,
          sku: sku,
          category: category,
          qty: qty,
        },
      ];

      // Store merged data in Firebase using a batch write
      const batch = writeBatch(db);
      const dataRef = collection(db, 'data');

      mergedData.forEach((item) => {
        const newDocRef = doc(dataRef);
        batch.set(newDocRef, item);
      });

      await batch.commit();

      // Clear form fields
      setAwb('');
      setFirmName('');
      setSborder('');
      setRtype('');
      setSku('');
      setCategory('');
      setQty('');
    };

    fileReader.readAsArrayBuffer(uploadedFile);
    alert("data added successfully")
  }
  catch(err){
    alert(err)
  }
  };

  //FUNCTION FOR NAVIGATING
  const navigate = useNavigate()
  const backBtn = () => {
    navigate("/form")
  }  

  return (
    <div className='excel'>
      <h1>Upload Excel Data</h1>
      <input type='file' accept='.xlsx,.xls' onChange={handleUpload} />
      <button onClick={handleSubmit}>Upload File</button>
      <button onClick={backBtn}>Back</button>
    </div>
  );
};

export default Excel;
