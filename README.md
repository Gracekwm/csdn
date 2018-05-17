# csdn
#### 项目整体使用的渲染技术是vue。简单的实现了查看文章详情；关注博主（取消关注博主）；收藏文章（取消收藏文章）；发布文章；编辑修改发布的文章；删除发布的文章等功能。
`１．查看文章详情：（infor.html页面）`<br>
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
