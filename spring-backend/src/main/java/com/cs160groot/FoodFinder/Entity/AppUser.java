package com.cs160groot.FoodFinder.Entity;

import java.util.ArrayList; 
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class AppUser {
	@Id
	private String userID;
	private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	private ArrayList<Integer> uploaded;
	private ArrayList<Integer> favorited;
	private Preferences preferences;
	
	public AppUser() {}
	
	public AppUser(String firstName, String lastName, String email, String username, String password) {
		this.userID = UUID.fromString(email).toString();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
		this.uploaded = new ArrayList<>();
		this.favorited = new ArrayList<>();
		this.preferences = new Preferences();
	}
	
	public String getUserID() {
		return userID;
	}
	
	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public ArrayList<Integer> getUploaded() {
		return this.uploaded;
	}
	
	public void setUploaded(ArrayList<Integer> uploaded) {
		this.uploaded = uploaded;
	}
	
	public ArrayList<Integer> getFavorited() {
		return this.favorited;
	}
	
	public void setFavorited(ArrayList<Integer> favorited) {
		this.favorited = favorited;
	}
	
	public Preferences getPreferences(){
		return this.preferences;
	}
	
	public void setPreferences(Preferences preferences) {
		this.preferences = preferences;
	}

}