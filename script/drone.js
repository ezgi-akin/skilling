const body = document.body;
const table = document.body.getElementsByTagName("tbody")[0]
const selectedDroneElement = document.body.getElementsByClassName("drone")[0]

const drones=JSON.parse(localStorage.getItem('drones'))


let params = (new URL(window.location)).searchParams;

console.log(params);
console.log(params.get('id'));

const selectedDrone = drones.filter(drone=> drone.id===Number(params.get('id')));
console.log(selectedDrone);

let selectedDroneTemplate =
 `<p>${selectedDrone[0].name}</p>` +
 `<img src='${selectedDrone[0].image}'>`

selectedDroneElement.innerHTML = selectedDroneTemplate;


fetch('./data/data.json')
.then(res => res.json() )
.then(res=> {

    let drone = []
    drone = res['reports']        
    const filteredDrone = drone.filter(drone => drone.drone_id===Number(params.get('id')))

    console.log(filteredDrone)

    filteredDrone.map(
        drone=> {

            const trafficConditionDesc = temp => {
                switch(temp){
                    case "HEAVY": 
                        return "heavy";
                    case "LIGHT":
                        return "light";
                    case "MODERATE":
                        return "moderate";
                }
            }

            const Unix_timestamp =  t =>{
                const dt = new Date(t*1000);
                const hr = dt.getHours() 
                const convertedHr = hr % 12 || 12;
                const m = "0" + dt.getMinutes();
                return convertedHr + ':' + m.substr(-2)+' '+ (hr < 12 ? 'am' : 'pm')
            }
    
            let tableRowTemplate = 
                `<td>${Unix_timestamp(drone["time"])}</td>` +
                `<td>${drone["speed"]}</td>` +
                `<td>${drone["latitude"]}</td>` +
                `<td>${drone["longitud"]}</td>` +
                `<td><p class= ${trafficConditionDesc(drone["traffic_conditions"])}>${drone["traffic_conditions"]}</p></td>` 
          

            const row = document.createElement('tr');
            row.innerHTML = tableRowTemplate;

            table.append(row);
           
        }
    )
} )

