var app = new Vue({
    el: '#app',
    data: {
        events: [],
        config: {
            title: '',
            description: '',
            colors: ['', '', '', '']
        }
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
        loadEventsAndInstances: function() {
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
                notes: ''
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
        getInstance: function(id, cb) {
            this.$http.get('/api/instance/' + id).then(response => {
                //put the instance in the right place
            }, response => {
                console.log(response);
            })
        }
    },
    mounted: function() {
        this.getConfigDetails()
        this.loadEventsAndInstances()
    },
    computed: {
        colors: function() {
            var arr = this.config.colors.map(function(e) {
                return '#' + e
            });
            return arr
        }
    }
})