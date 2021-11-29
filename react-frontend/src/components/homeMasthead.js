import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import '../css/home.css';
import head from '../resources/StockFood.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class HomeMasthead extends Component {
    redirectSignin = () => {
        this.props.history.push("/sign-in")
    }

    redirectSignup = () =>{
        this.props.history.push("/sign-up")
    }

    // This will need to be changed when incorporating search terms
    redirectSearch = () =>{
        this.props.history.push("/search")
    }

    signOutHandler = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        this.props.history.push("/");
        alert("User successfully signed out.");
    }

    render(){
        // Before render
        return(
            <div className="container-fluid">
                <div className="d-flex align-items-center row">
                    <div className="col-7">
                        <div className="mb-5">
                            <h1 className="title ff-font d-flex justify-content-center">Food Finder</h1>
                            <h2 className="d-flex justify-content-center">Start finding recipes now</h2>
                            <div className="d-flex justify-content-center my-3">
                                <input type="text" className="searchBar py-1"/>
                                <button className="buttonSearch col-1 py-1" onClick={this.redirectSearch}><FontAwesomeIcon icon={faSearch}/></button>
                            </div>                            
                            <div className="row d-flex justify-content-center">
                                {
                                    (localStorage.getItem("jwt") === null) ?
                                    <button className="buttonHome col-4 mx-2" onClick={this.redirectSignin}>Sign-In</button> :
                                    <button className="buttonHome col-4 mx-2" onClick={this.signOutHandler}>Sign-Out</button>
                                }
                                {
                                    (localStorage.getItem("jwt") === null) ?
                                    <button className="buttonHome col-4 mx-2" onClick={this.redirectSignup}>Sign-Up</button> :
                                    null
                                }

                                
                            </div>
                        </div>
                    </div>
                    <div className="col-5 px-0">
                        <img className="img-fluid" src={head}/>
                    </div>
                </div>
            </div>
        )
    }
}