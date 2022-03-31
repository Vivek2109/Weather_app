//fetching data of country and city


	async function get_location_data(){
		let response=await fetch('https://countriesnow.space/api/v0.1/countries');
	    let parsed_response=await response.json();
	
		let country_list=document.getElementById("country_name");

		//traversing data of each country
		for(let i=0;i<parsed_response.data.length;i++){
			let newli=document.createElement("li");
			newli.className+="newli";
			newli.classList.add(`country_select${i}`);
			
			newli.innerText=parsed_response.data[i].country;
			
               //listener on country name

			newli.addEventListener("click",function getname(){
				// console.log(newli.innerText);
				     let location2=document.getElementById("timezone_country");
			         let select=document.getElementById("country_select");
					 location2.innerText=newli.innerText;
					 select.innerText=newli.innerText;
					 select.style.height="auto";
					//  select.classList.add("newhover");


					let select_city=document.getElementById("city");
				    if(select_city.firstChild){
						select_city.removeChild(select_city.lastChild);
					}
                    select_city.append(newli.lastChild);
                
			});
            
			let newdiv=document.createElement("div");
		
			newdiv.className+=" city_name_div";
			let city_list=document.createElement("ul");
			city_list.classList.add("city_name");

		// name of cities in country

			for(let j=0;j<parsed_response.data[i].cities.length;j++){
				let city=document.createElement("li");

				city.innerText=parsed_response.data[i].cities[j];

				//listener on city
				city.addEventListener("click",function getcity(){
					console.log(city.innerHTML);
					let city_location=document.getElementById("timezone_city");
					let select_city=document.getElementById("city_select");
					
					city_location.innerText=city.innerText;

					select_city.innerText=city.innerText;
					select_city.style.height="auto";
					get_temperature(newli.innerText,city.innerText);
 				})
				city_list.append(city);
			}
			newdiv.append(city_list);
           newli.append(newdiv);
		   country_list.append(newli);
		}
		

}

//    to get current location

	get_location_data();
	let long;
	let lat;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			long=position.coords.longitude;
			lat=position.coords.latitude;
			console.log(lat,long);
			get_current_temp(lat,long);
	    })
		
	}

    //   to get current temperature
		async function get_current_temp(lat,long){
			let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=41e5b933fcc69fdbeffca4cf86160662`);
	        let parsed_response=await response.json();
			console.log(parsed_response);
			console.log(parsed_response.main.temp);
			console.log(lat,long);
			let temperature=document.getElementById("digree");
             temperature.innerText=Math.floor(parsed_response.main.temp-273.15) ;
			 let parameter=document.getElementById("para");
			 let digree_section=document.getElementById("digree_section");


		// to convert temperature to fahrenheit	and vice-versa
        

			 digree_section.addEventListener("click",function click(){
				if(parameter.innerText==="F"){
					temperature.innerText=Math.floor(parsed_response.main.temp-273.15);
					parameter.innerText="C";
					
				}
				else if(parameter.innerText==="C"){
					temperature.innerText=Math.floor((parsed_response.main.temp-273.15)*(9/5)+32);
					parameter.innerText="F";
				
				}
				
			})
			let discription=document.getElementById("discription");
			discription.innerText=parsed_response.weather[0].description;
			let country=document.getElementById("timezone_country");
			let city=document.getElementById("timezone_city");
			country.innerText=parsed_response.sys.country;
			city.innerText=parsed_response.name;


			//image section

			const icon=document.getElementById("icon");
             icon.src=`${discription.innerText}.png`;
		}
	          
	   
	
// to get temperature by selecting country name and city name

async function get_temperature(country,city){
let response=await fetch(`http://api.weatherapi.com/v1/current.json?key=7f3270902c40426ab5e61600222903 &q=${country},${city}&aqi=no`);
var parsed_response= await response.json();

console.log(parsed_response);
let temperature=document.getElementById("digree");
temperature.innerText=Math.floor(parsed_response.current.temp_c);
let digree_section=document.getElementById("digree_section");
let parameter=document.getElementById("para");

let discription=document.getElementById("discription");
discription.innerText=parsed_response.current.condition.text;
document.getElementById("icon").src="//cdn.weatherapi.com/weather/64x64/day/113.png";
console.log(parsed_response.current.condition.icon);

digree_section.addEventListener("click",function click(){
	if(parameter.innerText==="F"){
		temperature.innerText=Math.floor(parsed_response.current.temp_c);
		parameter.innerText="C";
		
	}
	else if(parameter.innerText==="C"){
		temperature.innerText=Math.floor(parsed_response.current.temp_f);
		parameter.innerText="F";
	
	}
	
})
//image section
const icon=document.getElementById("icon");
             icon.src=`${discription.innerText}.png`;
}

