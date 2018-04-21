var app = new Vue({
	el:"#app",
	data:{
		phone:null,
		password:null,
	},
	mounted: function(){
		
	},
	methods:{
		clickLogin: function(){
			var dataLogin= {
				'phone':this.phone,
				'password':this.password,
			}
			if(this.phone==null){
				alert("用户名/邮箱/手机号不能为空哦(⊙o⊙)");
				return false;	
			}
			if(this.password==null){
				alert("密码不能为空哦(⊙o⊙)");
				return false;	
			}
			this.getData(dataLogin);
		},
		getData: function(dataObj){
			var that = this;
			$.ajax({
				url:"http://egblog.com/api/user/dologin",
				type:"post",
				dataType:"json",
				data:dataObj,
				success:function(res){
					alert("登录成功，返回浏览页面");
					window.localStorage.setItem("uid",res.data.data.id);
					window.localStorage.setItem("uimg",res.data.data.image);
					window.localStorage.setItem("uname",res.data.data.uname);
    				window.history.back(-1);
				},
				error:function(error){
					alert("没有取到数据~~~~(>_<)~~~~");
				},
			}); 
		},

	},
})