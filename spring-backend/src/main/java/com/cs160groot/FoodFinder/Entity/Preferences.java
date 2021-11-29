package com.cs160groot.FoodFinder.Entity;

import java.util.ArrayList;
import java.util.List;

public class Preferences {
	private List<String> ingredients;
	private List<String> diet;
	private List<String> restrictions;

	public Preferences() {
		ingredients = new ArrayList<>();
		diet = new ArrayList<>();
		restrictions = new ArrayList<>();
	}
	
	public Preferences(List<String> list, List<String> diet, List<String> list2) {
		this.ingredients = list;
		this.diet = diet;
		this.restrictions = list2;
	}
	
	public Preferences(List<String> diet) {
		this.ingredients = new ArrayList<>();
		this.diet = diet;
		this.restrictions = new ArrayList<>();
	}
	
	public List<String> getIngredients() {
		return ingredients;
	}
	
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}
	
	public List<String> getDiet() {
		return diet;
	}
	
	public void setDiet(List<String> diet) {
		this.diet = diet;
	}
	
	public List<String> getRestrictions() {
		return restrictions;
	}
	
	public void setRestrictions(List<String> restrictions) {
		this.restrictions = restrictions;
	}

}