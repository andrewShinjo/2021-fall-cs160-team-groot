const createRecipeValidation = (values) => {
    let errors = {};

    if (!values.recipeID) {
        errors.recipeID="Recipe ID is required"
    }

    if (!values.authorID) {
        errors.authorID="Author ID is required"
    }

    if (!values.name) {
        errors.name="Title of recipe is required"
    }

    if (!values.prepTime) {
        errors.prepTime="Prep time is required"
    }
    if (!values.calorieCount) {
        errors.calorieCount="Calorie count is required"
    }
    return errors;
}

export default createRecipeValidation