var app = new Vue({
	el:"#app",
	data:{
		title:"",
		class_name:"",
		content:"",
		blog_info:"",
		cate:[],
		classId:null,
	},
	mounted:  function(){
		var ue = UE.getEditor('editor');
		this.getClassData();
		this.getData();
	},
	methods:{
		getClassData: function(){
			var that = this;
			$.ajax({
				url:"http://egblog.com/api/index/index",
				type:"get",
				dataType:"json",
				data:{},
				success:function(res){
					that.cate = res.data.Classifylist;
				},
				error: function(error){
					alert("分类接口连接错误")
				},
			});
		},
		getData: function(){
			var that = this;
			var num = window.location.search.split("=")[1];
			$.ajax({
				url:"http://egblog.com/api/blog/info",
				type:"get",
				dataType:"json",
				data:{
					'id':num,
				},
				success:function(res){
					that.blog_info = res.data.blog_info;
					that.uId = res.data.blog_info.id;
					that.title = res.data.blog_info.title;
					that.class_name = res.data.blog_info.classify_name;
					that.classId = res.data.blog_info.classify_id;
					that.content = res.data.blog_info.content;
					$(document).ready(function(){  
				        var ue = UE.getEditor('editor');  
				        var proinfo=that.content;    
				        ue.ready(function() {//编辑器初始化完成再赋值  
				            ue.setContent(proinfo);  //赋值给UEditor  
				        });  
				          
				    });
				},
				error: function(error){
				},
			});
		},
		getUeditorContent: function(){
    		return UE.getEditor('editor').getContent();
    	},
		clickUpdata: function(){
			var that = this;
			var num = window.location.search.split("=")[1];
			$.ajax({
				url:"http://egblog.com/api/blog/doedit",
				type:"post",
				dataType:"json",
				data:{
					'id':num,
					'content':that.getUeditorContent(),
					'classify_id':that.class_name,
					'title':that.title,
				},
				success:function(res){
					alert("修改成功");
				},
				error: function(error){
				},
			});
		},
	}
});