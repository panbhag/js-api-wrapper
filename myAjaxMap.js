//defines the map for rrMapper

$.myAjax.addMap(


      {url:"http://192.168.0.61:8080/AOLSN/me/posts",type:"Get",

       response_map:{only:[],
              methods:[
                  function(r)
                  {
                      var result = shiva.transform(r.messageview.partyposts,{except:["IsParent","IsPublic"],rename:{"MessageId":"id","PartyId":"creatorId","PostMessage":"text","MessageDate":"createdAt"} });
                      return {posts: result};
                  }
              ]
          }
          ,request_map:{}
      }


)