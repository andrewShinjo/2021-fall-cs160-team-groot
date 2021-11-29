package com.cs160groot.FoodFinder.Controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cs160groot.FoodFinder.Entity.AppUser;
import com.cs160groot.FoodFinder.Entity.Preferences;
import com.cs160groot.FoodFinder.Repository.AppUserRepository;
import com.cs160groot.FoodFinder.Security.AuthenticationRequest;
import com.cs160groot.FoodFinder.Security.AuthenticationResponse;
import com.cs160groot.FoodFinder.Security.JWTUtil;
import com.cs160groot.FoodFinder.Security.UserDetailsImpl;
import com.cs160groot.FoodFinder.Security.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	@Autowired
	private final AppUserRepository appUserRepository;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	private final JWTUtil jwtUtil;
	
	
	
	public AuthenticationController(AppUserRepository appUserRepository) {
		this.appUserRepository = appUserRepository;
		jwtUtil = new JWTUtil();
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody AppUser appUser) {
		if (appUserRepository.findByEmail(appUser.getEmail()).isPresent()) {
			return ResponseEntity.badRequest().body("Error: Email is already used.");
		} else if(appUserRepository.findByUsername(appUser.getUsername()).isPresent()) {
			return ResponseEntity.badRequest().body("Error: Username is already used.");
		}
		else {
			appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
			appUser.setUploaded(new ArrayList<Integer>());
			appUser.setFavorited(new ArrayList<Integer>());
			appUser.setPreferences(new Preferences());
			appUserRepository.save(appUser);
			return ResponseEntity.ok("User registered successfully.");
		}
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch(BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		final UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt, jwtUtil.extractUsername(jwt)));
	}	
}
