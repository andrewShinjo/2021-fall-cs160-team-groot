package com.cs160groot.FoodFinder.Repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cs160groot.FoodFinder.Entity.AppUser;

public interface UserRepository extends MongoRepository<AppUser, String> {
	public Optional<AppUser> findByEmail(String email);
} 
