window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line:
    method = 'static';
    if (method === 'static') {
        let places = staticLoadPlaces();
        return renderPlaces(places);
    }

    if (method !== 'static') {
        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [
        {
            name: 'Centro prelievi',
            link:  'www.palazzo.com',
            location: {
                lat: 39.169244,
                lng: 8.524915,
            }
        },
        {
            name: 'Palazzo Pazze',
            link:  'www.palazzo.com',
            location: {
                lat: 39.169192,
                lng: 8.526157,
            }
        },
        {
            name: 'Palazzo Retro',
            link:  'www.palazzo.com',
            location: {
                lat: 39.170012,
                lng: 8.525485,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        

        // add place name
        let text = document.createElement('a-link');
        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        text.setAttribute('title', place.name);
        text.setAttribute('href',  place.link);
        text.setAttribute('scale', '10 10 10');

        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded', { detail: { component: this.el }}))
        });

        scene.appendChild(text);
    });
}
