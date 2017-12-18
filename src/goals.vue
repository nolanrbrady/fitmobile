<template>
  <v-ons-page class="page">
    <custom-toolbar class="toolbar"><strong>FIT Micro</strong></custom-toolbar>
    <div class="container">
	      <h2>Welcome to the Goals Page</h2>
		</div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import home from './home';
	import workout from './workout';
	import nutrition from './nutrition';

  export default {
		data(){
			return{

			}
		},
     methods: {
       pop(){
         this.pageStack.pop();
       },
       push() {
         this.pageStack.push();
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
.button{
	margin-top: 5vh;
	width: 50vw;
	height: auto;
}
</style>
