package com.cs160groot.FoodFinder.Repository;
import java.util.Optional;
import org.springframework.data.mongodb.repository.Query;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.cs160groot.FoodFinder.Entity.AppUser;

public interface AppUserRepository extends MongoRepository<AppUser, String>{
	Optional<AppUser> findByEmail(String email);
	Optional<AppUser> findById(String username);
	Optional<AppUser> findByUsername(String username);
	
	@Query("{$and : [ { username: ?0 } , { password: ?1 } ] }")
	Optional<AppUser> findByUsernameAndPassword(String username, String password);
}
