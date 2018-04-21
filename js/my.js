var app = new Vue({
	el:"#app",
	data:{
		uidShow:true,
	},
	mounted :function(){
		
	},
	methods:{
		outLogin: function(){
			var that = this;
			localStorage.removeItem("uid");
			that.uidShow=false;
			
		},
	},
})