<template>
  <v-ons-page class="page">
    <custom-toolbar class="toolbar"><strong>FIT Micro</strong></custom-toolbar>
    <div class="container">
	      <h2>Welcome to <br /><span class="fit">FIT</span> Micro</h2>
				<br />
				<v-ons-input class="input" placeholder="Username" v-model="username" float></v-ons-input>
				<br />
				<v-ons-input class="input" placeholder="Password" v-model="password" float></v-ons-input>
				<br />
			<v-ons-button class="button" @click="push">SIGN IN</v-ons-button>
			<h4 @click="signUp">Create an Account!</h4>
		</div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import home from './home';
	import signup from './signup';
  export default {
		data(){
			return{
			'username': '',
			'password': '',
			}
		},
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push(home);
       },
			 signUp(){
				 this.pageStack.push(signup);
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
	background: linear-gradient(#0D6C8A, #FD7F23);
}
.toolbar{
	background-color: #0D6C8A;
	border: #0D6C8A;
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
v-ons-input::placeholder{
	text-align: center;
	font-size: 15px;
}
.button{
	margin-top: 5vh;
	width: 50vw;
	height: auto;
}
</style>
