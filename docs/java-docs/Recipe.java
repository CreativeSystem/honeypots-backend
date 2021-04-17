public class Recipe {
 
	private String id;
	 
	private String name;
	 
	private int preparationTime;
	 
	private User owner;
	 
	private List<Category> categories;
	 
	private Date createdAt;
	 
	private Date updatedAt;
	 
	private List<RecipeImage> images;
	 
	private List<RecipeSection> sections;
	 
	private User user;
	 
	private Category[] category;
	 
	private RecipeAction[] recipeAction;
	 
	private RecipeImage[] recipeImage;
	 
	private RecipeSection[] recipeSection;
	 
	public List<Recipe> searchByTerm() {
		return null;
	}
	 
	public Recipe createRecipe() {
		return null;
	}
	 
	public List<Recipe> getRecomendation() {
		return null;
	}
	 
	public boolean deleteRecipe() {
		return false;
	}
	 
	public Recipe updateRecipe() {
		return null;
	}
	 
	public Recipe addCategories() {
		return null;
	}
	 
}
 
