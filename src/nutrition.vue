<template>
  <v-ons-page class="page">
    <custom-toolbar class="toolbar"><strong>FIT Micro</strong></custom-toolbar>
    <div class="container">
	      <h2>Log Your Meal</h2>
				<div class="inputField">
					<v-ons-input styl="color: black;" v-model="spokenMealText" placeholder="A chicken breast, one cup rice, and a side of coleslaw" />
				</div>
				<div class="btnContainer">
					<v-ons-button @click="getIngredients" class="button">Get Macros</v-ons-button>
					<v-ons-button class="button">Log It</v-ons-button>
				</div>
				<div class="table">
					<v-ons-list>
						<v-ons-list-item>Calories</v-ons-list-item>
						<v-ons-list-item>Calories</v-ons-list-item>
						<v-ons-list-item>Calories</v-ons-list-item>
						<v-ons-list-item>Calories</v-ons-list-item>
						<v-ons-list-item>Calories</v-ons-list-item>
					</v-ons-list>
				</div>
		</div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import home from './home';
	import workout from './workout';
	import signup from './signup';
	import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
	import Fuse from 'fuse.js';
	import * as Ingreedy from "ingreedy-js";


  export default {
		data() {
			return{
				spokenMealText: '',
				workout: null,
				item: null,
				waterIntake: 0,
				nutritrionItems: [],
				exerciseItems: [],
				ingredientTemplate: IngredientTemplate,
				exerciseTemplate: ExerciseTemplate,
				itemData: {},
				mealItems: [],
				loading: false,
				activeTab: '',
				cumulativeNutrition: [],
				recipeIngredients: [],
				recipeURL: '',
				spokenMealText: '',
				exerciseTableFields: {
					name: {
						label: 'Name',
					},
					category: {
						label: 'Category',
						formatter: 'getExerciseCategoryName'
					},
					sets: {
						label: 'Sets',
					},
					reps: {
						label: 'Reps',
					},
					weight: {
						label: 'Weight',
					},
				},
				ingredientTableFields: {
					name: {
						label: 'Name',
					},
					calories: {
						label: 'Calories',
					},
					protein: {
						label: 'Protein',
					},
					carbohydrates: {
						label: 'Carbs',
					},
					sugar: {
						label: 'Sugar',
					},
					fat: {
						label: 'Fat',
					},
					fiber: {
						label: 'Fiber',
					},
				}
			}
		},
		computed: {
			...mapState('appState', [
				'equipmentKey',
				'exerciseKey',
				'currentExercise',
				'loggedExercises',
				'currentIngredient',
				'loggedIngredients',
				'totalWaterIntake',
			]),
			...mapGetters('appState', [
				'totalNutritionalValues',
			]),
		},
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push();
       },

			 //Grabs the nutrition information from Nutritionix
			 getIngredients() {
			//Empty the bound item to clear autocomplete
			this.item = null
			//Show loading spinner
			this.loading = true
			const headers = new Headers({
				"x-app-id": "adda92c1",
				"x-app-key": "28c9ce94a8de8a427440cb1fe4e99fcf",
				"Content-Type": "application/json"
			})
			const options = {
				method: 'POST',
				headers: headers,
				body: (
					JSON.stringify({
						"query": this.spokenMealText
					})
				),
			}
			fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, options).then(res => res.json()).then(res => {
				const nameAndServings = (name, quantity, unitName) => {
					return `${name.titleize()} (${quantity} ${unitName})`
				}
				const allFoods = res.foods.map(foodItem => {
					// Deconstruct the object and map the names to friendlier values
					const {
						food_name: name,
						nf_calories: calories,
						nf_dietary_fiber: fiber,
						nf_protein: protein,
						nf_sodium: sodium,
						nf_sugars: sugar,
						nf_total_carbohydrate: carbohydrates,
						nf_total_fat: fat,
						serving_qty,
						serving_unit,
					} = foodItem
					// Create an extractedKeys object, then map through it's entries and convert floating-point values to fixed integers
					const extractedKeys = {
						calories,
						fiber,
						protein,
						sodium,
						sugar,
						carbohydrates,
						fat
					}
					Object.entries(extractedKeys).map(([key, value]) => extractedKeys[key] = extractedKeys[key] ? parseInt(value.toFixed()) : 0)
					extractedKeys.name = nameAndServings(name, serving_qty, serving_unit);
					return extractedKeys
				})
				this.SET_NUTRITION(allFoods)
				this.loading = false
			})
		},

		getRecipeNutrition(ingredientsArray) {
	this.loading = true

	// Handles error when Nutritionix breaks due to not finding an ingredient.
	// This will happen ~15% of the time. It's not perfect.
	const handleErrors = (response) => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}

	// Map through each ingredient in the array.
	ingredientsArray.forEach(ingredient => {
		// Generate Fetch() configuration.
		const headers = new Headers({
			"x-app-id": "adda92c1",
			"x-app-key": "d73a5eae7e14c955cd683a613133ea69",
			"Content-Type": "application/json"
		})
		// Pass in ingredient to query in body.
		const options = {
			method: 'POST',
			headers: headers,
			body: (
				JSON.stringify({
					"query": ingredient
				})
			),
		}

		// Get Nutritionix data for ingredient.
		fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, options).then(handleErrors).then(res => res.json()).then(res => {
			const nameAndServings = (name, quantity, unitName) => {
				return `${name.titleize()} (${quantity} ${unitName})`
			}
			const allFoods = res.foods.map(foodItem => {
				// Deconstruct the object and map the names to friendlier values.
				const {
					food_name: name,
					nf_calories: calories,
					nf_dietary_fiber: fiber,
					nf_protein: protein,
					nf_sodium: sodium,
					nf_sugars: sugar,
					nf_total_carbohydrate: carbohydrates,
					nf_total_fat: fat,
					serving_qty,
					serving_unit,
				} = foodItem
				// Create an extractedKeys object, then map through it's entries and convert floating-point values to fixed integers
				const extractedKeys = {
					calories,
					fiber,
					protein,
					sodium,
					sugar,
					carbohydrates,
					fat
				}
				Object.entries(extractedKeys).map(([key, value]) => extractedKeys[key] = extractedKeys[key] ? parseInt(value.toFixed()) : 0)
				extractedKeys.name = nameAndServings(name, serving_qty, serving_unit);
				return extractedKeys
			})

			// Push each ingredient's nutritional values into temporary cumulativeNutrition variable in data
			this.cumulativeNutrition.push(allFoods)
		}).catch(err => console.log(err))
	})
	// Debug, log cumulative nutrition
	console.log(cumulativeNutrition)
},
     },
     props: ['pageStack'],
     components: { customToolbar }
  }
</script>
<style scoped>
.container{
	flex: 1;
	height: 100%;
	padding-top: 10vh;
	text-align: center;
}
.toolbar{

}
h2{
	font-weight: bolder;
	font-family: 'bebas neue';
	font-size: 5vh;
}
.button {
	margin-top: 5vh;
	width: 30vw;
	height: auto;
}
input {
	text-align: center;
	font-size: 3vh;
	width: 90vw;
	color: black;
	border-bottom: 1px solid black;
}
.inputField {
	width: 90vw;
}
</style>
