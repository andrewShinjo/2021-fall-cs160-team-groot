import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserCircle, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/DisplayPage.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const DisplayPage = (props) => {
    //Grabbing ID from URL
    const { id } = useParams();
    console.log(id);

    const [recipe, setRecipe] = useState([]);

    /* When rendered, grab recipe ID from URL to search for recipe in database
    through GET request */
    useEffect(() => {
        const res = axios.get(`http://localhost:8080/api/recipe/${id}`)
            .then((response) => {
                //console.log(response.data); //Testing
                setRecipe(response.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [])

    const returnToSearch = () => {
        props.history.push("/search");
    };
    return (
        <div className="background">
            <Card className="displayCard" style={{ width: '80%' }}>
                <Card.Body>
                    <Card.Title class="text-center">
                        <h1 class="ff-font">
                            <b>
                                {recipe.name}
                            </b>
                        </h1>

                        <text className="profileFont">
                            Author: &ensp;
                        <FontAwesomeIcon icon={faUserCircle} />
                        &ensp;Jane Doe </text>
                    </Card.Title>
                    <hr style={{ height: '1px' }}></hr>

                    <Container>
                        <Row>
                            <Col xs={3}>
                                <Card>
                                    <Card.Text>
                                        <Card.Title className="titleFont">
                                            <b>Nutrition Info</b>
                                        </Card.Title>
                                        <p className="text-center subheaderFont">Restrictions</p>
                                        {/* If restrictions array is empty, return error message.
                                            Else, map through and print restriction values */}
                                        {
                                            recipe.restrictions ?
                                                recipe.restrictions.map(item => {
                                                    return (
                                                        <pre>
                                                            <text className="regularFont"> &nbsp;
                                                        <FontAwesomeIcon icon={faCheck} />
                                                        &nbsp; {item}</text>
                                                        </pre>
                                                    )
                                                }) :
                                                <text className="subheaderFont">Sorry, no restrictions found</text>
                                        }
                                        <p className="text-center subheaderFont">Diet</p>
                                        {/* If menu array is empty, return error message.
                                            Else, map through and print menu values */}
                                        {
                                            recipe.menu ?
                                                recipe.menu.map(item => {
                                                    return (
                                                        <pre>
                                                            <text className="regularFont"> &nbsp;
                                                        <FontAwesomeIcon icon={faCheck} />
                                                        &nbsp; {item}</text>
                                                        </pre>
                                                    )
                                                }) :
                                                <text className="subheaderFont">Sorry, no restrictions found</text>
                                        }
                                        <hr></hr>

                                        <Card.Title className="titleFont">
                                            <b>
                                                Ingredients
                                            </b>
                                        </Card.Title>
                                        <ul className="regularFont">
                                            {
                                                recipe.ingredients ?
                                                    recipe.ingredients.map(ingredVal => {
                                                        return (
                                                            <li>
                                                                {ingredVal}
                                                            </li>
                                                        )
                                                    }) :
                                                    <text className="subheaderFont">Sorry, no ingredients found</text>
                                            }

                                        </ul>
                                        <hr></hr>
                                        <Card.Title className="titleFont">
                                            <b>Additional Notes</b>
                                        </Card.Title>
                                        <pre>
                                            <text class="notesFieldsFont">&ensp; Cook time:</text>
                                            <text className="regularFont">&nbsp; {recipe.prepTime} minutes</text>
                                        </pre>
                                        <pre>
                                            <text class="notesFieldsFont">&ensp; Calories:</text>
                                            <text className="regularFont">&nbsp; {recipe.calorieCount} calories</text>
                                        </pre>
                                    </Card.Text>
                                </Card>
                                <br></br>
                                <Button variant="outline-dark" className="favoriteButton">
                                    <text className="regularFont text-center"> &nbsp;
                                    <FontAwesomeIcon icon={faHeart} />
                                    &nbsp;
                                    <Link to></Link>
                                     Favorite</text>
                                </Button>
                                <div className="text-center">
                                    <Button className="returnToSearch-button" onClick={returnToSearch}>Return</Button>
                                </div>
                            </Col>
                            <Col>
                                <Card>
                                    <br></br>
                                    <Card.Title className="titleFont">
                                        <h3><b>Directions</b></h3>
                                    </Card.Title>
                                    <hr></hr>
                                    <Card.Text>
                                        {
                                            recipe.directions ?
                                                recipe.directions.map((item, index) => {
                                                    return (
                                                        <pre>
                                                            <text className="instructionsFont">
                                                                <b> &nbsp; {index + 1}. </b>
                                                            </text>
                                                            <text className="instructionsFont">
                                                                &nbsp; {item}
                                                            </text>
                                                        </pre>

                                                    )
                                                }) :
                                                <text className="subheaderFont">Sorry, no ingredients found</text>
                                        }

                                    </Card.Text>

                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default DisplayPage
