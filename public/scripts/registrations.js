var app = new Vue({
    el: '#app',
    data: {
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
        registrations: [],
        eventTab: []
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
                response.data.instances.forEach(function(i) {
                    i.date = moment(i.date).format('Do MMMM YYYY');
                })
                this.events.push(response.data)
                this.eventTab.push('')
            }, response => {
                console.log(response);
            })
        },
        loadRegistrations: function() {
            this.$http.get('/api/registrations/all').then(response => {
                response.data.forEach(function(el) {
                    app.getRegistration(el.id)
                })
            }, response => {
                console.log(response);
            })
        },
        getRegistration: function(id) {
            this.$http.get('/api/registration/' + id).then(response => {
                this.registrations.push(response.data)
            }, response => {
                console.log(response);
            })
        },
        deleteRegistration: function(id, rev) {
            this.$http.delete('/api/registration/' + id + '/' + rev).then(response => {
                console.log(response);
                this.registrations = [];
                this.loadRegistrations();
            }, response => {
                console.log(response);
            })
        },
        updateTabs: function(index, id, idx, e) {
            Vue.set(this.eventTab, index, id);
            e.preventDefault();
        }
    },
    mounted: function() {
        this.getConfigDetails()
        this.loadEvents()
        this.loadRegistrations()
    },
    computed: {
        isActive: function() {
            var results = [];
            for (i = 0; i < this.events.length; i++) {
                results[i] = new Array(app.events[i].instances.length);
                for (j = 0; j < app.events[i].instances.length; j++) {
                    if (app.events[i].instances[j].id == app.eventTab[i]) {
                        results[i][j] = {
                            'background-color': this.colors[1],
                            'border-color': this.colors[2]
                        };
                    } else {
                        results[i][j] = '';
                    }
                }
            }
            return results;
        },
        displayArr: function() {
            var results = [];
            this.eventTab.forEach(function(id) {
                var arr = app.registrations.filter(function(obj) {
                    return obj.instanceID == id
                })
                results.push(arr);
            })
            return results;
        },
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