package com.cs160groot.FoodFinder.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
		
//		Preferences pref1 = new Preferences(Arrays.asList("lettuce","tomato"), null, Arrays.asList("soy-free"));
//		Preferences pref2 = new Preferences();
//		Preferences pref3 = new Preferences(null, Arrays.asList("vegan"), null);
//		
//		List<Integer> upload1 = Arrays.asList(0,2,5,9);
//		List<Integer> upload2 = Arrays.asList(6,4);
//		List<Integer> upload3 = Arrays.asList(1,3);
//		
//		List<Integer> favorite1 = Arrays.asList(3,1);
//		List<Integer> favorite2 = Arrays.asList(2,3);
//		List<Integer> favorite3 = Arrays.asList(5,9);
//		
//		AppUser user1 = new AppUser("John", "Doe", "johndoe@gmail.com", "John123", "John456");
//		AppUser user2 = new AppUser("Jane", "Jam", "janejam@gmail.com", "JaneJane", "1234321");
//		AppUser user3 = new AppUser("Ben", "Brian", "benbrain1@gmail.com", "BrianBen", "123123");
//		
//		user1.setFavorited(favorite1);
//		user2.setFavorited(favorite2);
//		user3.setFavorited(favorite3);
//		
//		user1.setUploaded(upload1);
//		user2.setUploaded(upload2);
//		user3.setUploaded(upload3);
//		
//		user1.setPreferences(pref1);
//		user2.setPreferences(pref2);
//		user3.setPreferences(pref3);
//		
//		appUserRepository.save(user1);
//		appUserRepository.save(user2);
//		appUserRepository.save(user3);
	}

	@GetMapping("/{username}")
	public Optional<AppUser> getAppUser(@PathVariable String username) {
		return appUserRepository.findById(username);
	}
	
	@PostMapping
	public AppUser postAppUser(@RequestBody AppUser appUser) {
		return appUserRepository.save(appUser);
	}
	
	@GetMapping("/preferences/{username}")
	public Preferences getPreferences(@PathVariable String username) {
		Optional<AppUser> user = appUserRepository.findById(username);
		return user.get().getPreferences();
	}
	
	@GetMapping("/favorites/{username}")
	public List<Integer> getFavorites(@PathVariable String username) {
		Optional<AppUser> user = appUserRepository.findById(username);
		return user.get().getFavorited();
	}
	
	@GetMapping("/uploads/{username}")
	public List<Integer> getUploads(@PathVariable String username) {
		Optional<AppUser> user = appUserRepository.findById(username);
		return user.get().getUploaded();
	}
	
}