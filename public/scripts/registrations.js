var app = new Vue({
    el: '#app',
    data: {
        events: [],
        config: {
            title: '',
            description: '',
            colors: ['', '', '', '']
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
        deleteRegistration: function(index) {
            this.$http.delete('/api/registration/' + this.registrations[index]._id + '/' + this.registrations[index]._rev).then(response => {
                console.log(response);
                this.registrations.splice(index, 1);
            }, response => {
                console.log(response);
            })
        },
        updateTabs: function(index, id) {
            Vue.set(this.eventTab, index, id);
        }
    },
    mounted: function() {
        this.getConfigDetails()
        this.loadEvents()
        this.loadRegistrations()
    },
    computed: {
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