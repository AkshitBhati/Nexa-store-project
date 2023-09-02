import React, { useState } from 'react'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config'
import { useNavigate } from 'react-router-dom'
import './Form.css'

const Form = ({ name }) => {
  //USESTATE VARIABLES
  const [awb, setAwb] = useState('')
  const [firmName, setFirmName] = useState('')
  const [sborder, setSborder] = useState('')
  const [rtype, setRtype] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [qty, setQty] = useState('')
  const [photo1, setPhoto1] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [video, setVideo] = useState(null)

  //FUNCTION FOR NAVIGATION
  const navigate = useNavigate()

  const excelNavigate = () => {
    navigate("/excel")
  }

  //FUNCTION FOR SUBMITTIN FORM DATA

  const submitHandler = async () => {
    try {
      if (!awb || !firmName || !sborder || !rtype || !sku || !category || !qty) {
        alert("Please fill in all fields.");
        return;
      }

      const awbExistsQuery = query(collection(db, 'data'), where('awb', '==', Number(awb)));
      const awbExistsSnapshot = await getDocs(awbExistsQuery);

      if (!awbExistsSnapshot.empty) {
        alert("AWB number already exists. Please enter a different one.");
        return;
      }

      const data = await addDoc(collection(db, 'data'), {
        date:new Date(),
        awb: Number(awb),
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

    } catch (err) {
      console.log(err);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

// ADDING PHOTOS AND VIDEOS HANDLERS

  const handlePhoto1Change = (event) => {
    const selectedPhoto = event.target.files[0]
    setPhoto1(selectedPhoto)
  }

  const handlePhoto2Change = (event) => {
    const selectedPhoto = event.target.files[0]
    setPhoto2(selectedPhoto)
  }

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0]
    setVideo(selectedVideo)
  }
  
  return (
    <>
    {
      name ? (<div className='form'>
      <label>AWBNumber</label>
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
      <label>Photo1</label>
      <input type='file' accept='image/*' onChange={handlePhoto1Change} />
      
      <label>Photo2</label>
      <input type='file' accept='image/*' onChange={handlePhoto2Change}  />
      
      <label>Video</label>
      <input type="file" accept="video/*" onChange={handleVideoChange}  />
      {video && (
        <video controls>
          <source src={URL.createObjectURL(video)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
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
