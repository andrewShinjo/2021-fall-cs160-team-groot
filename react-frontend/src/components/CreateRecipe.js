import React, { useState, useEffect } from 'react';
import '../css/createRecipe.css';
import {Button, Form, Row,} from 'react-bootstrap';
import validationCreateRecipe from "./createRecipeValidation"

// import RecipeDataService from '../services/recipe.services';
import CreateRecipeDataService from '../services/recipecreate.service';


const CreateRecipePage = () => {
    const [values, setValues] = useState({
        recipeID: "", // Need to figure out a way to generate this
        name: "", 
        authorID: "",
        ingredients: [], // Disabled until I figure out how to add to the list
        directions: [], //aka Instructions; Disabled until I figure out how to add to the list
        menu: [], // aka Diet; // Disabled until I figure out how to add to the list
        restrictions: [], // Disabled until I figure out how to add to the list
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

    const HandleChange = (event) => {
        //Sets the value for each input field
        //First take the initial values of each field
        //Then assign the value given by users based on the names
        setValues({
            ...values,
            [event.target.name]: event.target.value,
            ["directions"]: directionList,
            ["ingredients"]: ingredientList
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
        setValues(temp);

        // Submit the request to the backend
        CreateRecipeDataService.postRecipe(values).then(
            (response) => {
                console.log(response.data);
            }
        ).catch(
            (e) => {
                console.log(e);
            }
        );
    };

    return (
        <div className="outer-container-Create">
            <div className="inner-container-Create">
                <Form className="form-style-Create">
                    <h1 className="create-form-title">Create a new recipe</h1>
                    <Row>
                        <div className="Author-Date">Auto-Generate Author + Date Here</div>
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
                        <Form.Group className="mb-1" controlId="authorID">
                            <Form.Label>Author ID</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Type in a number"
                                name="authorID"
                                value={values.authorID}
                                onChange={HandleChange}
                            />
                            {errors.authorID && <p className="error">{errors.authorID}</p>}
                        </Form.Group>
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
                                <h3>List the instructions</h3>
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
                            <h3>List of Ingredients</h3>
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
                        <div style={{ paddingBottom: "15px" }}>
                        <Form.Label >Diet</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-1">
                                <Form.Check
                                    disabled={true}
                                    inline
                                    label="Pescatarian"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    disabled={true}
                                    inline
                                    label="Vegetarian"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    disabled={true}
                                    inline
                                    label="Vegan"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
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
                                    disabled={true}
                                    inline
                                    label="Gluten-free"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    disabled={true}
                                    inline
                                    label="Fat-free"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    disabled={true}
                                    inline
                                    label="Peanut-free"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>
                        ))}
                        </div>
                    </Row>
                    <Button className="create-recipe-submitBtn" type="submit" onClick={HandleFormSubmit}>Submit</Button>
                </Form>
            </div>
        </div>

    )
}
export default CreateRecipePage