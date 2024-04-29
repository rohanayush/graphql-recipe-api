const { ApolloError, UserInputError } = require("apollo-server-errors");
const Recipe = require("../models/Recipe");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      try {
        const recipe = await Recipe.findById(ID);
        if (!recipe) {
          throw new ApolloError(`Recipe with ID: ${ID} not found`, "RECIPE_NOT_FOUND");
        }
        return recipe;
      } catch (error) {
        throw new ApolloError(`Error retrieving recipe: ${error.message}`, "RECIPE_QUERY_ERROR");
      }
    },
    async getRecipes(_, { amount = 10 }) {
      try {
        return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
      } catch (error) {
        throw new ApolloError(`Error fetching recipes: ${error.message}`, "GET_RECIPES_ERROR");
      }
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      try {
        const createdRecipe = new Recipe({
          name: name,
          description: description,
          createdAt: new Date().toISOString(),
          thumbsUp: 0,
          thumbsDown: 0,
        });
        const res = await createdRecipe.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        throw new ApolloError(`Error creating recipe: ${error.message}`, "CREATE_RECIPE_ERROR");
      }
    },
    async deleteRecipe(_, { ID }) {
      try {
        const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
        if (wasDeleted === 0) {
          throw new ApolloError(`Recipe with ID: ${ID} not found`, "RECIPE_NOT_FOUND");
        }
        return true; // successfully deleted
      } catch (error) {
        throw new ApolloError(`Error deleting recipe: ${error.message}`, "DELETE_RECIPE_ERROR");
      }
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      try {
        const wasEdited = (await Recipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
        if (wasEdited === 0) {
          throw new ApolloError(`Recipe with ID: ${ID} not found or no changes made`, "RECIPE_NOT_FOUND");
        }
        return true; // successfully edited
      } catch (error) {
        throw new ApolloError(`Error editing recipe: ${error.message}`, "EDIT_RECIPE_ERROR");
      }
    },
  },
};
