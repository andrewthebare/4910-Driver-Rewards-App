import React from 'react';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { Link, withRouter } from "react-router-dom";

export default function Login(){
   const onFormSubmit = ()=>{

  }

  function polynomialRollingHash(str)
  {

      // P and M
      let p = 31;
      let m = (1e9 + 9);
      let power_of_p = 1;
      let hash_val = 0;

      // Loop to calculate the hash value
      // by iterating over the elements of String
      for(let i = 0; i < str.length; i++)
      {
          hash_val = (hash_val + (str[i].charCodeAt() -
                      'a'.charCodeAt() + 1) * power_of_p) % m;
          power_of_p = (power_of_p * p) % m;
      }
      return hash_val;
  }

  function redirect() {
    //Step 1 - Make sure that all the necissary fields are filled out
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let sponsorKey = document.getElementById("SponsorID").value
    console.log(username);
    console.log(password);
    console.log(sponsorKey);

    //Empty inputs are stopped here
    //
    var error = document.getElementById("error")
    if (document.getElementById("Username").value === '' || document.getElementById("Password").value === '' || document.getElementById("Username").value === '' )
    {
        error.textContent = "Please fill out all fields"
        error.style.color = "red"
        return;
    } else {
        error.textContent = ""
    }
    //Source: GfG "Error message w/o alert box"

    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    const loginAttempt = {
      username: username,
      password: password,
      sponsorKey: sponsorKey,
   }
   //post it to the server
   axios.post('http://localhost:8081/login', loginAttempt)
   .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
     console.log("response is:", response);
     var result = response.data;
     console.log("object:", result);
     if (response.status === 200){
       sessionStorage.setItem("userInfo", JSON.stringify(result));
       var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

       if(userInfo.twostepAuth === 1){
         alert("Please Authenticate Your Identity Through Your Email");
       }
       else{
        alert("Successful login");
       }
       window.location.replace("/Profile");
     }
   })
   .catch(function (error) {   //Error catch and Statement
    var error = document.getElementById("error")
    error.textContent = "Incorrect Username or Password"
    error.style.color = "red"
    console.log(error);
   });
  }

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return(
    <div>
      <h3>Login</h3>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Username">Username</label>
	      <input id='Username' type='text'/>
        <br></br>
	      <label htmlFor="Password"> Password </label>
	      {/* <input id='Password' type='password'/> */}
        <Input
          id = 'Password'
          type={values.showPassword ? "text" : "password"}
          onChange={handlePasswordChange("password")}
          value={values.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <br></br>
      <label htmlFor="SponsorID">Sponsor ID</label>
      <input id='SponsorID' type='int'/>
        <br /><span id="error"></span>
      </form>
      <button onClick={redirect}>Login</button>
       <p className="Forgot-password text-left">
        <Link to={"/"}>Forgot Password? </Link>
      </p>

   </div>
  )


    // return (
    //   <div
    //   >
    //     <InputLabel htmlFor="standard-adornment-password">
    //       Enter your Password
    //     </InputLabel>
    //     <Input
    //       type={values.showPassword ? "text" : "password"}
    //       onChange={handlePasswordChange("password")}
    //       value={values.password}
    //       endAdornment={
    //         <InputAdornment position="end">
    //           <IconButton
    //             onClick={handleClickShowPassword}
    //             onMouseDown={handleMouseDownPassword}
    //           >
    //             {values.showPassword ? <Visibility /> : <VisibilityOff />}
    //           </IconButton>
    //         </InputAdornment>
    //       }
    //     />
    //   </div>
    // );

}

// export default App;
