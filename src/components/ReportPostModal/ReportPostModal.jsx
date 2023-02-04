import { Modal, Radio  } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReportPost } from '../../actions/postAction';

import './ReportPostModal.css'

function ReportPostModal({reportPostModalOpen,setReportPostModalOpen,userId,postId}) {
    const [value, setValue] = useState(null)
    const dispatch = useDispatch()
    console.log(value,'report post modal');
    const reportThisPost=async()=>{
       const reportData = {
        reportedUser:userId,
        reason:value
       } 
       console.log(reportData,'reportpost model reporthispost function');
       setReportPostModalOpen(false)
       const response = await dispatch(ReportPost(reportData,postId)) 
    }
  return (
    <Modal 
    opened={reportPostModalOpen}
    centered={true}
    withCloseButton={false}
    onClose={() => setReportPostModalOpen(false)}
    >
    
  <fieldset 
     
    >
    <legend style={{color:"rgb(126, 228, 204)"}}>Please select the reason for reporting</legend>
    <div className="fieldsetStyle" onChange={(e)=>{
        console.log(e.target.value)
        setValue(e.target.value)
        console.log(value);
    }}>
        <div className='fieldsetStyleItems'>
      <input type="radio" id="contactChoice1" name="contact" value="inappropriate" />
      <label for="contactChoice1">inappropriate</label>
      </div>
        <div className='fieldsetStyleItems'>
      <input type="radio" id="contactChoice2" name="contact" value="violence" />
      <label for="contactChoice2">violence</label>
      </div>
        <div className='fieldsetStyleItems'>
      <input type="radio" id="contactChoice3" name="contact" value="other" />
      <label for="contactChoice3">other</label>
      </div>
    </div>
    <div style={{alignSelf:"flex-end"}}>
      <button onClick={reportThisPost} className="myButton" type="button">Submit</button>
    </div>
  </fieldset>


    </Modal>
  );
}

export default ReportPostModal;