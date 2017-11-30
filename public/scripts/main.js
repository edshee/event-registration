var app = new Vue({
    el: '#app',
    data: {
        events: [{
            title: 'Bluemix Hands on Lab',
            description: 'Learn the fundamentals of building, running and managing scalable cloud applications. Work with experts to accelerate your learning. Develop at speed using services and APIs. Help shape Bluemix with your feedback. Lunch and light refreshements are on us!',
            notes: 'Please bring your laptop with you!',
            instances: [{
                    date: '1st November 2017',
                    time: '9.30am - 4.30pm',
                    location: 'IBM South Bank, 76/78 Upper Ground, London, SE1 9PZ'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'IBM South Bank, 76/78 Upper Ground, London, SE1 9PZ'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'IBM South Bank, 76/78 Upper Ground, London, SE1 9PZ'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'IBM South Bank, 76/78 Upper Ground, London, SE1 9PZ'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'IBM South Bank, 76/78 Upper Ground, London, SE1 9PZ'
                }
            ]
        }, {
            title: 'API Connect Lab',
            description: 'Build cool APIs and make friends',
            notes: 'The API Economy is all Philip Hammond cares about these days.',
            instances: [{
                    date: '1st November 2017',
                    time: '9.30am - 4.30pm',
                    location: 'APIC Workshop Location'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'APIC Workshop Location'
                },
                {
                    date: '6th December 2017',
                    time: '9.30am - 4.30pm',
                    location: 'APIC Workshop Location'
                }
            ]
        }],
        title: 'IBM Cloud Workshops',
        description: 'Learn about IBM Cloud from the experts...'
    }
})