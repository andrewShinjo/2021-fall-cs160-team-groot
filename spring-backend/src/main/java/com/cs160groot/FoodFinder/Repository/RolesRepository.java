package com.cs160groot.FoodFinder.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cs160groot.FoodFinder.Entity.ERole;
import com.cs160groot.FoodFinder.Entity.Role;

public interface RolesRepository extends MongoRepository<Role, String> {
	Optional<Role> findByName(ERole role);
}
