package com.cs160groot.FoodFinder.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Document(collection = "user")
public class AppUser {
	@Id
	private String _id;
	@NotBlank
	@Email
	private String email;
	@NotBlank
	private String password;
	
	@DBRef
	private Set<Role> roles = new HashSet<>();
	
	public AppUser() {}
	
	public AppUser(String _id, String email, String password) {
		this._id = _id;
		this.email = email;
		this.password = password;
	}
	
	// getter methods
	
	public String getId() {
		return _id;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public Set<Role> getRoles() {
		return roles;
	}
	
	// setter methods
	
	public void setId(String _id) {
		this._id = _id;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
