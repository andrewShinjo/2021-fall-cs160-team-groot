import http from "../http-special";

class CreateRecipeDataService {

    // @POST
    postRecipe(data){
        return http.post("/recipe", data);
    }
}
export default new CreateRecipeDataService();