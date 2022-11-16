import React , {useState} from "react";
import { useFormik } from "formik";
import './App.css';
import Popup from "./Components/Popup";
const validate = values =>{
  const errors ={};
  if(!values.firstname){
    errors.firstname = "*Required";
  }else if(values.firstname.length > 8){
    errors.firstname = "*Must be 8 characters or less";

  }
  if(!values.lastname){
    errors.lastname = "*Required";
  }else if(values.lastname.length > 8){
    errors.lastname = "*Must be 8 characters or less";

  }
  if(!values.email){
    errors.email ="*Required";
  }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)){
    errors.email ="*Invalid email address"

  }
  if(!values.password){
    errors.password="*Required";
  }else if(values.password.length > 8){
    errors.password = "* Maximum 8 Characters";

  }else if(values.password.length < 4){
    errors.password = "*Minimum 4 Characters";
  }
  if(!values.confirmpassword){
    errors.confirmpassword="*Required";
  }else if(values.password !== values.confirmpassword){
    errors.confirmpassword ="+password must match";
  }
  return errors;
}
const App =() =>{
  const [bool,setBool]= useState(0);
  const formik = useFormik({
    initialValues : {
      firstname : '',
      lastname : '',
      email : '',
      password : '',
      confirmpassword : '',

    },
    validate,
    onSubmit : (values ,{resetform}) =>{
     if(bool){
      setBool(0);
      resetform({values : ''});
     }else{
      setBool(1);
      console.log(values);
     }
    }
  });
 
  return(
    <div className="main">
      <div className="signup-form">
        <h2>Sign up here</h2>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" placeholder="Firstname" name="firstname" autoComplete="off" onChange = {formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur}/>
          {
           formik.touched.firstname && formik.errors.firstname ? <span>{formik.errors.firstname}</span> :null
          }
          <input type="text" placeholder="Lastname" name="lastname"  autoComplete="off" onChange = {formik.handleChange} value={formik.values.lastname} onBlur={formik.handleBlur}/>
          {
            formik.touched.lastname && formik.errors.lastname ? <span>{formik.errors.lastname}</span> :null
          }
          <input type="text" placeholder="Email" name="email"  autoComplete="off" onChange = {formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
          {
           formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> :null
          }
          <input type="password" placeholder="password" name="password"  autoComplete="off "onChange = {formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
          {
           formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> :null
          }
          <input type="password" placeholder="confirmpassword" name="confirmpassword"  autoComplete="off" onChange = {formik.handleChange} value={formik.values.confirmpassword} onBlur={formik.handleBlur}/>
          {
            formik.touched.confirmpassword && formik.errors.confirmpassword ? <span>{formik.errors.confirmpassword}</span> :null
          }
          <input type="submit" value="Submit"/>
        </form>
      </div>
      <div className="message-box">
        {
          bool ? (<Popup onclick = {formik.handleSubmit}/>) :null 
        }
      </div>
    </div>
  );
}
export default App;