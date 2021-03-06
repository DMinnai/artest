window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line
    method = 'static';

    if (method === 'static') {
        let places = staticLoadPlaces();
        renderPlaces(places);
        console.log(places);
    }

    if (method !== 'static') {

        // first get current user location
        return navigator.geolocation.getCurrentPosition(function(position) {

                // than use it to load from remote APIs some places nearby
                dynamicLoadPlaces(position.coords)
                    .then((places) => {
                        renderPlaces(places);
                    })
            },
            (err) => console.error('Error in retrieving position', err), {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [{
            name: 'Questo è il palazzo Pazze ',
            link: 'https://dminnai.github.io/artest/test.html',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            src: 'assets/asset.png',
            location: {
                lat: 39.169192,
                lng: 8.526058,
            }
        },
        {
            name: 'Laboratorio analisi ',
            link: 'https://dminnai.github.io/artest/test.html',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            src: 'assets/Vector.png',
            location: {
                lat: 39.169377,
                lng: 8.524878,
            }
        },
        {
            name: 'Parcheggio Davide',
            link: 'https://dminnai.github.io/artest/test.html',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            src: 'assets/Vector.png',
            location: {
                lat: 39.169307,
                lng: 8.525570,
            }
        },
    ];
}



function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        const latitude = place.location.lat;
        const longitude = place.location.lng;


        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('name', place.name);
        icon.setAttribute('src', place.src);
        icon.setAttribute('href', place.link);
        icon.setAttribute('info', place.info);
        icon.setAttribute('width', '2');
        icon.setAttribute('height', '2');
        icon.setAttribute('look-at', '[gps-camera]');

        // for debug purposes dimension are bigger
        icon.setAttribute('scale', '7, 7');

        // icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));
        icon.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', {
                detail: {
                    component: this.el
                }
            }))
        });

        const clickListener = function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            console.log("target", ev.target);
            if (document.contains(document.getElementById('place-label'))) {
               document.getElementById('place-label').remove();
            }
            if (document.getElementById('modal-body').innerHTML.trim() != '') {
               alert("pieno");
               document.getElementById('modal-title').innerHTML = "";
               document.getElementById('modal-body').innerHTML = "";
               document.getElementById('modal-link').innerHTML = "";
            }
                                  
            const name = ev.target.getAttribute('name');
            const link = ev.target.getAttribute('href');
            const info = ev.target.getAttribute('info');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {

                //create button modal
                const button = document.createElement('button');
                button.setAttribute('id', 'modal-btn');
                button.innerText = "approfondisci";

                const label = document.createElement('span');

                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');

                const poiLink = document.createElement('a');
                poiLink.setAttribute('id', 'place-link');
                poiLink.setAttribute('href', link);
                
                // place contents on modal 
                document.getElementById('modal-title').textContent += name;
                document.getElementById('modal-body').textContent += info;
                document.getElementById('modal-link').appendChild(poiLink);

                label.innerText = name;
                poiLink.innerText = "Approfondisci";

                container.appendChild(label);
                // container.appendChild(poiLink);
                container.appendChild(button);

                document.body.appendChild(container);
                
                // create variables for modal  
                const modal = document.getElementById("modal-info");
                const span = document.getElementsByClassName("close")[0];
                
                const modalContainer = document.getElementById("modal-container");
                
                //set onclick
                button.onclick = function() {
                    modalContainer.removeAttribute("class")
                    modalContainer.classList.add("one");
                    document.body.classList.add("modal-active");
                    
                }
                span.onclick = function() {
                    modalContainer.classList.add("out");
                    document.body.classList.remove("modal-active");
                    
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modalContainer.classList.add("out");
                        document.body.classList.remove("modal-active");
                    }
                }

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 9999500);
            }
        };

        icon.addEventListener('click', clickListener);

        scene.appendChild(icon);
    });
}
