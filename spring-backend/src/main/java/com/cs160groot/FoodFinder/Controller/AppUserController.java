package com.cs160groot.FoodFinder.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs160groot.FoodFinder.Entity.AppUser;
import com.cs160groot.FoodFinder.Repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/signup")
public class AppUserController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
		
	public AppUserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/{email}")
	public boolean checkIfEmailAvailable(@PathVariable String email) {
		if(userRepository.findByEmail(email).isEmpty()) {
			return true;
		} else {
			return false;
		}
	}
	
	@PostMapping("/{_id}")
	public ResponseEntity<AppUser> registerUser(@PathVariable String _id, @RequestBody AppUser appUser) {
		String encodedPassword = passwordEncoder.encode(appUser.getPassword());
		appUser.setPassword(encodedPassword);
		
		return (
				userRepository.existsById(_id)) ?
						new ResponseEntity<>(userRepository.save(appUser), HttpStatus.OK) :
						new ResponseEntity<>(userRepository.save(appUser), HttpStatus.CREATED);
	}
}
