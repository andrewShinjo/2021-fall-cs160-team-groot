import http from "../http-common";

class RecipeService {
    // @GET 
    getAllRecipes() {
        return http.get(`/recipe`);
    }

    getRecipe(id) {
        return http.get(`/recipe/${id}`)
    }

    getRecipeByName(name) {
        return http.get(`/recipe/names`, name)
    }

    getRecipeByRestriction() {
        return http.get(`/recipe/restrictions`)
    }

    getRecipeByDiet() {
        return http.get(`/recipe/menu`)
    }

    getRecipeByIngredients(ingredient) {
        return http.get(`/recipe/ingredients`, ingredient)
    }
}
export default new RecipeService();