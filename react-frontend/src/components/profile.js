import React, {useState, Component} from "react";
import "../css/profile.css"
import icon from '../resources/StockFood.png';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import dmmydata from '../dummyData';
import RecipeCard from '../components/recipeCard';
import UtilityCard from '../components/utilityCard';

import UserDataService from '../services/user.service';

// To get to profile page, we need the user credentials, otherwise return to the home page

// Messages for the cards at the end of the profile list
let your_recipes = {
    id: 100,
    "message": "View all of your created recipes",
    "locmessage": "View"
}

let favorite_recipes = {
    id: 101,
    "message": "View all of your favorited recipes",
    "locmessage": "View"
}



const ProfilePage = (props) => {
    const [username, setUsername] = useState(null);
    // Redirect if no credentials were placed in
    // If props has id, try to retrieve
    // If retrieval is not possible, return error
    console.log(props);

    // may want to change get request from getting user to getting user's name only 
    // b/c right now, we get all of user's info including password
    UserDataService.getUser(localStorage.getItem("userID")).then( (user) => {
        setUsername(user.data.username)
    })

    const search = () => {
        props.history.push("/search");
   };
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-lg-3 card">
                    <img src={icon} alt="Profile Picture" className="card-img-top img-circle"/>
                    <p className="text-center">{(username === null) ? "No Profile" : username}</p>
                    <button className="buttonAccount mb-2">Account Settings</button>
                    {/* Change username/password, Change profile pic, Change Visiblity, Delete Account */}
                    <button className="buttonAccount">Food Preferences</button>
                    {/* Change diet and restrictions that automatically apply */}
                    <button className="buttonAccount mt-2" onClick={search}>Search</button>
                </div>
                <div className="col-lg-9 card">
                    <h3 className="ff-font pt-3">Your recipes</h3>
                    {/* List of created recipes */}
                    <div className="row flex-row flex-nowrap scrollable py-2">
                        {dmmydata.map(data => (
                            <Col xs={3} className="mb-2" key={'${data.id}'}>
                                <RecipeCard data={data} />
                            </Col>
                        ))}
                        <Col xs={3} className="mb-2" key={'${data.id}'}>
                            <UtilityCard data={your_recipes} />
                        </Col>
                    </div>
                    <h3 className="ff-font pt-3">Favorite recipes</h3>
                    <div className="row flex-row flex-nowrap scrollable py-2">
                        {dmmydata.map(data => (
                            <Col xs={3} className="mb-2" key={'${data.id}'}>
                                <RecipeCard data={data} />
                            </Col>
                        ))}
                        <Col xs={3} className="mb-2">
                            <UtilityCard data={favorite_recipes} />
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage