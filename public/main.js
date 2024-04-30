/// <reference path="./types/index.d.ts" />


const users = [
        {
                id: 1,
                name: 'Tóth Géza',
                address: '3515 Miskolc-Egyetemváros',
                gender: 'male',
                dateofBirth: '1990-01-01',
                children: 2,
                homeOffice: true,
                car: null
        },
        {
                id: 2,
                name: 'Szabó Mária',
                address: '3520 Miskolc, Petőfi u. 11.',
                gender: 'female',
                dateofBirth: '1988-02-15',
                children: 3,
                homeOffice: false,
                car: null
        },
        {
                id: 3,
                name: 'Dr. Nagy Péter',
                address: '1515 Budapest, Kossuth L. u. 2.',
                gender: 'male',
                dateofBirth: '1977-07-21',
                children: 0,
                homeOffice: false,
                car: null
        },
        {
                id: 4,
                name: 'Horváth Béláné',
                address: '2222 Szeged, Fő u. 4.',
                gender: 'female',
                dateofBirth: '1966-01-01',
                children: 2,
                homeOffice: false,
                car: null
        },
        {
                id: 5,
                name: 'Bódi Adorján',
                address: '1234 Segesvár, Fő u. 6.',
                gender: 'male',
                dateofBirth: '1986-02-05',
                children: 0,
                homeOffice: true,
                car: null
        },
];

const cars = [
        {
                id: 1,
                name: 'Bmw',
                color: 'piros',
                licensePlate: '222-abc'
        },

        {
                id: 2,
                name: 'Mercedes',
                color: 'kék',
                licensePlate: '333-bcd'
        },

        {
                id: 3,
                name: 'Volga',
                color: 'rozsda',
                licensePlate: '111-aaa'
        },

        {
                id: 4,
                name: 'Ferrari',
                color: 'vörös',
                licensePlate: '444-cde'
        },
];

function initialize() {
        $('#navbar').load('navbar.html');
        loadUserList();

        $('#navbar').animate({
                scale: 1.0
        }, 2000);
}

function loadUserList() {
        $('#content').load('pages/user-list.html', () => {
                const table = $('#user-list');

                for (const user of users) {
                        table.append(
                                `<tr>
                                        <td>${user.id}</td>
                                        <td>${user.name}</td>
                                        <td>${user.address}</td>
                                        <td>${user.gender == 'male' ? 'Férfi' : 'Nő'}</td>
                                        <td>${user.dateofBirth}</td>
                                        <td>${user.children}</td>
                                        <td>${user.homeOffice ? 'Igen' : 'nem'}</td>
                                        <td>${user.car == null ? 'Nincs' : user.car}</td>
                                </tr>`
                        );
                }
        });
}

function loadCarList() {
        $('#content').load('pages/car-list.html', () => {
                const table = $('#car-list');

                for (const car of cars) {
                        table.append(
                                `<tr>
                                        <td>${car.id}</td>
                                        <td>${car.name}</td>
                                        <td>${car.color}</td>
                                        <td>${car.licensePlate}</td>
                                </tr>`
                        );
                }
        });
}

function loadUserForm() {
        $('#content').load('pages/user-form.html', () => {
                const carInput = $('#car');

                for (const car of cars) {
                        carInput.append(
                                `<option value="${car.name} (${car.color})">${car.licensePlate}</option>`);
                }
        });
}

function loadCarForm() {
        $('#content').load('pages/car-form.html');
}

function loadWorkplaceSafety() {
        $('#content').load('pages/workplaceSafety.html');
}

function loadStats() {
        $('#content').load('pages/stats.html', () => {
                const childrenCounts = [];

                for (const user of users) {
                        childrenCounts.push([user.name, user.children]);
                }

                c3.generate({
                        bindto: '#children-count',
                        data: {
                                columns: childrenCounts,
                                type: 'bar'
                        },
                        bar: {
                                width: {
                                        ratio: 0.5 // this makes bar width 50% of length between ticks
                                }
                                // or
                                //width: 100 // this makes bar width 100px
                        }
                });

                let homeOfficeWorkers = 0;

                for (const user of users) {
                        if (user.homeOffice) {
                                homeOfficeWorkers++;
                        }
                }

                c3.generate({
                        bindto: '#home-office',
                        data: {
                                columns: [
                                        ['Távmunka', homeOfficeWorkers],
                                        ['Jelenléti', users.length - homeOfficeWorkers]
                                ],
                                type: 'pie'
                        },
                });
        });
}

function checkUser() {
        // beviteli mezők lekérdezése
        const nameInput = $('#name');
        nameInput.css('border', '');

        const childrenInput = $('#children');
        childrenInput.css('border', '');

        const femaleInput = $('#female');
        const maleInput = $('#male');

        $('.error-message').remove();

        let valid = true;

        // bevitt adatok ellenőrzése
        if (!nameInput.val()) {
                valid = false;
                nameInput.css('border', '1px solid red');
                nameInput.parent().after('<small class="error-message">A név megadása kötelező!</small>');
        }

        if (childrenInput.val() < 0) {
                valid = false;
                childrenInput.css('border', '1px solid red');
                childrenInput.parent().after('<small class="error-message">A gyermekek száma nem lehet 0-nál kisebb!</small>');
        }

        if (!maleInput.prop('checked') && !femaleInput.prop('checked')) {
                valid = false;
                maleInput.parent().after('<small class="error-message">Választani kell nemet!</small>');
        }

        return valid;
}

function saveUser() {
        if (!checkUser()) {
                return;
        }

        const name = $('#name').val();
        const address = $('#address').val();
        const gender = $('#male').prop('checked') ? 'male' : 'female';
        const dateofBirth = $('#birthday').val();
        const children = $('#children').val();
        const homeOffice = $('#homeOffice').prop('checked');
        const car = $('#car').val();

        users.push({
                id: users.length + 1,
                name: name,
                address: address,
                gender: gender,
                dateofBirth: dateofBirth,
                children: children,
                homeOffice: homeOffice,
                car: car
        });

        loadUserList();
}

function checkCar() {
        const nameInput = $('#name');
        nameInput.css('border', '');

        const colorInput = $('#color');
        colorInput.css('border', '');

        const licensePlateInput = $('#licensePlate');
        licensePlateInput.css('border', '');

        $('.error-message').remove();

        let valid = true;

        if (!nameInput.val()) {
                valid = false;
                nameInput.css('border', '1px solid red');
                nameInput.parent().after('<small class="error-message">A név megadása kötelező!</small>');
        }

        if (!colorInput.val()) {
                valid = false;
                colorInput.css('border', '1px solid red');
                colorInput.parent().after('<small class="error-message">A szín megadása kötelező!</small>');
        }

        if (!licensePlateInput.val()) {
                valid = false;
                licensePlateInput.css('border', '1px solid red');
                licensePlateInput.parent().after('<small class="error-message">A rendszám megadása kötelező!</small>');
        }

        return valid;
}

function saveCar() {
        if (!checkCar()) {
                return;
        }
        const name = $('#name').val();
        const color = $('#color').val();
        const licensePlate = $('#licensePlate').val();
        console.log(licensePlate);

        cars.push({
                id: cars.length + 1,
                name: name,
                color: color,
                licensePlate: licensePlate,
        });

        loadCarList();
}

initialize();