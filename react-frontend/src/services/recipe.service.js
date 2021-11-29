import http from "../http-common";

class RecipeService {
    // @GET 

    favoriteRecipe(username, recipeID) {
        return http.get(`/recipe/favorite/username=${username}/recipeID=${recipeID}`)
    }

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

    getRecipesByIds(id) {
        let path = "/recipe/ids?id=";
        for(let i = 0; i < id.length - 1; i++) {
            path += id[i];
            path+= ",";
        }
        path += id[id.length - 1];
        return http.get(path);
    }
}
export default new RecipeService();