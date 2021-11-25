package com.cs160groot.FoodFinder.Entity;

import java.util.ArrayList;

public class Preferences {
	private ArrayList<String> ingredients;
	private ArrayList<String> diet;
	private ArrayList<String> restrictions;

	public Preferences() {
		ingredients = new ArrayList<>();
		diet = new ArrayList<>();
		restrictions = new ArrayList<>();
	}
	
	public Preferences(ArrayList<String> ingredients, ArrayList<String> diet, ArrayList<String> restrictions) {
		this.ingredients = ingredients;
		this.diet = diet;
		this.restrictions = restrictions;
	}
	
	public Preferences(ArrayList<String> diet) {
		this.ingredients = new ArrayList<>();
		this.diet = diet;
		this.restrictions = new ArrayList<>();
	}
	
	public ArrayList<String> getIngredients() {
		return ingredients;
	}
	
	public void setIngredients(ArrayList<String> ingredients) {
		this.ingredients = ingredients;
	}
	
	public ArrayList<String> getDiet() {
		return diet;
	}
	
	public void setDiet(ArrayList<String> diet) {
		this.diet = diet;
	}
	
	public ArrayList<String> getRestrictions() {
		return restrictions;
	}
	
	public void setRestrictions(ArrayList<String> restrictions) {
		this.restrictions = restrictions;
	}

}