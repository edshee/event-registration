var app = new Vue({
    el: '#app',
    data: {
        instances: [],
        events: [],
        config: {
            title: '',
            description: '',
            colors: [
                "38839C",
                "1BB098",
                "3C4B53",
                "C7E6EC"
            ]
        },
        colorThemes: [
            ["F8BDFF", "5DA9E8", "F0F9FF", "51528C"],
            ["84B8D6", "E68585", "FFFFFF", "3A3B4A"],
            ["38839C", "1BB098", "C7E6EC", "3C4B53"],
            ["38839C", "A8C278", "535353", "FFFFFF"],
            ["8C3E9C", "F0A3C6", "535353", "FFFFFF"],
            ["0D7CBD", "FF3877", "403E4D", "FFFFFF"],
            ["5F83B3", "9DA2A8", "01134D", "FFF3D4"],
            ["737373", "872D43", "FF6A3D", "FFF3D4"],
            ["7E8B9E", "B03A6B", "FF6363", "FFFFFF"],
            ["616161", "ADADAD", "454545", "FFFFFF"],
            ["739470", "3F5742", "6BBA68", "FFFFFF"],
            ["D6E89B", "A9C2BC", "FFFFFF", "314D46"],
            ["ACC4E8", "74A9C2", "FFFFFF", "3D3C4D"],
            ["B8CFFC", "F587FF", "FFFFFF", "3B3B3B"],
            ["FCCAD0", "FF4040", "FFFFFF", "4F4242"],
            ["F4FC00", "FF4040", "FFFFFF", "4F4242"],
            ["FFFF6E", "FFA6A6", "FFFFFF", "4C424F"],
            ["FFEB87", "767FC2", "FDFFE8", "4C424F"]
        ]
    },
    methods: {
        getConfigDetails: function() {
            this.$http.get('/api/config').then(response => {
                if (response.body.title) {
                    this.config = response.body;
                }
            }, response => {
                console.log(response);
            });
        },
        saveConfigDetails: function() {
            this.$http.post('/api/config', this.config).then(response => {
                this.config._rev = response.body.rev
            }, response => {
                console.log(response);
            });
        },
        loadEvents: function() {
            this.$http.get('/api/events/all').then(response => {
                response.data.forEach(function(el) {
                    app.getEvent(el.id)
                })
            }, response => {
                console.log(response);
            });
        },
        getEvent: function(id) {
            this.$http.get('/api/event/' + id).then(response => {
                this.events.push(response.data)
            }, response => {
                console.log(response);
            })
        },
        saveEvent: function(index) {
            this.$http.post('/api/event', this.events[index]).then(response => {
                this.events[index]._rev = response.body.rev
                this.events[index]._id = response.body.id
            }, response => {
                console.log(response);
            })
        },
        createEvent: function() {
            this.events.push({
                title: '',
                description: '',
                notes: '',
                instances: []
            })
        },
        deleteEvent: function(index) {
            this.$http.delete('/api/event/' + this.events[index]._id + '/' + this.events[index]._rev).then(response => {
                console.log(response);
                this.events.splice(index, 1);
            }, response => {
                console.log(response);
            })
        },
        createInstance: function(index) {
            this.events[index].instances.push({
                date: '',
                time: '',
                location: '',
                id: this.generateID()
            })
        },
        deleteInstance: function(index, idx) {
            this.events[index].instances.splice(idx, 1);
            this.saveEvent(index);
        },
        generateID: function() {
            return '_' + Math.random().toString(36).substr(2, 9);
        },
        randomColors: function() {
            var rand = Math.floor(Math.random() * Math.floor(this.colorThemes.length))
            this.config.colors = this.colorThemes[rand];
        }
    },
    mounted: function() {
        this.getConfigDetails()
        this.loadEvents()
    },
    computed: {
        colors: function() {
            var arr = this.config.colors.map(function(e) {
                return '#' + e
            });
            return arr
        },
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