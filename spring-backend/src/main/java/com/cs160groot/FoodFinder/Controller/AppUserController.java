package com.cs160groot.FoodFinder.Controller;

import java.util.ArrayList; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs160groot.FoodFinder.Entity.AppUser;
import com.cs160groot.FoodFinder.Entity.Preferences;
import com.cs160groot.FoodFinder.Repository.AppUserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class AppUserController {
	@Autowired
	private AppUserRepository appUserRepository;
	
	public AppUserController(AppUserRepository appUserRepository) {
		this.appUserRepository = appUserRepository;
	}

	@GetMapping("/{userID}")
	public Optional<AppUser> getAppUser(@PathVariable String userID) {
		return appUserRepository.findById(userID);
	}
	
	@PostMapping
	public AppUser postAppUser(@RequestBody AppUser appUser) {
		return appUserRepository.save(appUser);
	}
	
	@GetMapping("/preferences/{userID}")
	public Preferences getPreferences(@PathVariable String userID) {
		Optional<AppUser> user = appUserRepository.findById(userID);
		return user.get().getPreferences();
	}
	
	@GetMapping("/favorites/{userID}")
	public ArrayList<Integer> getFavorites(@PathVariable String userID) {
		Optional<AppUser> user = appUserRepository.findById(userID);
		return user.get().getFavorited();
	}
	
	@GetMapping("/uploads/{userID}")
	public ArrayList<Integer> getUploads(@PathVariable String userID) {
		Optional<AppUser> user = appUserRepository.findById(userID);
		return user.get().getUploaded();
	}
	
}