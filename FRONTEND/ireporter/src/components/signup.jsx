import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./signup.css";



const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "gender":
        setGender(value);
        console.log("Selected gender:", value); // Debug statement
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      setSignupSuccessMessage("The passwords do not match.");
      return;
    }
  
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      setSignupSuccessMessage("Password must be at least 6 characters long.");
      return;
    }
  
    // Check if the email contains the '@' symbol
    if (!email.includes("@")) {
      setSignupSuccessMessage("Invalid email format. Please include the '@' symbol.");
      return;
    }

    try {
      // Create a data object with the user information
      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        password,
      };

      // Send the user data to the backend server
      const response = await fetch("https://ireporter-a0gp.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Handle the response from the server
      if (response.ok) {
        const responseData = await response.json();
        setSignupSuccessMessage('User data saved successfully');

        // Clear the form after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setGender("");
        setPassword("");
        setConfirmPassword("");

      // Redirect to the login page
      navigate('/login');  
      } else {
        // Handle server-side errors or other errors
        setSignupSuccessMessage('An error occurred. Please try again');
      }
    } catch (error) {
      // Handle fetch-related errors (e.g., network errors)
      setSignupSuccessMessage("Error submitting form:", error);
    }
  };

  return (
    <div className="form1">
    <h1 style={{color:'white', paddingTop:'30px'}}>Sign Up</h1>
    <form onSubmit={handleSubmit} className="signup"  >
      
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
      />
      <select name="gender" value={gender} onChange={handleChange}>
        <option value="default">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
      {signupSuccessMessage && <p style={{ color: 'green' }}>{signupSuccessMessage}</p>}
    </form>
    </div>
  );
};

export default Signup;
