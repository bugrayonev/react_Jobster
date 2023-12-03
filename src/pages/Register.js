import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import {useSelector,useDispatch} from "react-redux"
import {toast} from "react-toastify"
import { loginUser,registerUser } from "../features/user/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};



const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate()
  
 
  const {isLoading,user} = useSelector((store)=> store.user)
  
  

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setValues({ ...values, [name]: value });
  };

 

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember && !name)) { // (!isMember && !name)  => eger üye değilse ve name yoksa 
      toast.error("Please Fill out all fields");
     return
    }

    if(isMember){
      dispatch(loginUser({email:email,password:password}))
      return
  }
  dispatch(registerUser({name,email,password}))
  
  };


  const toggleMember = ()=> {
    setValues({...values,isMember:!values.isMember})
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    // eslint-disable-next-line
  }, [user]);

  

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "login" : "register"}</h3>

        {/* name */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="name"
          />
        )}
        {/* email */}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        />

        {/* password */}

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        {/* test user */}
        <button
  type='button'
  className='btn btn-block btn-hipster'
  disabled={isLoading}
  onClick={() => {
    dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }));
  }}
>
  {isLoading ? 'loading...' : 'demo'}
</button>
        <div className="">
          <p>
           {values.isMember ? "Not a member yet?" : "Already a member?"}
                     
           <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "register" : "login"}
           </button>
            
             </p>
             
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
