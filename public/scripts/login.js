var app = new Vue({
    el: '#app',
    data: {
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
        user: 'admin',
        password: '',
        showError: false
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
        login: function(e) {
            e.preventDefault();
            this.$http.post('/login', {
                user: this.user,
                password: this.password
            }).then(response => {
                console.log(response);
                if (response.body == 'success') {
                    window.location.href = '/admin';
                } else {
                    this.showError = true;
                }
            }, response => {
                console.log(response);
            })
        }
    },
    mounted: function() {
        this.getConfigDetails()
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
        },
        borderColor2: function() {
            return {
                'border-color': this.colors[1]
            }
        }
    }
})