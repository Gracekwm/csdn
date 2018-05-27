# csdn
####  项目整体使用的渲染技术是vue。简单的实现了注册登录；查看文章详情；关注博主（取消关注博主）；收藏文章（取消收藏文章）；发布文章；编辑修改发布的文章；删除发布的文章，管理我的信息（关注的博主，关注的文章等等）等功能。
#### `1.登录及注册`<br>
* 可以从主页或者详情页右上的“登录”接口进入登录页面login.html,如果没有账号，点击界面上“注册账号”，进入注册界面register.html <br>
* login.html和register.html都是使用`bootstart`框架来写。
##### A.注册
* 注册时，用户需提供自己的"邮箱/手机号"，"密码"，"用户名"，然后点击“注册”按钮，触发注册事件。
触发注册事件之后先用clickLogin（）函数判断用户所填信息是否合理，不合理就不调用注册接口，减少服务器访问次数，合理则调用getData（）函数进行注册。
```
clickLogin: function(){
	var dataLogin= {
		'phone':this.phone,
		'password':this.password,
		'uname':this.userName
	}

	if(this.phone==null){
		alert("邮箱/手机号不能为空哦(⊙o⊙)");
		return false;	
	}
	if(this.password==null){
		alert("密码不能为空哦(⊙o⊙)");
		return false;	
	}
	if(this.uname==null){
		alert("用户名不能为空哦(⊙o⊙)");
		return false;	
	}
	this.getData(dataLogin);
	}
```
这里getData（）接受的参数是一个对象的形式，是clickLogin（）里面定义的dataLogin，当getData（）接收到这个参数之后，有把其赋给ajax的data
```
getData: function(dataObj){
	var that = this;
	$.ajax({
		url:"http://egblog.com/api/user/doreg",
		type:"post",
		dataType:"json",
		data:dataObj,
		success:function(res){
			var a= res;
			console.log(a);
		},
		error:function(error){
			alert("没有取到数据~~~~(>_<)~~~~");
		},
	}); 
}
```
##### B.登录
登录同注册同理。
##### 登录或注册后保存用户信息到本地（用户名、头像、id）,以供后面的收藏文章，关注博主等使用。
```
success:function(res){
	alert("登录成功，返回浏览页面");
	window.localStorage.setItem("uid",res.data.data.id);
	window.localStorage.setItem("uimg",res.data.data.image);
	window.localStorage.setItem("uname",res.data.data.uname);
	window.history.back(-1);
},
```
#### `2．查看文章详情：（infor.html页面）`<br>
* 查看详情需要知道文章的id和分类的id（后`相关文章`推荐要用分类id）从首页传一个文章的文章id号（id）和分类的id号（classify_id），然后根据文章id号取到文章内容。
  * 这两个id号用是用地址栏传参的方式从首页传过来的，在详情页对地址栏进行
  * 用getSearchData()函数进行解析
  ```
    function getSearchData(){
	var qs=(location.search.length > 0 ? location.search.substring(1) : "");
    var args={};
    itemm = qs.length ? qs.split("&") : [],
    item=null,
    name=null,
    value=null,
    i=0;
    len=itemm.length;
    for(i=0;i<len;i++){
         item = itemm[i].split("=");
         name = decodeURIComponent(item[0]);
         value = decodeURIComponent(item[1]);
         if(name.length){
             args[name] = value;
         }
     }
    return args;
   }
   ```
   
   	* 然后用ajax的方法取到数据详情页所需数据，保存取到的数据就可以进行渲染了<br>
    ```
    	getData: function(){
			var that = this;
		    that.uId = window.localStorage.getItem("uid");
			$.ajax({
				url:"http://egblog.com/api/blog/info",
				type:"get",
				dataType:"json",
				data:{
					'id':getSearchData().id,
					'classify_id':getSearchData().classfy,
				},
				success:function(res){
					that.blog_info = res.data.blog_info;
					that.uId = res.data.blog_info.id;
					that.related_blog = res.data.related_blog;
					that.content = res.data.blog_info.content;
				},
				error: function(error){
					alert("详细信息获取错误")
				},
			});
		},	
    ```
#### `3．收藏博客（取消收藏博客）`<br>
* 关注 和取消关注博主都是要在已经登录的情况下
#####	Ａ．收藏博客(infor.html)
点击页面上的收藏按钮，触发收藏事件
* 因为博客的id是唯一的，所以收藏用到的博客地就可以了
	* 博客id是进入详情页就可以直接取到的，然后调取收藏借口，收藏成功<br>
```
colleCtion: function(){
	var blogId = this.blog_info.id;
	$.ajax({
		url:"http://egblog.com/api/collect/doadd",
		type:"post",
		dataType:"json",
		data:{
			'user_id':that.uId,
			'blog_id':blogId,
		},
		success:function(res){
			alert("已关注博主")
		},
		error:function(error){
			alert("没有取到数据~~~~(>_<)~~~~");
		},
	});
},
```
#####	B．取消收藏博客（从my.html点击“我的收藏”进入到collection.html页面）

我的收藏页面显示自己收藏过的所有文章<br>
点击页面上想要取消收藏文章相应的取消收藏按钮，取消收藏，原理同收藏博客<br>
#### `4． 收藏文章（取消收藏文章）`<br>
* 同关注博主（取消关注博主）原理类似。
#### `5． 发布文章（博客）`<br>
* 可以从我的（my.thml）页面，点击写博客，进入发布文章（editor.html）页面。
* 进入页面之后，用户需要输入标题，内容和选择博客分类。
* 内容使用百度编辑器完成，用户可以根据自己的需要随心设置文章的样式。
* 编辑完成之后点击“发布博客”按钮，完成发布博客。
* 用getUeditorContent()函数获得百度编辑器的内容
```
getUeditorContent: function(){
	return UE.getEditor('editor').getContent();
}
```
* 同样的，点击“发布博客”按钮触发事件的时候也是需要判断用户输入信息的合法性的，不合法就停止执行下面的代码。
```
clickPublish: function(){
	var that = this;
	var cont = that.getUeditorContent();
	console.log(cont);
	var userId = window.localStorage.getItem("uid");
	console.log(userId);
	console.log(that.title);
	if(that.title.length==0||cont.length==0){
		alert("标题/内容不能为空");
		return false;
	}else{
	};
	$.ajax({
		url:"http://egblog.com/api/blog/addblog",
		type:"post",
		dataType:"json",
		data:{
			'title':that.title,
			'content':cont,
			'classify_id':that.class_id,
			'user_id':userId,
		},
		success: function(res){
			if(res.error_code == 0){
				alert("发布成功即将跳转。。。。。。");
				// window.location.href="./manage.html"
			}else {
				alert(res.message);
			}
	},
	error: function(error){
		alert("连接错误！！！")
	},
	});
}
```
#### `6．编辑修改发布的文章`<br>
* 可以从我的（my.thml）页面，点击“我的博客”，进入我的博客（personal.html）页面，然后点击相应博客的编辑按钮转编辑博客即文章（editor.html）页面。
* 编辑修改发布的文章和发布文章用的是同一个界面，只是从编辑接口进来的时候带着文章的id号，在发布文章界面需要判断一下是否有文章id，如果有，就根据文章id找到那篇文章，然后把标题，内容和文章分类赋值到页面上。
* 百度编辑器的赋值方式为(内容需要赋值到编辑器里面)
```
$(document).ready(function(){  
var ue = UE.getEditor('editor');  
var proinfo=that.content;    
ue.ready(function() {//编辑器初始化完成再赋值  
    ue.setContent(proinfo);  //赋值给UEditor  
});
```
* 更改完毕点击"编辑博客"按钮，完成编辑。
* "编辑博客"和"发布博客"按钮的控制如下（isShowPublish初始值都为true,isShowEditor初始值都为false）
```
<div class="publish" v-show="isShowPublish">
	<input @click="clickPublish" type="button" class="btn-pub" value="发布博客">
</div>
<div class="publish" @click="clickUpdata" v-show="isShowEditor">
	<input  type="button" class="btn-pub" value="编辑博客">
</div>
```
* 当判断为编辑修改模式后就把isShowPublish设置为false,isShowEditor设置为true.编辑博客样式出现，发布博客样式隐藏
#### `7.其他`
* 其他涉及内容的原理大多同上述情况相似，不作一一描述。
