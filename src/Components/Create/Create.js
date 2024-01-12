import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [post,setPost] = useState('')
  const [img,setImg] = useState(null)
  const date = new Date()
  const handleSubmit =()=>{
    
    console.log(img)
    firebase.storage().ref(`/image/ ${img.name}`).put(img).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        firebase.firestore().collection('product').add({
          name,
          category,
          post,
          url,
          userid:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={post} id="fname" onChange={(e)=>setPost(e.target.value)} name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={img ? URL.createObjectURL(img):''}></img>
          {/* <form> */}
            <br />
            <input onChange={(e)=>
            setImg(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          {/* </form> */}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
