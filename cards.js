fetch('https://restcountries.eu/rest/v2/all')
  .then(response => response.json())
  .then((data) => 
  {
    console.log(data);
   for(let i =0 ; i<data.length;i++)
   {
     let name = data[i].name ; 
     
    cdiv((i%4)+1,name,data[i].capital,data[i].region,data[i].population,data[i].flag,i);

   }
   var sbut = document.querySelector("#sbat");
   sbut.addEventListener("click",()=>
   {
    gg(data);
   })

   document.querySelector("#input").addEventListener("keydown",(e)=>
   {
     if(e.code === 'Enter'){
      gg(data);
      }
   }
   );
  });

 
//   fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=f9dda2f825ebf545b17dca6bd31c4dd6")
//   .then(response => response.json())
//   .then((data) => alert(data["main"]));
// key f9dda2f825ebf545b17dca6bd31c4dd6 

function cdiv(id,name,cap,reg,pop,img,ind)
{

 let t= document.querySelector("#col"+id);
 let card = document.createElement("div");
 card.setAttribute("class","card");
 card.setAttribute("id","card"+(ind+1));
 //console.log("card"+(ind+1));
 card.setAttribute("style","width:300px;height:380px;border-radius:30px;font-family:calibri;margin-top: 20px;border:1px solid black");
 let i = document.createElement("img");
 i.setAttribute("src",img)
 i.setAttribute("width","220");
 i.setAttribute("height","140");
 i.setAttribute("style","border-radius:30px;align-self: center;")
 let con = document.createElement("div");
 con.setAttribute("style","height:150px;width:300px;font-size:25px;text-align: center;margin-top: 10px;");
 con.innerHTML="Country :"+name + "<br> Region :"+ reg+"<br> Population :"+pop ;
 let but = document.createElement("button");
 but.innerText="Weather";
 but.setAttribute("style"," font-size:20px;width:120px;align-self:center;border-radius:30px;height:40px;margin-top:30px");
 but.setAttribute("class","btn btn-primary");
//console.log(name,cap);
 but.addEventListener("click",()=>{
     weather(cap);
 });
 card.addEventListener("mouseover",()=>{
    card.setAttribute("style","width:300px;height:380px;border-radius:30px;font-family:calibri;margin-top: 20px;transform: scale(1.07, 1.07);border:1px solid black;box-shadow:0px 0px 5px 10px lightblue;"); 
 })
 card.addEventListener("mouseout",()=>{
    card.setAttribute("style","width:300px;height:380px;border-radius:30px;font-family:calibri;margin-top: 20px;border:1px solid black"); 
 })
 but.addEventListener("mouseout",()=>{
    but.setAttribute("style"," font-size:20px;width:120px;align-self:center;border-radius:30px;height:40px;margin-top:30px")

});
but.addEventListener("mouseover",()=>{
    but.setAttribute("style"," font-size:20px;width:120px;align-self:center;border-radius:30px;height:40px;box-shadow:0px 0px 5px 5px lightblue;margin-top:30px")
    
});
 
 card.append(i);
 card.append(con);
 card.append(but);
 t.append(card);
 
 t.append(document.createElement("br"));
  


}

function weather(city)
{   
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f9dda2f825ebf545b17dca6bd31c4dd6")
      .then(response => response.json())
      .then((data) =>{
        console.log(data);
        let temp = data["main"].temp;
        let feels_like = data["main"].feels_like;
        let temp_min = data["main"].temp_min;
        let temp_max = data["main"].temp_max;
        let pressure = data["main"].pressure;
        let humidity = data["main"].humidity;
        
        var result = "Temp :" + temp +"\n"+ "Feels_like :" + feels_like +"\n"+ "Temp_min :"+temp_min +"\n"+"Temp_max :"+temp_max
        +"\n"+"Pressure :" + pressure +"\n"+"Humidity :" +humidity ;

        alert(result);
        

        

      });
}

function search(arr,c)
{
   for(let i =0 ; i<arr.length;i++)
   {
    let n = arr[i].name;
     if(n.toLowerCase()==c)
     {
       return "card"+(i+1);
     }
   }
       
  return "NotFound";  
} 

function blink(card)
{ 
  var div = document.querySelector("#"+card);
  div.style.boxShadow="0px 0px 5px 10px mediumaquamarine";
  
  function hello(count){
  // console.log(div.style.boxShadow);
  if(div.style.boxShadow=="mediumaquamarine 0px 0px 5px 10px")
  {
      div.style.boxShadow="none";
      setTimeout(count,500);
  }
  else{
      div.style.boxShadow="0px 0px 5px 10px mediumaquamarine";
      setTimeout(count,500);
  }
  }
  
  var cou =0 ;
  function count()
  {
    cou++;
    //console.log(cou);
    if(cou<=6)
    {
        hello(count);
    }
    else
    {
      div.style.boxShadow="none";
       // alert("completed");
    }
  }
  
  count();
 
}

function gg(data)
{
  let c = document.querySelector("#input").value;
    if(c!=="")
    { 
      c =c.toLowerCase();
      var result = search(data,c);
      document.querySelector("#input").value="";
      if(result!=="NotFound")
      {
         document.querySelector("#"+result).scrollIntoView();
         blink(result);
      }
      else
      {
        $("#myModal").modal();
      }
    }
}
