# Recipe graphql api made using NODEJS ,MONGODB as database

The API is hosted on Vercel with endpoint as : [https://graphql-recipe-api.vercel.app/](https://graphql-recipe-api.vercel.app/)

It provides the following ablity:

- [Create Recipes ](#create)
- [ Get recipes by quantity ](#amount)
- [ Get recipes by ID ](#id)
- [ Edit recipes](#edit)
- [ Delete recipes ](#delete)


## Create Recipes  <a id="create"></a>
You can test the api in postman, as shown in following image. 

![image](https://github.com/rohanayush/graphql-recipe-api/assets/19414281/04a12337-6274-4682-8cce-f608e20a7e95)

#### Query 
```graphql
mutation CreateRecipe($recipeInput: RecipeInput) {
  createRecipe(recipeInput: $recipeInput) {
    createdAt
    description
    name
    thumbsDown
    thumbsUp
  }
}

```
#### Variables
```json
{
  "recipeInput": {
    "name": "Methi aaloo ",
    "description": "Sabji made from methi saag and potato"
  }
}

```

## Get Recipes By Quantity  <a id="amount"></a>

#### Query 
```graphql
query GetRecipes($amount: Int) {
  getRecipes(amount: $amount) {
    description
    createdAt
    name
    thumbsDown
    thumbsUp
  }
}

```
#### Variables
```json
{
  "amount": 5
}

```
#### Output
``` json {
    "data": {
        "getRecipes": [
            {
                "description": "Sabji made from methi saag and potato",
                "createdAt": "2024-04-29T08:13:14.954Z",
                "name": "Methi aaloo ",
                "thumbsDown": 0,
                "thumbsUp": 0
            },
            {
                "description": "Aata maggie",
                "createdAt": "2024-04-29T07:18:40.632Z",
                "name": "Raj",
                "thumbsDown": 0,
                "thumbsUp": 0
            },
            {
                "description": "Magie hot oil recipe",
                "createdAt": "2024-04-29T07:18:26.327Z",
                "name": "Abhijeet",
                "thumbsDown": 0,
                "thumbsUp": 0
            },
            {
                "description": "Maggie masala mirch recipe",
                "createdAt": "2024-04-29T07:18:03.462Z",
                "name": "Rohan",
                "thumbsDown": 0,
                "thumbsUp": 0
            }
        ]
    }
}
```

## Get Recipes By ID  <a id="id"></a>

#### Query 

```graphql
query GetRecipes($id: ID!) {
  recipe(ID: $id) {
    description
    name
  }
}

```
#### Variables

```json
{
  "id": "662f49ab3de80d7ebecfcf86"
}
```
#### Output

```json {
    "data": {
        "recipe": {
            "description": "Maggie masala mirch recipe",
            "name": "Rohan"
        }
    }
}
```

## Edit Recipes By ID  <a id="edit"></a>

#### Query 
```graphql
mutation EditRecipe($id: ID!, $recipeInput: RecipeInput) {
  editRecipe(ID: $id, recipeInput: $recipeInput)
}

```
#### Variables
```json
{
  "id": "662f49ab3de80d7f",
  "recipeInput": {
   "description": "Maggie masala mirch recipe",
            "name": "Rohan"
  }
}
```
#### Output
```json
{
    "data": {
        "editRecipe": true
    }
}
}
```

## Delete Recipes By ID  <a id="delete"></a>

#### Query 
```graphql
mutation DeleteRecipe($id: ID!) {
  deleteRecipe(ID: $id)
}

```
#### Variables
```json
{
  "id": "662f49ab80d7f"
}
```
#### Output
```json
{
    "data": {
        "deleteRecipe": true
    }
}

```

