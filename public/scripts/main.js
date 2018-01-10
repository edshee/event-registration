var app = new Vue({
    el: '#app',
    data: {
        events: [],
        title: '',
        description: '',
        colors: []
    },
    methods: {
        getAdminDetails: function() {
            this.$http.get('/api/admin/details').then(response => {
                this.title = response.body.title;
                this.description = response.body.description;
                this.colors = response.body.colors;
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
        getInstance: function(id, cb) {
            this.$http.get('/api/instance/' + id).then(response => {
                //put the instance in the right place
            }, response => {
                console.log(response);
            })
        }
    },
    mounted: function() {
        this.getAdminDetails()
        this.loadEventsAndInstances()
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