<template>
  <v-ons-page class="page">
    <custom-toolbar><strong>FIT Micro</strong></custom-toolbar>
    <div class="container">
	      <h2>Welcome to FIT</h2>
				<br />
				<v-ons-input class="input" placeholder="Name" v-model="name"></v-ons-input>
				<br />
				<v-ons-input class="input" placeholder="Email" v-model="email"></v-ons-input>
				<br />
				<v-ons-input class="input" placeholder="Password" v-model="password"></v-ons-input>
				<v-ons-button @click="push">SIGN UP</v-ons-button>
		</div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import home from './home';
  export default {
		data(){
			return{
			'password': '',
			'name': '',
			'email': '',
			}
		},
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push(home);
       }
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
h2{
	font-weight: bolder;
	font-size: 5vh;
}
.fit{
	color: #FD7F23;
	font-weight: bolder;
}
.input{
	border-bottom: 1px solid black;
	text-align: center;
}
.input::placeholder{
	text-align: center;
}
.button{
	margin-top: 5vh;
	width: 50vw;
	height: auto;
}
</style>
