const body = document.body;
const wrapper = document.body.getElementsByClassName('wrapper')[0]
let drones = []

fetch('./data/drones.json')
  .then(res => res.json())
  .then(res => {
  
    drones = res['drones']
    localStorage.setItem('drones',JSON.stringify(drones));

    drones.map(
        drone => {

            let cardTemplate = 
            `<div class="card">` +
                `<div class="cardImg" style="background-image: url('${drone["image"]}');"></div>`+
                `<div class="cardDesc">`+
                    `<div class="cardDescRow"><p>Name:</p><p>${drone['name']}</p></div>`+
                    `<div class="cardDescRow"><p>Battery:</p><p>${drone['batery']} mA</p></div>` +
                    `<div class="cardDescRow"><p>Age:</p><p>${drone['age']} ${Number(drone['age'])>1 ? 'Years' : 'Year'}</p></div>`+
                    `<a href="drone.html?id=${drone.id}"><button>See Reports</button></a>`+
                `</div>`+
            `</div>`;

            const card = document.createElement('div');
            card.innerHTML = cardTemplate;

            wrapper.append(card);
        }
    )
});
