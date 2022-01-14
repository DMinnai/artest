window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line
    method = 'static';

    if (method === 'static') {
        let places = staticLoadPlaces();
        renderPlaces(places);
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
            name: 'Questo è il palazzo Pazze ',
            link:  'https://dminnai.github.io/artest/test.html',
            src:   'assets/asset.png',
            location: {
                lat: 39.169192,
                lng: 8.526058,
            }
        },
        {
            name: 'Laboratorio analisi ',
            link:  'https://dminnai.github.io/artest/test.html',
            src:   'assets/lab.png',
            location: {
                lat: 39.169377,
                lng: 8.524878,
            }
        },
        {
            name: 'Parcheggio Davide',
            link:  'https://dminnai.github.io/artest/test.html',
            src:   'assets/park.png',
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

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        icon.setAttribute('scale', '7, 7');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const label = document.createElement('span');
                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');
                label.innerText = name;
                container.appendChild(label);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 1500);
            }
        };

        icon.addEventListener('click', clickListener);

        scene.appendChild(icon);
    });
}
