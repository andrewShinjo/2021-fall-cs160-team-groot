package com.cs160groot.FoodFinder.Entity;

import java.util.List;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "recipe")
public class Recipe {
	@Id
	private int recipeID;
	private String name;
	private String authorName;
	private List<String> ingredients;
	private List<String> directions;
	private List<String> menu;
	private List<String> restrictions;
	private int calorieCount;
	private int prepTime;
	
	public Recipe() {}
	
	public Recipe(int recipeID, String name, String authorName, List<String> ingredients, List<String> directions, List<String> menu, List<String> restrictions, int calorieCount, int prepTime) {
		this.recipeID = recipeID;
		this.name = name;
		this.authorName = authorName;
		this.ingredients = ingredients;
		this.directions = directions;
		this.menu = menu;
		this.restrictions = restrictions;
		this.calorieCount = calorieCount;
		this.prepTime = prepTime;
	}
	
	// getters
	
	public int getRecipeID() {
		return recipeID;
	}
	
	public String getName() {
		return name;
	}
	
	public String getAuthorName() {
		return authorName;
	}
	
	public List<String> getIngredients() {
		return ingredients;
	}
	
	public List<String> getDirections() {
		return directions;
	}
	
	public List<String> getMenu() {
		return menu;
	}
	
	public List<String> getRestrictions() {
		return restrictions;
	}
	
	
	
	public int getCalorieCount() {
		return calorieCount;
	}
	
	public int getPrepTime() {
		return prepTime;
	}
	
	// setters
	
	public void setRecipeID(int recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}
	
	public void setDirections(List<String> directions) {
		this.directions = directions;
	}
	
	public void setMenu(List<String> menu) {
		this.menu = menu;
	}
	
	public void setRestrictions(List<String> restrictions) {
		this.restrictions = restrictions;
	}
	
	public void setCalorieCount(int calorieCount) {
		this.calorieCount = calorieCount;
	}
	
	public void setPrepTime(int prepTime) {
		this.prepTime = prepTime;
	}
	
	
	
}
