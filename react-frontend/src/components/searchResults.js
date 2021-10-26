import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/searchResults.css';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import dmmydata from '../dummyData';
import RecipeCard from '../components/recipeCard';

export default class SearchResults extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Container>
                    <div class="row justify-content-md-center">
                        <div class="col-3">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <Form.Label className="labelTitles">Ingredients</Form.Label>
                                    {['checkbox'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Lettuce"
                                                name="ingredient"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Tomatoes"
                                                name="ingredient"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Garlic"
                                                name="ingredient"
                                                type={type}
                                                id={`inline-${type}-3`}
                                            />
                                        </div>
                                    ))}
                                </li>
                                <li class="list-group-item">
                                    <Form.Label className="labelTitles">Diet</Form.Label>
                                    {['checkbox'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Pescatarian"
                                                name="diet"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Vegetarian"
                                                name="diet"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="Vegan"
                                                name="diet"
                                                type={type}
                                                id={`inline-${type}-3`}
                                            />
                                        </div>
                                    ))}
                                </li>
                                <li class="list-group-item">
                                    <Form.Label className="labelTitles">Restrictions</Form.Label>
                                    {['checkbox'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="No Dairy"
                                                name="restriction"
                                                type={type}
                                                id={`inline-${type}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                label="No Peanuts"
                                                name="restriction"
                                                type={type}
                                                id={`inline-${type}-2`}
                                            />
                                            <Form.Check
                                                inline
                                                label="No Egg"
                                                name="restriction"
                                                type={type}
                                                id={`inline-${type}-3`}
                                            />
                                        </div>
                                    ))}
                                </li>
                            </ul>
                        </div>
                        <div class="col-8">
                            <Card className="recipeResults">
                                <h1 className="searchTitle">Search Results</h1>
                                <Row>
                                <input type="text" className="searchBar py-1" />
                                <button className="buttonSearch col-1 py-1">
                                    <Link to="/search"><FontAwesomeIcon icon={faSearch} /></Link>
                                </button>
                                </Row>
                                <Row>
                                    {dmmydata.map(data => (
                                        <Col xs={3} className="mb-2" key={'${data.id}'}>
                                            <RecipeCard data={data} />
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}