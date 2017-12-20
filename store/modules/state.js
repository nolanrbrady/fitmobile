import fakeState from '../fakeStateFitnessNutrition';
import App from '../../App.vue';

//Initial State
const state = {
	equipmentKey: fakeState.equipmentKey,
	muscleKey: fakeState.muscleKey,
	assesmentVitals: [],
	currentExercise: {},
	loggedExercises: [],
	currentIngredients: [],
	loggedIngredients: [],
	stravaProfile: {},
	stravaActivity: {},
	stravaRuns: [],
	totalWaterIntake: 0,
	stravaRides: [],
	userZones: {},
}
// Getters - Computed methods for state vars (filter, etc.) here
const getters = {
	currentNutritionalValues: state => {
		const fat = state.currentIngredients.map(ingredient => ingredient.fat).reduce((a,b) => {return a + b}, 0)
		const fiber = state.currentIngredients.map(ingredient => ingredient.fiber).reduce((a,b) => {return a + b}, 0)
		const sugar = state.currentIngredients.map(ingredient => ingredient.sugar).reduce((a,b) => {return a + b}, 0)
		const protein = state.currentIngredients.map(ingredient => ingredient.protein).reduce((a,b) => {return a + b}, 0)
		const calories = state.currentIngredients.map(ingredient => ingredient.calories).reduce((a,b) => {return a + b}, 0)
		const carbohydrates = state.currentIngredients.map(ingredient => ingredient.carbohydrates).reduce((a,b) => {return a + b}, 0)
		return { fat, fiber, sugar, protein, calories, carbohydrates}
	},
	totalNutritionalValues: state => {
		const totalFat = state.loggedIngredients.map(ingredient => ingredient.fat).reduce((a,b) => {return a + b}, 0)
		const totalFiber = state.loggedIngredients.map(ingredient => ingredient.fiber).reduce((a,b) => {return a + b}, 0)
		const totalSugar = state.loggedIngredients.map(ingredient => ingredient.sugar).reduce((a,b) => {return a + b}, 0)
		const totalProtein = state.loggedIngredients.map(ingredient => ingredient.protein).reduce((a,b) => {return a + b}, 0)
		const totalCalories = state.loggedIngredients.map(ingredient => ingredient.calories).reduce((a,b) => {return a + b}, 0)
		const totalCarbohydrates = state.loggedIngredients.map(ingredient => ingredient.carbohydrates).reduce((a,b) => {return a + b}, 0)
		return { totalFat, totalFiber, totalSugar, totalProtein, totalCalories, totalCarbohydrates}
	},
}
// Actions - Functions which perform operations and then call a Mutation
const actions = {
	// Get Excercise info and pass it into the card
	GET_EXERCISE_INFO: ({ commit, state }, exerciseId) => {
		fetch(`https://wger.de/api/v2/exerciseinfo/${exerciseId}.json`).then(res => res.json()).then(res => {
			let musclesWorkedPrimary = [];
			let musclesWorkedSecondary = [];
			let equipmentNeeded = [];

			if (res.equipment.length) {
				equipmentNeeded = res.equipment.map(equipment => equipment.name)
			}

			musclesWorkedPrimary = res.muscles.map(muscle => muscle.name)

			if (res.muscles_secondary.length) {
				musclesWorkedSecondary = res.muscles_secondary.map(muscle => muscle.name)
			}

			res['description'] = res.description.replace(/<\/?[^>]+(>|$)/g, "");
			res['equipmentNeeded'] = equipmentNeeded
			res['musclesWorkedPrimary'] = musclesWorkedPrimary
			res['musclesWorkedSecondary'] = musclesWorkedSecondary
			commit('SET_EXERCISE', res)
		})
	},
	// Get Nutrition Info and post it to the nutrition Cards
	//Need to finish wiring this up to the API and PersonalLog.vue page
	GET_INGREDIENT_INFO: ({ commit, state }, nutritionId) => {
		fetch(`https://wger.de/api/v2/ingredient/${nutritionId}.json`).then(res => res.json()).then(res => {
			res.fat = parseFloat(res.fat).toFixed()
			res.fibres = parseFloat(res.fibres).toFixed()
			res.sodium = parseFloat(res.sodium).toFixed()
			res.protein = parseFloat(res.protein).toFixed()
			res.carbohydrates = parseFloat(res.carbohydrates).toFixed()
			res.fat_saturated = parseFloat(res.fat_saturated).toFixed()
			res.carbohydrates_sugar = parseFloat(res.carbohydrates_sugar).toFixed()
			commit('SET_NUTRITION', res)
		})
	},

	GENERATE_WORKOUT_ROUTINE: ({ commit, state }, bodypartArray) => {
		fetch('http://localhost:1337/exercise').then(res => res.json()).then(exercises => {
			const workout = {}
			const workoutArray = [
				{bodypart: 'Bicep', numExercises: 1, 'sets': 3, reps: 8},
				{bodypart: 'Tricep', numExercises: 2, 'sets': 3, reps: 8},
				{bodypart: 'Legs', numExercises: 1, 'sets': 3, reps: 8},
			]
			workoutArray.forEach(routineObject => {
				// Filter and shuffle exercises, now [0], [1] will be random
				let filteredExercises = exercises.filter(exercise => exercise.bodyparts.includes(routineObject.bodypart))
				filteredExercises.sort(() => { return 0.5 - Math.random() })

				let exercisesByBodypart = []
				for(let x = 0; x < routineObject.numExercises; x++) {
					let routineExercise = {
						name: filteredExercises[x].name,
						sets: routineObject.sets,
						reps: routineObject.reps
					}
					exercisesByBodypart.push(routineExercise)
				}
				workout[routineObject.bodypart] = exercisesByBodypart
			})
			console.log(workout)
		})
	}
}
// Mutations - The only way to change state
const mutations = {
	SET_EXERCISE(state, exerciseObject) {
		state.currentExercise = exerciseObject
	},
	SET_NUTRITION(state, ingredientsArray) {
		state.currentIngredients = ingredientsArray
	},
	ADD_EXERCISE(state, exerciseObject) {
		state.loggedExercises.push(exerciseObject)
	},
	ADD_INGREDIENTS(state, ingredientsArray) {
		ingredientsArray.forEach(ingredient => state.loggedIngredients.push(ingredient))
	},
	SET_STRAVA_PROFILE (state, profile) {
		state.stravaProfile = profile
	},
	SET_STRAVA_ACTIVITY (state, activity) {
		state.stravaActivity = activity
	},
	SET_USER_ZONES (state, zones) {
		state.userZones = zones
	},
	SET_ASSESMENT_VITALS (state, value) {
		state.assesmentVitals = value
	},
	SET_STRAVA_RUN (state, runs) {
		state.stravaRuns.push(runs)
	},
	SET_STRAVA_RIDE (state, rides) {
		state.stravaRides.push(rides)
	},
	ADD_WATER_INTAKE(state){
		state.totalWaterIntake++
	}
}

export default { state, getters, actions, mutations, namespaced: true }
