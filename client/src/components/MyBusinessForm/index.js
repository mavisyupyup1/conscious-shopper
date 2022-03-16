import React, { useState } from 'react';

import { useMutation, gql } from '@apollo/client';
import { CREATE_BUSINESS, UPLOAD_FILE } from '../../utils/mutations';
import { QUERY_BUSINESS, QUERY_ME } from '../../utils/queries';

const MyBusinessForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    links: '',
    phone: '',
    description: '',
    image: '',
    blackOwned: false,
    womenOwned: false,
    closing: false,
    momAndDad: false,

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

    } catch (e) {
      console.error(e);
    }
  };
  const handleFileChange = e => {
    const file = e.target.files[0]
    console.log(file.name)
    if (!file) return
    uploadFile({ variables: { file } })
     
  }
  return (
    <div>

      <h1
        className={`m-0 ${error ? 'text-error' : ''}`}
      >
        Enter your business:
        {error && <span className="ml-2">Something went wrong...</span>}
      </h1>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Business Name </label>
          <input
            placeholder="e.g. Riverdale Kenshikai Karate"
            name="title"
            type="text"
            id="text"
            value={formState.title}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Address </label>
          <input
            placeholder="e.g. 3607 Fieldston Road, New York, NY"
            name="location"
            type="text"
            id="location"
            value={formState.location}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="links">Website </label>
          <input
            placeholder="e.g. www.riverdalekenshikai.com"
            name="links"
            type="text"
            id="text"
            value={formState.links}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone number </label>
          <input
            placeholder="phone: 718-601-3607"
            name="phone"
            type="phone"
            id="phone"
            value={formState.phone}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          />
        </div>
        <p>Upload A picture of your business</p>
        <input type="file" onChange={handleFileChange}></input>
        <div>
          <label htmlFor="blackOwned">Is this a black owned business?</label>
          <div>
            <select className="form-input" name="blackOwned" id="blackOwned" onChange={handleChange} value={formState.blackOwned}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <label htmlFor="blackOwned">Is this a women owned business?</label>
        <div>
          <select className="form-input" name="womenOwned" id="womenOwned" onChange={handleChange} value={formState.womenOwned}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <label htmlFor="closing">Is this business on the verge of closing?</label>
        <div>
          <select className="form-input" name="closing" id="closing" onChange={handleChange} value={formState.closing}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <label htmlFor="momAndDad">Is this a Mom&Dad business?</label>
        <div>
          <select className="form-input" name="momAndDad" id="momAndDad" onChange={handleChange} value={formState.momAndDad}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <label htmlFor="description">Description </label>
        <textarea
          placeholder="Tell us more about your business"
          name="description"
          type="text"
          id="description"
          value={formState.description}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        />


        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyBusinessForm;
