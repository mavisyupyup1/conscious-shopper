import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_BUSINESS } from '../../utils/mutations';
import { QUERY_BUSINESS, QUERY_ME } from '../../utils/queries';

const MyBusinessForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    location: '',
    links: '',
    phone: '',
    description: '',
    image: '',
    blackOwned: '',
    womenOwned: '',
    closing: '',
    momAndDad: '',

  });
  const [addBusiness, { error }] = useMutation(CREATE_BUSINESS, {
    update(cache, { data: { addBusiness } }) {
      try {
        // update thought array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { businesses } = cache.readQuery({ query: QUERY_BUSINESS });
        cache.writeQuery({
          query: QUERY_BUSINESS,
          data: { businesses: [addBusiness, ...businesses] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      // });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    const blackOwnedBusiness = document.getElementById('blackOwned').value
    console.log("Blackowned: ", blackOwnedBusiness)

    const womenOwnedBusiness = document.getElementById('womenOwned').value
    console.log("Womenowned: ", womenOwnedBusiness)
    
    const closingBusiness = document.getElementById('closing').value
    console.log("Closing: ", closingBusiness)
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBusiness({
        variables: { ...formState },
      });

      // clear form value
      setFormState('');

    } catch (e) {
      console.error(e);
    }
  };

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
        <label htmlFor="website">Website </label>
        <input
          placeholder="e.g. www.riverdalekenshikai.com"
          name="website"
          type="website"
          id="website"
          value={formState.links}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        />
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

        <label htmlFor="blackOwned">Is this a black owned business?</label>
        <div>
        <select className="form-input" name="blackOwned" id="blackOwned" onChange={handleChange} value={formState.blackOwned}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              </div>

              <label htmlFor="blackOwned">Is this a women owned business?</label>
        <div>
        <select className="form-input" name="womenOwned" id="womenOwned" onChange={handleChange} value={formState.womenOwned}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              </div>

              <label htmlFor="closing">Is this business on the verge of closing?</label>
        <div>
        <select className="form-input" name="closing" id="closing" onChange={handleChange} value={formState.closing}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              </div>

              <label htmlFor="momAndDad">Is this a Mom&Dad business?</label>
        <div>
        <select className="form-input" name="momAndDad" id="momAndDad" onChange={handleChange} value={formState.momAndDad}>
                <option value="true">Yes</option>
                <option value="false">No</option>
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