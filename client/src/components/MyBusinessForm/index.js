import React, { useState } from 'react';

import { useMutation, gql } from '@apollo/client';
import { CREATE_BUSINESS, UPLOAD_FILE } from '../../utils/mutations';
import { QUERY_BUSINESS, QUERY_ME } from '../../utils/queries';
import { Card, Badge, Button, Col, Container } from 'react-bootstrap';
import './MyBusinessForm.css'

const MyBusinessForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    links: '',
    phone: '',
    description: '',
    image: '',
    blackOwned: ' ',
    womenOwned: ' ',
    closing: ' ',
    momAndDad: ' ',

  });
  const [createBusiness, { error }] = useMutation(CREATE_BUSINESS)
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data)
  })
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(name,value)
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBusiness({
        variables: { business: { ...formState } },
      });
      // clear form value
      setFormState('');
    document.location.replace('/bpage')
    } catch (e) {
      console.error(e);
    }
  };
  const handleFileChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    const fileName = file.name
    setFormState({
      ...formState,
      ["image"]: fileName
    });
    if (!file) return
    uploadFile({ variables: { file } })
  }

  return (
<Container className='col-9 mobile-b-form'>
      <div className="mobile-business-from m-4 card border border-dark border-5 rounded " style={{width: ""}}>
          <div className="card-header ">       
                      <h3 className={`m-0 ${error ? "text-error" : ""}`}>
                     
                        Enter your business:
                        {error && (
                          <span className="ml-2">Something went wrong...</span>
                        )}
                      </h3>
                      </div>
                      <div className="cardbody">
                      <form
                        // className="flex-row justify-center justify-space-between-md align-stretch"
                        onSubmit={handleFormSubmit}
                      >
                         <div className="my-3 mx-3" >
                          <label htmlFor="title">Business Name </label>
                          <input
                            placeholder="e.g. Riverdale Kenshikai Karate"
                            name="title"
                            type="text"
                            id="text"
                            value={formState.title}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3 mx-3">  
                          <label htmlFor="location">Address </label>
                          <input
                            placeholder="e.g. 3607 Fieldston Road, New York, NY"
                            name="location"
                            type="text"
                            id="location"
                            value={formState.location}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="my-3 mx-3">
                          <label htmlFor="links">Website </label>
                          <input
                            placeholder="e.g. www.riverdalekenshikai.com"
                            name="links"
                            type="text"
                            id="text"
                            value={formState.links}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="my-3 mx-3">
                          <label htmlFor="phone">Phone number </label>
                          <input
                            placeholder="phone: 718-601-3607"
                            name="phone"
                            type="phone"
                            id="phone"
                            value={formState.phone}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        {/*  CHOSE BUSINESS TYPE  */}
                        <h4 className="mt-3"> Please select an option that applies to your business</h4> 
                       <div className="col-sm-3">
                         <label htmlFor="womenOwned">Women Owned</label>
                        <select
                          className="form-select "
                          name="womenOwned"
                          id="womenOwned"
                          onChange={handleChange}
                          value={formState.womenOwned}
                        >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                        </select>  
                      </div>

                      <div className="col-sm-3">
                        <label htmlFor="blackOwned">Black Owned	</label>
                        <select
                          className="form-select"
                          name="blackOwned"
                          id="blackOwned"
                          onChange={handleChange}
                          value={formState.blackOwned}
                        >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                        </select>
                      </div>
                      <div className="col-sm-3">
                      <label htmlFor="momAndDad">
                        Family Owned
                      </label>            
                        <select
                          className="form-select"
                          name="momAndDad"
                          id="momAndDad"
                          onChange={handleChange}
                          value={formState.momAndDad}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>
                      <div className="col-sm-3">
                      <label htmlFor="closing">
                        Closing Soon
                      </label>
                        <select
                          className="form-select"
                          name="closing"
                          id="closing"
                          onChange={handleChange}
                          value={formState.closing}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>
                    <div>
                      <h1>Upload A image</h1>
                      <input id='image'  type="file" onChange={handleFileChange}></input>
                    </div> 

                        {/*  BUSINESS DESCRIPTION */}
                        <div className=" row mb-3 mx-4 ">
                          <h4 className="mt-1"> Tell us about to your business</h4> 
                          <label htmlFor="description"> </label>
                          <textarea
                            placeholder="Tell us more about your business"
                            name="description"
                            type="text"
                            id="description"
                            value={formState.description}
                            className="form-control col-12 col-md-9"
                            onChange={handleChange}
                          />
                        </div>

                        <button className="btn btn-primary w-50" type="submit">
                          Submit
                        </button>
                    </form>
                  </div>
                      
    </div>
	</Container>
  ); 
};

export default MyBusinessForm;
