package com.cs160groot.FoodFinder.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.cs160groot.FoodFinder.Entity.AppUser;

public interface UserRepository extends MongoRepository<AppUser, String> {} 
