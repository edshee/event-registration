var app = new Vue({
    el: '#app',
    data: {
        events: [{
            title: 'IBM Cloud Hands on Lab',
            description: 'Learn the fundamentals of building, running and managing scalable cloud applications. Work with experts to accelerate your learning. Develop at speed using services and APIs. Help shape IBM Cloud with your feedback. Lunch and light refreshements are on us!',
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
        description: 'Learn about IBM Cloud from the experts...',
        colors: [
            '#34839D',
            '#00B198',
            '#3B4B54',
            '#C6E6EC'
        ]
    },
    computed: {
        backgroundColor1: function() {
            return {
                'background-color': this.colors[0]
            }
        },
        backgroundColor2: function() {
            return {
                'background-color': this.colors[1]
            }
        },
        backgroundColor3: function() {
            return {
                'background-color': this.colors[2]
            }
        },
        backgroundColor4: function() {
            return {
                'background-color': this.colors[3]
            }
        },
        fontColor1: function() {
            return {
                'color': this.colors[0]
            }
        },
        fontColor2: function() {
            return {
                'color': this.colors[1]
            }
        },
        fontColor3: function() {
            return {
                'color': this.colors[2]
            }
        },
        fontColor4: function() {
            return {
                'color': this.colors[3]
            }
        },
        borderColor3: function() {
            return {
                'border-color': this.colors[2]
            }
        }
    }
})