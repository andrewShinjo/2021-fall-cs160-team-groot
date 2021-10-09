package com.cs160groot.FoodFinder.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class AppUser {
	@Id
	private String _id;
	private String email;
	private String password;
	
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
}
