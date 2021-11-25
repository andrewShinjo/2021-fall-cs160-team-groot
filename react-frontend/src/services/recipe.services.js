import http from "../http-common";

class RecipeDataService {

    // @POST
    postRecipe(data){
        return http.post("/recipe", data);
    }

    // @GET
    getAllRecipes(){
        return http.get(`/recipe`);
    }

    getRecipe(recipeID){
        return http.get(`/recipe/${recipeID}`);
    }

}
export default new RecipeDataService();
