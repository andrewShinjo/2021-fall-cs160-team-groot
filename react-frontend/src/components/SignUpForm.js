import axios from "axios";
import {useState} from "react";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let emailAvailable = false;

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const onSignUpSubmit = () => {
        // axios.get is asynchronous. need to force program to wait for it.
        axios.get("http://localhost:8080/signup/" + email).then(response => {
            console.log(response.data);
            emailAvailable = response.data;
        });
        if(emailAvailable) {
            const appUser = {
                "email": email, 
                "password" : password
            };
            axios.post("http://localhost:8080/signup/" + email, appUser);
            console.log("Account created.");
        } else {
            console.log("Email is taken.");
        }
    };

    return(
        <div>
            <label htmlFor="email">Email:</label>
				<input 
                    type="text"
                    onChange={onEmailChange}
                />
				<br/>
				<label htmlFor="password">Password:</label>
				<input 
                    type="password"
                    onChange={onPasswordChange}
                />
				<br/>
				<input 
                    type="submit" 
                    value="Sign Up"
                    onClick={onSignUpSubmit}
                />
        </div>
    );
};

export default SignUpForm;