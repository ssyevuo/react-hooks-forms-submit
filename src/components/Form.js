import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Sylvia");
  const [lastName, setLastName] = useState("Woods");
  const [submittedData, setSubmittedData] = useState([]);
  //holds error messages
  const [errors, setErrors] = useState([]);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  //handle submit callback function to ensure the eventlistener works
  function handleSubmit(event) {
    //preventDefault helps prevent page refreshing which is its default
    event.preventDefault();
    //ensuring the first name is required
    if (firstName.length > 0) {
      //formData stores all the form values
      const formData = { firstName: firstName, lastName: lastName};
      const dataArray = [...submittedData, formData];
      setSubmittedData(dataArray);
      //handles sending data off from the form
      //props.sendFormDataSomewhere(formData);
      //clears the forms after submission through setting state
      setFirstName("");
      setLastName("")
    } else {
      setErrors(["First name is required!"]);
    }    
  }

  const listofSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.firstName} {data.lastName}
      </div>
    );
  });

  return (
    //onSubmit is an event listener that gives us a way to submit our form
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>

      {/*The error message*/}
      {errors.length > 0
        ? errors.map((error, index) => (
          <p key={index} style={{color: "red"}}>
            {error}
          </p>
        )) 
      : null}
      <h3>Submissions</h3>
      {listofSubmissions}
    </div>
  );
}

export default Form;
