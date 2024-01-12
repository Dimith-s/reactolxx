import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
function View() {
  console.log('view compoonet is workingg')
  const [userdetails,setUserdetails]=useState()
  const {postdetails} = useContext(PostContext)
  console.log(postdetails)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    
    const {userid}=postdetails
    firebase.firestore().collection('users').where('id','==',userid).get().then((res)=>{
      res.forEach(doc => {
        setUserdetails(doc.data())
        
      });
    })
  }, [])
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetails?.post} </p>
          <span>{postdetails?.name}</span>
          <p>{postdetails?.category}</p>
          <span>{postdetails?.createdAt}</span>
        </div>
        { userdetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userdetails.username}</p>
          <p>{userdetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
