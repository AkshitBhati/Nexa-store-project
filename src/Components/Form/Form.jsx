import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = ({ name }) => {
  // STATES FOR HANDLING THE INPUT VALUES
  const [awb, setAwb] = useState('');
  const [firmName, setFirmName] = useState('');
  const [sborder, setSborder] = useState('');
  const [rtype, setRtype] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');

  //FUNCTION FOR NAVIGATING
  const navigate = useNavigate()
  const excelNavigate = () => {
    navigate("/excel")
  }

  // FUNCTION FOR SUBMITTING THE VALUE
  const submitHandler = async () => {
    try {
       if(!awb || !firmName || !sborder || !rtype || !sku || !category || !qty ){
                alert("fill all feilds")
                return 
                }
      // Check if the AWB number already exists
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

      setAwb('');
      setFirmName('');
      setSborder('');
      setRtype('');
      setSku('');
      setCategory('');
      setQty('');
      console.log('Document with id ', data.id);

      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {
      name ? (<div className='form'>
      <label>AWB Number</label>
      <input type='number' onChange={(e) => setAwb(e.target.value)} value={awb}  />
      <label>Firm Name</label>
      <input type='text' onChange={(e) => setFirmName(e.target.value)} value={firmName} />
      <label>Suborder Id</label>
      <input type='number' onChange={(e) => setSborder(e.target.value)} value={sborder} />
      <label>Return Type</label>
      <input type='text' onChange={(e) => setRtype(e.target.value)} value={rtype} />
      <label>SKU</label>
      <input type='text' onChange={(e) => setSku(e.target.value)} value={sku} />
      <label>Category</label>
      <input type='text' onChange={(e) => setCategory(e.target.value)} value={category}  />
      <label>QTY</label>
      <input type='number' onChange={(e) => setQty(e.target.value)} value={qty}  />
      <button className='form__btn' onClick={submitHandler}>
        Submit
      </button>
      <h1>OR</h1>
      <button className='form__excel' onClick={excelNavigate}>ADD EXCEL DATA</button>
    </div>)  : (
      <h2 className='form__auth' >Not Authorised</h2>
    )  }
    
    </>
  );
};

export default Form;
