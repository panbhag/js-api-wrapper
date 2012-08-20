(function($){

 $.myAjax = function(options)
{
   var url = options.url;
   var data = options.data;
   var success = options.success;
   var error = options.error;



    var mapper = $.myAjax.route(options);
    console.log("mapper",mapper);
    var response_mapper,request_mapper;

    if(mapper) //if mapper is not false
    {
        request_mapper = mapper.requestMap;
        response_mapper = mapper.responseMap;
    }
   if(request_mapper && data)
    data = shiva(data,request_mapper);

   console.log("calling ajax");
   $.ajax({dataType:"json",url:url, data:data, success:function(response){

    console.log('responsemapper',response_mapper);
    console.log('response',response);
    if(response_mapper)
        response = shiva(response,response_mapper);

    if(success)
      success(response);

   }, error:function(message){

      if(error)
        error(message);

   }});
  console.log("done calling ajax");


}


   //matches the url, type and the options and returns an array of [requestMapper,responseMapper] if found
//else returns false
//default : type: Get
    $.myAjax.route = function(request)
    {  console.log("resquest:", request);
       if(!request.type)
         request.type = "Get";

       var maps = $.myAjax.map;
       var result = _.find(maps,function( r ){

            if(r.url != request.url)
                 return false;

            if(r.type && r.type.toLocaleLowerCase() != request.type.toLocaleLowerCase())
                 return false;


            if(r.data)
            {
                var match = _.contains(request.data,r.data);

                if(match == false)
                  return false;
            }

            return true;

       });

       if(result)
        return {requestMap:result.request_map,responseMap:result.response_map};
       else
        return false;
    }



    $.myAjax.map = [];



    $.myAjax.clearMap = function()
    {

        $.myAjax.map = [];

    }

    $.myAjax.addMap = function()
    {
       _.each(arguments,function(a){
         $.myAjax.map.push(a);

       });
       //console.log($.rrMapper.map);

    }






})(jQuery);









