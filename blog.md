



## 首页
**简要描述：** 

- 首页接口

**请求URL：** 
- ` http://blog.com/api/index/index `

 **返回示例**

``` 
  {
    "error_code": 0,
    "message": "success",
    "data": {
    	"banner" : [
    	   {
    	      "id":10,
    	      "img" : "",
    	      "url" : "",
			  "title" : "",
    	   },
    	],
    	"blog_lists" : [
    		{
    			"id" : "",
    			"title" : "",
    			"classify_name" : "",
				"classify_id" : "",
    			"author_name" : "",
    			"read_num":"",
				"date":"",
    		}
    	],
    }
  }
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:----- |----- |
|banner  |array    |广告头图  |
|blog_lists  |array    |博客列表|



***



## 最新文章
**简要描述：** 

- 分类接口

**请求URL：** 
- ` http://blog.com/api/blog/lists `
  
**请求方式：**
- GET

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|order_type |是  |str |time 按时间排序|
|sort|是  |int|1 升序 -1降序|

 **返回示例**

``` 
  {
    "error_code": 0,
    "message": "success",
    "data": {
    	"blog_lists" : [
    	   {
    			"id" : "",
    			"title" : "",
    			"author_name" : "",
				"classify_id" : "",
    			"user_name" : "",
    			"read_num":"",
				"date":"",
    		}
    	],
   	}
  }
```

 **返回参数说明** 

***





## 博客详情
**简要描述：** 

- 博客详情接口

**请求URL：** 
- ` http://blog.com/api/blog/info `
  
**请求方式：**
- GET

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id |是  |int |博客id|

 **返回示例**

``` 
  {
    "error_code": 0,
    "message": "success",
    "data": {
    	"blog_info" : 
    	   {
    	      "id" :"",
    	      "title" : "",
			  "date" :"",
			  "read_num":"",
			  "content" :"",
			  "author_name":"",//预留
			  "author_img" :"",//预留
    	   },
		"related_blog" : [
    	   {
    	      "id" :"",
    	      "title" : "",
			  "date" :"",
			  "read_num":"",
			  "author_name":"",//预留
			  "author_img" :"",//预留
    	   },
    	],
    }
  }
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:----- |----- |
|blog_info  |array    |blog详情  |
|related_blog  |array    |相关blog |



***


