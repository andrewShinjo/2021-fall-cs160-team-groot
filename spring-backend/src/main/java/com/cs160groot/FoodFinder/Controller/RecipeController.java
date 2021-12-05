package com.cs160groot.FoodFinder.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cs160groot.FoodFinder.Entity.AppUser;
import com.cs160groot.FoodFinder.Entity.Recipe;
import com.cs160groot.FoodFinder.Repository.AppUserRepository;
import com.cs160groot.FoodFinder.Repository.RecipeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
	@Autowired
	private RecipeRepository recipeRepository;
	
	private AppUserRepository appUserRepository;
	
	private MongoTemplate mongoTemplate;
	
	
	public RecipeController(RecipeRepository recipeRepository, AppUserRepository appUserRepository, MongoTemplate mongoTemplate)
	{
		this.recipeRepository = recipeRepository;
		this.appUserRepository = appUserRepository;
		this.mongoTemplate = mongoTemplate;
		
		/*
		List<String> ingredients1 = Arrays.asList("tomato","cucumber","lettuce","carrot","salad dressing", "salt","pepper");
		List<String> menu1 = Arrays.asList("Vegetarian","Vegan");
		List<String> restrictions1 = Arrays.asList("gluten-free","peanut-free");
		List<String> directions1 = Arrays.asList("Mix vegetables in a large bowl.","Top with salad dressing of choice.","Serve.");
		Recipe r1 = new Recipe(0,"Fresh Salad",100,ingredients1,
				directions1,menu1,restrictions1,100,10);
		
		
		List<String> ingredients2 = Arrays.asList("bean","cheese","tortilla");
		List<String> menu2 = Arrays.asList("Vegetarian");
		List<String> restrictions2 = Arrays.asList("gluten-free","peanut-free");
		List<String> directions2 = Arrays.asList("Warm tortilla.","Bake beans.","Wrap beans and cheese in tortilla.","Serve.");
		Recipe r2 = new Recipe(2,"Bean Burrito",100,ingredients2,
				directions2,menu2,restrictions2,200,20);
		
		List<String> ingredients3 = Arrays.asList("fish", "tortilla","bean","cheese","lettuce","tomato");
		List<String> menu3 = Arrays.asList("Pescatarian");
		List<String> restrictions3 = Arrays.asList("gluten-free","peanut-free");
		List<String> directions3 = Arrays.asList("Prepare fish.","Warm tortilla.","Wrap ingredients in tortilla.","Serve.");
		Recipe r3 = new Recipe(4,"Fish Taco",200,ingredients3,
				directions3,menu3,restrictions3,300,30);
		
		
		List<String> ingredients4 = Arrays.asList("orange","banana","apple","grape");
		List<String> menu4 = Arrays.asList("Vegetarian","Vegan");
		List<String> restrictions4 = Arrays.asList("gluten-free","peanut-free","fat-free");
		List<String> directions4 = Arrays.asList("Dice the fruits.","Mix fruits in a large bowl.","Serve.");
		Recipe r4 = new Recipe(1,"Fruit Salad",300,ingredients4,
				directions4,menu4,restrictions4,100,10);
		
		List<String> ingredients5 = Arrays.asList("fish", "flour","spice");
		List<String> menu5 = Arrays.asList("Pescatarian");
		List<String> restrictions5 = Arrays.asList("peanut-free");
		List<String> directions5 = Arrays.asList("Coat fish in flour and spice mixture.","Fry fish.","Serve.");
		Recipe r5 = new Recipe(3,"Fish Sticks",300,ingredients5,
				directions5,menu5,restrictions5,300,60);
		
		List<String> ingredients6 = Arrays.asList("potato","chives","salt","pepper","oregano", "olive oil");
		List<String> menu6 = Arrays.asList("Vegetarian","Vegan");
		List<String> restrictions6 = Arrays.asList("gluten-free","peanut-free");
		List<String> directions6 = Arrays.asList("Roast potatoes in olive oil over low heat.","Coat with herbs and mix.","Serve.");
		Recipe r6 = new Recipe(6,"Herb-Roasted Potatoes",200,ingredients6,
				directions6,menu6,restrictions6,500,30);
		
		
		List<String> ingredients7 = Arrays.asList("noodle","soy sauce","peanut","thai chili");
		List<String> menu7 = Arrays.asList("Vegetarian","Vegan");
		List<String> restrictions7 = Arrays.asList("gluten-free");
		List<String> directions7 = Arrays.asList("Soak noodles for 20 minutes.","Drain noodles and let sit for 10 minutes.","Sautee noodles with soy sauce, peanuts, and thai chilis.","Serve.");
		Recipe r7 = new Recipe(5,"Chow Mein",400,ingredients7,
				directions7,menu7,restrictions7,500,30);
		
		List<String> ingredients8 = Arrays.asList("cauliflower", "dough", "tomato", "mushroom", "cheese");
		List<String> menu8 = Arrays.asList("Vegetarian");
		List<String> restrictions8 = Arrays.asList("peanut-free");
		List<String> directions8 = Arrays.asList("Finely chop cauliflower.","Create pizza crust and base using chopped cauliflower.","Top with cheese, tomato, and mushrooms.","Bake for an hour.","Serve.");
		Recipe r8 = new Recipe(9,"Cauliflower Crust Pizza",400,ingredients8,
				directions8,menu8,restrictions8,1000,60);
		
		
		recipeRepository.save(r1);
		recipeRepository.save(r2);
		recipeRepository.save(r3);
		recipeRepository.save(r4);
		recipeRepository.save(r5);
		recipeRepository.save(r6);
		recipeRepository.save(r7);
		recipeRepository.save(r8);
		*/
		
	}
	
	// API to create a recipe and save to database
	@PostMapping
	public Recipe createRecipe(@RequestBody Recipe recipe)
	{
		return recipeRepository.save(recipe);
	}
	
	// API to retrieve all recipes in the database
	@GetMapping
	public List<Recipe> getRecipes()
	{
		return recipeRepository.findAll();
	}
	
	/* API to find a recipe by providing a specific recipeID
	 * Example: localhost:8080/api/recipe/1
	 */
	@GetMapping("/{recipeID}")
	public Optional<Recipe> getRecipeById(@PathVariable int recipeID)
	{
		return recipeRepository.findById(recipeID);
	}
	
	
	
	/* API to retrieve a list of recipes by providing one or more recipeIDs
	 * Example: localhost:8080/api/recipe/ids?id=1,2,3
	 */
	@GetMapping("/ids")
	public List<Optional<Recipe>> getRecipesByIds(@RequestParam List<String> id)
	{
		List<Optional<Recipe>> ret = new ArrayList<>();
		for (int i = 0;i<id.size();i++)
		{
			ret.add(recipeRepository.findById(Integer.parseInt(id.get(i))));
		}
		return ret;
			
	}
	
	
	/* API to retrieve a list of recipes by providing one ore more ingredients. Recipes that contain at least one of the ingredients are returned
	 * Example: localhost:8080/api/recipe/ingredients?ingredient=lettuce,carrots
	 */
	@GetMapping("/ingredients")
	public List<Optional<Recipe>> getRecipesByIngredients(@RequestParam List<String> ingredient)
	{
		
		return recipeRepository.findByIngredientsIn(ingredient);
			
	}
	
	/* API to retrieve a list of recipes by providing one or more menus (type of diet). Recipes that belong to at least one of the menus are returned
	 * Example: localhost:8080/api/recipe/menu?menu=vegetarian,vegan
	 */
	@GetMapping("/menu")
	public List<Optional<Recipe>> getRecipesByMenus(@RequestParam List<String> menu)
	{
		
		return recipeRepository.findByMenuIn(menu);
			
	}
	
	
	/* API to retrieve a list of recipes that have the exact restrictions passed in
	 * Example: localhost:8080/api/recipe/restrictions?restriction=soy-free,gluten-free
	 */
	@GetMapping("/restrictions")
	public List<Recipe> getRecipesByRestrictions(@RequestParam List<String> restriction)
	{
		
		Query query = new Query();
		query.addCriteria(Criteria.where("restrictions").is(restriction));
		List<Recipe> result = mongoTemplate.find(query, Recipe.class);
		return result;
	}
	
	/* API to let a user favorite a recipe and have the recipe added to their list of favorites
	 * Example: localhost:8080/api/recipe/favorite/userID=1/recipeID=4
	 */
	@GetMapping("/favorite/userID={userID}/recipeID={recipeID}")
	public AppUser favoriteRecipe(@PathVariable String userID, @PathVariable int recipeID) throws Exception
	{
		AppUser user = appUserRepository.findById(userID)
				.orElseThrow(()-> new Exception("User with id: "+userID+" not found."));
		ArrayList<Integer> favorites = new ArrayList<>();
		favorites = user.getFavorited();
		favorites.add(recipeID);
		user.setFavorited(favorites);
		return appUserRepository.save(user);
		
		
	}
	
	/* API to retrieve a list of recipes by providing one or more recipe names
	 * Example: localhost:8080/api/recipe/names?name=pasta,salad,fries
	 */
	@GetMapping("/names")
	public List<Optional<Recipe>> getRecipesByNames(@RequestParam List<String> name)
	{
		return recipeRepository.findByNameIn(name);
	}
	
	/* API to retrieve a list of recipes by providing info from multiple categories
	 * Example: localhost:8080/api/recipe/search?name=pasta&menu=vegan&restriction=peanut-free,fat-free
	 * If you want to leave one of the categories empty, format like this: Ex (to leave name empty): http://localhost:8080/api/recipe/search?name=&menu=veggie,vegan&restriction=soy-free,gluten-free
	 */
	@GetMapping("/search")
	public List<Recipe> search(@RequestParam List<String> name, @RequestParam List<String> menu, @RequestParam List<String> restriction)
	{
		
		Query query = new Query();
		List<Criteria> recipeCriteria = new ArrayList<>();
		if (!name.isEmpty())
		{
		recipeCriteria.add(Criteria.where("name").in(name));
		}
		if (!menu.isEmpty())
		{
		recipeCriteria.add(Criteria.where("menu").in(menu));
		}
		if (!restriction.isEmpty())
		{
		recipeCriteria.add(Criteria.where("restrictions").is(restriction));
		}
		query.addCriteria(new Criteria().andOperator(recipeCriteria.toArray(new Criteria[recipeCriteria.size()])));
		List<Recipe> result = mongoTemplate.find(query, Recipe.class);
		return result;
		
		
	}
	
	
	
	
	
	
	
	
	
	
}
