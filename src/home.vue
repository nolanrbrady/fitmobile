<template>
  <v-ons-page>
    <!-- <custom-toolbar :back-label="'Page 1'">Page 2</custom-toolbar> -->
  <div class="container">
		<div class="center head">
			<h2 class="header"><strong>Home</strong></h2>
		</div>

		<div class="module mid" @click="toWorkOut">
			<img src="https://images.pexels.com/photos/28080/pexels-photo.jpg?w=1260&h=750&auto=compress&cs=tinysrgb"/>
			<h2>WORK OUT</h2>
		</div>
		<div class="module mid" @click="toNutrition">
			<img src="https://images.pexels.com/photos/37417/diet-calorie-counter-weight-loss-health.jpg?w=1260&h=750&auto=compress&cs=tinysrgb"/>
			<h2>nutrition</h2>
		</div>
		<div class="module mid" @click="toGoals">
			<img src="https://images.pexels.com/photos/303040/pexels-photo-303040.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"/>
			<h2>Goals</h2>
		</div>
		</div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import app from './App';
	import workout from './workout.vue';
	import nutrition from './nutrition';
	import goals from './goals';

  export default {
    methods: {
      pop() {
        this.pageStack.pop();
      },
			toWorkOut(){
				this.pageStack.push(workout);
			},
			toNutrition(){
				this.pageStack.push(nutrition);
			},
			toGoals(){
				this.pageStack.push(goals);
			}
    },
    props: ['pageStack'],
    components: { customToolbar }
  }
</script>
<style>
.container{
	background-color: darkgrey;
	padding-bottom: 3vh;
}
.module {
  width: 95%;
  height: auto;
  margin: 10px 0 0 10px;
  position: relative;
}
.mid h2 {
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 2rem;
  transform: translate(-50%, -50%);
}
img{
	width: 100%;
	border-radius: 5px;
}
.card{
	background: linear-gradient(black, darkgrey);
}
.title{
	font-weight: bolder;
	text-align: center;
}
.header{
font-size: 8vh;
font-weight: bolder;
color: white;
}
.head{
	padding: 1vh 0 1vh 0;
}
.center{
	text-align: center;
}
</style>
