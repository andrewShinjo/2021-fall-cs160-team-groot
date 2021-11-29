import http from "../http-common";

class UserDataService {

    // @POST
    postSignup(data){
        return http.post("/auth/signup", data);
    }

    // @GET
    getUser(id){
        return http.get(`/users/${id}`);
    }

    getPreferences(username){
        return http.get(`/users/preferences/${username}`);
    }

    getFavorites(username){
        return http.get(`/users/favorites/${username}`);
    }

    getUploads(username){
        return http.get(`/users/uploads/${username}`);
    }

    /**
    put(id, data){
        return http.put(`/users/${id}`, data);
    }

    delete(id){
        return http.delete(`/users/${id}`);
    }*/
}
export default new UserDataService();