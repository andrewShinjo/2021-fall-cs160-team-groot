import React, { useState, useEffect } from 'react';
import '../css/createRecipe.css';
import {Button, Form, Row, Col} from 'react-bootstrap';
import validationCreateRecipe from "./createRecipeValidation"

// import RecipeDataService from '../services/recipe.services';
import CreateRecipeDataService from '../services/recipecreate.service';
import UserDataService from '../services/user.service';

const CreateRecipePage = (props) => {
    // Gets the username information to include on the form
    const [username, setUsername] = useState(null);
    UserDataService.getUser(localStorage.getItem("username")).then( (user) => {
        setUsername(user.data.username)
    })
    // Gets the date details to include on the form 
    const date = new Date();
    const dateDetails = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

    const [values, setValues] = useState({
        recipeID: "", // Need to figure out a way to generate this
        name: "", // aka recipe Title
        authorName: localStorage.getItem("username"),
        ingredients: [], 
        directions: [], //aka Instructions
        menu: [], // aka Diet
        restrictions: [],
        calorieCount: "",
        prepTime: ""
    });
    const [errors, setErrors] = useState({});

    // Ingredients and Directions List
    const [ingredientList, setIngredientList] = useState([
        "",
    ]);
    const [directionList, setDirectionList] = useState([
        "",
    ]);

    // Empty Rows
    const emptyIngredient = "";
    const emptyDirection = "";

    const addDirection = () => {
        setDirectionList([...directionList, emptyDirection]);
    };

    const HandleDirectionChange = (e) => {
        const updatedDirection = [...directionList];
        updatedDirection[e.target.dataset.idx] = e.target.value;
        setDirectionList(updatedDirection);
    };

    const addIngredient = () => {
        setIngredientList([...ingredientList, emptyIngredient]);
    };

    const HandleIngredientChange = (e) => {
        const updatedIngredient = [...ingredientList];
        updatedIngredient[e.target.dataset.idx] = e.target.value;
        setIngredientList(updatedIngredient);
    };

    // Diet information
    const [dietList, addDietList] = useState([]);
    const handleDietChange = e => {
        // Update the diet list with the current diets that are selected
        if (e.target.checked) {
            addDietList([...dietList, e.target.id]);
        } else {
            addDietList(dietList.filter(id => id !== e.target.id));
        }
    };

    // Restriction information
    const [restrictionList, addRestrictionList] = useState([]);
    const handleRestrictionChange = e => {
        // Update the restriction list with the current restrictions that are selected
        if (e.target.checked) {
            addRestrictionList([...restrictionList, e.target.id]);
        } else {
            addRestrictionList(restrictionList.filter(id => id !== e.target.id));
        }
    };

    const HandleChange = (event) => {
        //Sets the value for each input field
        //First take the initial values of each field
        //Then assign the value given by users based on the names
        setValues({
            ...values,
            [event.target.name]: event.target.value,
            ["directions"]: directionList,
            ["ingredients"]: ingredientList,
            ["menu"]: dietList,
            ["restrictions"]: restrictionList,
        });
    }

    // Force any changes to values to wait to finish
    useEffect(() => {
        console.log(values);
    }, [values]);

    const HandleFormSubmit = (event) => {
        event.preventDefault();
        //Validating user input
        setErrors(validationCreateRecipe(values));
        // Add the direction and ingredients to the values request
        let temp = {...values}
        temp["directions"] = directionList;
        temp["ingredients"] = ingredientList;
        temp["menu"] = dietList;
        temp["restrictions"] = restrictionList;
        setValues(temp);

        // Submit the request to the backend
        CreateRecipeDataService.postRecipe(values).then(
            (response) => {
                console.log("--Success--");
                console.log(response.data);
                props.history.push("/search");
            }
        ).catch(
            (e) => {
                console.log(e);
            }
        );
    };

    // Redirect to profile
    const returnToProfile = () => {
        props.history.push("/profile");
   };

    return (
        <div className="outer-container-Create">
            <div className="inner-container-Create">
                <Form className="form-style-Create">
                    <h1 className="create-form-title">Create a new recipe</h1>
                    <Row>
                        <div className="AuthorDateDiv">
                            <div className="Author-Date">Author: {username}</div>
                            <div className="Author-Date">Date: {dateDetails}</div>
                        </div>
                    </Row>
                    <Row>
                        <Form.Group className="mb-1" controlId="recipeID">
                            <Form.Label>Recipe ID</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Type in a number"
                                name="recipeID"
                                value={values.recipeID}
                                onChange={HandleChange}
                            />
                            {errors.recipeID && <p className="error">{errors.recipeID}</p>}
                        </Form.Group>
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                        <Form.Group className="mb-1" controlId="name">
                            <Form.Label>Title of Recipe</Form.Label>
                            <Form.Control
                                placeholder="Title"
                                name="name"
                                value={values.name}
                                onChange={HandleChange}
                            />
                            {errors.name && <p className="error">{errors.name}</p>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <div class="col-10">
                            {/**<Form.Group className="mb-3" controlId="directions">*/}
                                {/**</div><Form.Label>List the instructions</Form.Label>*/}
                                <h4>List the instructions</h4>
                                {
                                    directionList.map((element, index) => {
                                        return(
                                            <div key={`direction-${index}`}>
                                            <Form.Group className="mb-1" controlId={`direction-${index}`}>
                                                <Form.Label>{`Step #${index + 1}`}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name={`dir-${index}`}
                                                    data-idx={`${index}`}
                                                    value={directionList[index].value}
                                                    placeholder="Instruction"
                                                    onChange={HandleDirectionChange}
                                                />
                                            </Form.Group>
                                            </div>
                                        )
                                    })
                                }
                            {/**</Form.Group>**/}
                        </div>
                        <div class="col-2">
                            <div className="outer-div-one-btn">
                                <div className="outer-div-two-btn">
                                    <Button className="plus-button" onClick={addDirection}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div class="col-10">
                            <h4>List of Ingredients</h4>
                            {/**<Form.Group className="mb-3" controlId="ingredients">*/}
                                {/**<Form.Label>List the ingredients</Form.Label>**/}
                                {
                                    ingredientList.map((element, index) => {
                                        return(
                                            <div key={`ingredient-${index}`}>
                                            <Form.Group className="mb-1" controlId={`ingredient-${index}`}>
                                                <Form.Label>{`Item #${index + 1}`}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name={`ing-${index}`}
                                                    data-idx={`${index}`}
                                                    value={ingredientList[index].value}
                                                    placeholder="Ingredient"
                                                    onChange={HandleIngredientChange}
                                                />
                                            </Form.Group>
                                            </div>
                                        )
                                    })
                                }
                                {/**</Form.Group>**/}
                        </div>
                        <div class="col-2">
                            <div className="outer-div-one-btn">
                                <div className="outer-div-two-btn">
                                    <Button className="plus-button" onClick={addIngredient}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div style={{ paddingBottom: "15px" }}>
                        <Form.Label >Diet</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-1">
                                <Form.Check
                                    disabled={false}
                                    inline
                                    label="Pescatarian"
                                    name="diet"
                                    type={type}
                                    id="Pescatarian"
                                    onChange={handleDietChange}
                                />
                                <Form.Check
                                   disabled={false}
                                    inline
                                    label="Vegetarian"
                                    name="diet"
                                    type={type}
                                    id="Vegetarian"
                                    onChange={handleDietChange}
                                />
                                <Form.Check
                                    disabled={false}
                                    inline
                                    label="Vegan"
                                    name="diet"
                                    type={type}
                                    id="Vegan"
                                    onChange={handleDietChange}
                                />
                            </div>
                        ))}
                        </div>
                    </Row>
                    <Row>
                        <div style={{ paddingBottom: "15px" }}>
                        <Form.Label >Restrictions</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-1">
                                <Form.Check
                                    disabled={false}
                                    inline
                                    label="Gluten-free"
                                    name="Restrictions"
                                    type={type}
                                    id={"Gluten-free"}
                                    onChange={handleRestrictionChange}
                                />
                                <Form.Check
                                    disabled={false}
                                    inline
                                    label="Fat-free"
                                    name="Restrictions"
                                    type={type}
                                    id={"Fat-free"}
                                    onChange={handleRestrictionChange}
                                />
                                <Form.Check
                                    disabled={false}
                                    inline
                                    label="Peanut-free"
                                    name="Restrictions"
                                    type={type}
                                    id={"Peanut-free"}
                                    onChange={handleRestrictionChange}
                                />
                            </div>
                        ))}
                        </div>
                    </Row>
                    <Row>
                        <Form.Group className="mb-1" controlId="prepTime">
                            <Form.Label>Prep Time In Minutes</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Minutes"
                                name="prepTime"
                                value={values.prepTime}
                                onChange={HandleChange}
                            />
                            {errors.prepTime && <p className="error">{errors.prepTime}</p>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-1" controlId="calorieCount">
                            <Form.Label>Calorie Count</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Calories"
                                name="calorieCount"
                                value={values.calorieCount}
                                onChange={HandleChange}
                            />
                            {errors.calorieCount && <p className="error">{errors.calorieCount}</p>}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="create-recipe-submitBtn" type="submit" onClick={HandleFormSubmit}>Submit</Button>
                        </Col>
                        <Col>
                            <Button className="create-recipe-submitBtn" onClick={returnToProfile}>Return</Button>                        
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>

    )
}
export default CreateRecipePage