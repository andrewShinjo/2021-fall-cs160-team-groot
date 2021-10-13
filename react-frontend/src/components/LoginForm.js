import {useState} from "react";

const LoginForm = () => {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

	const onLoginSubmit = () => {

	};

	return(
			<div>
				<h1>Login Form</h1>
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
                    value="Login"
                    onClick={onLoginSubmit}
				/>
			</div>
	);
};

export default LoginForm;
