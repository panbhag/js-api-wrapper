

var should = chai.should();
//alert(1);



describe("format method",function(){
     //pending things
     // negative assertions, create from assertion class


    it("should rename simple properties",function(){
    
         var input = {x:1,y:2,z:3};
         var rename = {x:"a",y:'b',z:'c'};
         
         var r = shiva(input,{rename:rename});

         r.should.have.format(["a","b","c"]);
         
    
    })
    it("should select some fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = shiva(input,{only:["y","z"]});

         r.should.have.format(["y","z"]);
         
    
    })
    
    it("should select  some fields and rename them",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = shiva(input,{only:["y"],rename:{y:"b"} });

         r.should.have.format(["b"]);
         
    
    })
    
    
    it("should select all but some fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = shiva(input,{expect:["y"]});

         r.should.have.format(["x","z"]);
         
    
    })
    
    it("should select all but some fields and rename them",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = shiva(input,{except:["y"],rename:{x:"a",z:"c"} });

         r.should.have.format(["a","c"]);
         
    
    })
    
    it("should select some processed fields",function(){
    
         var input = {x:1,y:2,z:3};
         
         var r = shiva(input,{only:[],
            methods:{sum:function(input){ 
                            var sum = input.x + input.y + input.z;
                            var avg = sum/3.0;
                            return {sum:sum,avg:avg}
           } 
                        }
                        });

         r.should.have.format(["sum","avg"]);
         
    
    });


    it("should map an array of fields",function(){

        var input = {x:1,comments:[{id:"1",postText:"hello",partyId:12},{id:"2",postText:"hello2",partyId:2}]};

        var r = shiva(input,{only:[],array:[{property:"comments",mapper:{
         only:["postText","partyId"], rename:{"postText":"text",partyId:"creatorId"}

        }
        } ]});

        r.should.have.format([{name:"comments", type:"array",format:["text","creatorId"] }])

    })
    
    
    

})




