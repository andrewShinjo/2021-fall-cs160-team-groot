package com.cs160groot.FoodFinder.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs160groot.FoodFinder.Entity.AppUser;
import com.cs160groot.FoodFinder.Repository.UserRepository;



@CrossOrigin(origins = "http://172.26.139.41:3000/")
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private final UserRepository userRepository;
	
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
		
	}
	
	@GetMapping("/hello")
	public String getHello() {
		return "Goodbye";
	}
	
	@GetMapping
	public Iterable<AppUser> getUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<AppUser> getUserById(@PathVariable String id) {
		return userRepository.findById(id);
	}
	
	@PostMapping
	public AppUser postUser(@RequestBody AppUser user) {
		return userRepository.save(user);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<AppUser> postUser(@PathVariable String id, @RequestBody AppUser user) {
		return (
				userRepository.existsById(id)) ?
						new ResponseEntity<>(userRepository.save(user), HttpStatus.OK) :
						new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable String id) {
		userRepository.deleteById(id);
	}
}
