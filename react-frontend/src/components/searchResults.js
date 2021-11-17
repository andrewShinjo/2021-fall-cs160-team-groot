import { useState, useEffect } from "react";
import '../css/searchResults.css';
import { Row, Col, Form, Card } from 'react-bootstrap';
import axios from "axios";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import dmmydata from '../dummyData';    // Delete this import of the json file later
import RecipeCard from './recipeCard';
import UserDataService from "../services/user.service";
import RecipeService from '../services/recipe.service';

const SearchResults = () => {
    const [filteredData, setFilteredData] = useState([]); // Holds input that user typed into search bar 
    const [wordEntered, setWordEntered] = useState(""); // Hook that determines if search bar is empty or not 
    // Holds which diet values have been clicked (e.g. pescatarian, vegetarian, vegan)
    const [dietGenre, setDietGenre] = useState([]);
    // Holds recipes that match the checked diet genre
    const [filteredDietGenre, setFilteredDietGenre] = useState([]);
    const [searchResults, setSearchResults] = useState([]); // Holds all matched filtered and search values
    const [restrictGenre, setRestrictGenre] = useState([]);
    const [filteredRestrictGenre, setFilteredRestrictGenre] = useState([]);
    const [filterSearchOption, setFilterSearchOption] = useState("");

    /*
    Initially, sets the hook to all recipes to display recipe cards without any user input
    */
    useEffect(() => {
        RecipeService.getAllRecipes()
            .then((response) => {
                setSearchResults(response.data);
            }).catch((e) => {
                console.log(e);
            }
            );
    }, [])

    /*
    useEffect() runs everytime application renders 
    Whenever diet genre/checkbox changes, useEffect will run the callback function 
    setFilteredDietGenre will hold the recipes that match to the provided user filters/input
    */
    useEffect(() => {
        if (dietGenre.length === 0) {
            setFilteredDietGenre(dmmydata);
        } else {
            setFilteredDietGenre(
                dmmydata.filter(val =>
                    dietGenre.some(category =>
                        ([val.menu].flat().includes(category.toString().toLowerCase()))))
            );
        }
    }, [dietGenre]);

    /*
    useEffect() runs everytime application renders
    Whenever restrictions genre/checkbox changes, useEffect will run the callback function
    setFilteredRestrictGenre will hold the recipes that match to the provided user filters/input
    */
    useEffect(() => {
        if (restrictGenre.length === 0) {
            setFilteredRestrictGenre(dmmydata);
        } else {
            setFilteredRestrictGenre(
                dmmydata.filter(val =>
                    restrictGenre.some(category =>
                        ([val.restrictions].flat().includes(category.toString().toLowerCase()))))
            );
        }
    }, [restrictGenre])

    /*
    filterSearchOption holds the filter option that user wants to search by 
    */
    const onFilteredSearch = e => {
        setFilterSearchOption({ id: e.target.id });
    }

    /*
    handleDietChange gets called on when user marks a diet checkbox
    handleDietChange sets the dietGenre to whatever diet the user has marked
    */
    const handleDietChange = e => {
        if (e.target.checked) {
            setDietGenre([...dietGenre, e.target.id]);
        } else {
            setDietGenre(dietGenre.filter(id => id !== e.target.id));
        }
    };


    /*
        handleDietChange gets called on when user marks a restrictions checkbox
        handleDietChange sets the restrictGenre to whatever diet the user has marked
    */
    const handleRestrictChange = e => {
        if (e.target.checked) {
            setRestrictGenre([...restrictGenre, e.target.id]);
        } else {
            setRestrictGenre(restrictGenre.filter(id => id !== e.target.id));
        }
    }

    /*
    handleClick gets triggered when search bar button is clicked on
    */
    const handleClick = async () => {
        if (dietGenre.length != 0 || restrictGenre.length != 0) {
            var correctWordFormat = "";

            //Changing the format of user input recipe name to match one in database
            if (filteredData.length != 0 && (filteredData.toString().split(" ").length > 1)) {
                let changeToLowerCase = filteredData.toString().toLowerCase();
                const words = changeToLowerCase.split(" ");

                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

                correctWordFormat = words.join(" ");
            }

            const res = await axios.get('http://localhost:8080/api/recipe/search', { params: { 
            name: correctWordFormat,
            menu: dietGenre.toString(),
            restriction: restrictGenre.toString() } })
                .then((response) => {
                    setSearchResults(response.data);
                    console.log(response.data);
                }).catch((e) => {
                    setSearchResults(-1);
                    console.log(e);
                }) 
            console.log(correctWordFormat);
            console.log(res);
        }
        // If the user is searching by ingredients
        else if (filterSearchOption.id === 'ingredients') {
            var correctWordFormat;
            correctWordFormat = filteredData.toString().toLowerCase();

            const res = await axios.get('http://localhost:8080/api/recipe/ingredients', { params: { ingredient: correctWordFormat } })
                .then((response) => {
                    setSearchResults(response.data);
                    console.log(response.data);
                }).catch((e) => {
                    setSearchResults(-1);
                    console.log(e);
                })
        } 
        // If the user is searching by diet
        else if (filterSearchOption.id === 'diet') {
            /* Throws an error if the user input string is empty and is converted to lower case
              So add an if else statement to prevent error*/
            if (filteredData.length == 0) {
                setSearchResults(-1);
            } else {
                var correctWordFormat;
                correctWordFormat = filteredData.toString().toLowerCase();
                correctWordFormat = correctWordFormat[0].toUpperCase() + correctWordFormat.substr(1);

                const res = await axios.get('http://localhost:8080/api/recipe/menu', { params: { menu: correctWordFormat } })
                    .then((response) => {
                        setSearchResults(response.data);
                    }).catch((e) => {
                        setSearchResults(-1);
                        console.log(e);
                    })
            }
        } 
        // If the user is searching by restrictions
        else if (filterSearchOption.id === 'restriction') {
            var correctWordFormat;
            correctWordFormat = filteredData.toString().toLowerCase();

            const res = await axios.get('http://localhost:8080/api/recipe/restrictions', { params: { restriction: correctWordFormat } })
                .then((response) => {
                    setSearchResults(response.data);
                }).catch((e) => {
                    setSearchResults(-1);
                    console.log(e);
                })
        }
        /* Search by recipe category is set by default if the user doesn't check radio button, 
        so leave the 'search by recipe' for the else statement 
        */ 
        else {
            var correctWordFormat;

            if (filteredData.toString().split(" ").length > 1) {
                let changeToLowerCase = filteredData.toString().toLowerCase();
                const words = changeToLowerCase.split(" ");

                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

                correctWordFormat = words.join(" ");
            }

            const res = await axios.get('http://localhost:8080/api/recipe/names', { params: { name: correctWordFormat } })
                .then((response) => {
                    setSearchResults(response.data);
                }).catch((e) => {
                    setSearchResults(-1);
                    console.log(e);
                })

        }
    }

    // Grabbing user input from search and setting it to the filteredData hook
    const setData = (val) => {
        setFilteredData(val.target.value);
        setWordEntered(val.target.value);
    }

    return (
        <div>
            <div className="outer-container">
                <Row className="justify-content-md-center">
                    <div className="col-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Form.Label className="labelTitles">Ingredients</Form.Label>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Lettuce"
                                            name="ingredient"
                                            type={type}
                                            id={`inline-${type}-1`} />
                                        <Form.Check
                                            inline
                                            label="Tomatoes"
                                            name="ingredient"
                                            type={type}
                                            id={`inline-${type}-2`} />
                                        <Form.Check
                                            inline
                                            label="Garlic"
                                            name="ingredient"
                                            type={type}
                                            id={`inline-${type}-3`} />
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
                                            id="Pescatarian"
                                            onChange={handleDietChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Vegetarian"
                                            name="diet"
                                            type={type}
                                            id="Vegetarian"
                                            onChange={handleDietChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Vegan"
                                            name="diet"
                                            type={type}
                                            id="Vegan"
                                            onChange={handleDietChange}
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
                                            label="Gluten-free"
                                            name="restriction"
                                            type={type}
                                            id="gluten-free"
                                            onChange={handleRestrictChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Peanut-free"
                                            name="restriction"
                                            type={type}
                                            id="peanut-free"
                                            onChange={handleRestrictChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Soy-free"
                                            name="restriction"
                                            type={type}
                                            id="soy-free"
                                            onChange={handleRestrictChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Egg-free"
                                            name="restriction"
                                            type={type}
                                            id="egg-free"
                                            onChange={handleRestrictChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Shellfish-free"
                                            name="restriction"
                                            type={type}
                                            id="shellfish-free"
                                            onChange={handleRestrictChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Fat-free"
                                            name="restriction"
                                            type={type}
                                            id="fat-free"
                                            onChange={handleRestrictChange}
                                        />
                                    </div>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div class="col-8">
                        <Card className="recipeResults">
                            <h1 className="searchTitle">Search Results</h1>


                            {/* Whatever the user types in the search bar will be set in setData by onChange */}
                            <Row>
                                <input
                                    type="text"
                                    className="searchBar py-1"
                                    value={wordEntered}
                                    onChange={setData}
                                />
                                {/* Filter through recipe database for matches when the button is clicked */}
                                <button className="buttonSearchResult col-1 py-1"
                                    onClick={handleClick}>
                                    <Link to="/search"><FontAwesomeIcon icon={faSearch} color="white" /></Link>
                                </button>

                                <div className="py-2">
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="Recipe name"
                                                name="searchGroup"
                                                type={type}
                                                id="recipeName"
                                                onChange={onFilteredSearch}
                                            />
                                            <Form.Check
                                                inline
                                                label="Ingredients"
                                                name="searchGroup"
                                                type={type}
                                                id="ingredients"
                                                onChange={onFilteredSearch}
                                            />
                                            <Form.Check
                                                inline
                                                label="Diet"
                                                name="searchGroup"
                                                type={type}
                                                id="diet"
                                                onChange={onFilteredSearch}
                                            />
                                            <Form.Check
                                                inline
                                                label="Restriction"
                                                name="searchGroup"
                                                type={type}
                                                id="restriction"
                                                onChange={onFilteredSearch}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Row>

                            <Row>
                                {
                                    (searchResults === -1) ?
                                        (<p className="searchTitle text-center">Sorry cannot find recipe, please try again! </p>)
                                        :
                                        (searchResults.length === 0) ?
                                            (<p className="searchTitle text-center">Sorry cannot find recipe, please try again! </p>)
                                            :
                                            (searchResults.map((val, key) => {
                                                return (
                                                    <Col xs={3} className="mb-2" key={key}>
                                                        <RecipeCard data={val} />
                                                    </Col>
                                                );
                                            }))
                                }
                            </Row>
                        </Card>
                    </div>
                </Row>
            </div>
        </div>
    )
}

export default SearchResults

