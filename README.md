# Event Registration

A [Node.js](https://nodejs.org/en/) app to help you publish events and manage registrations for those events. Built using [Vue.js](https://vuejs.org/).

[Live Demo](https://event-registration-uncleansable-bloke.eu-gb.mybluemix.net/)

## Set Up

The quickest and easiest way is to click the button below to deploy to IBM Cloud for free.
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/edshee/event-registration.git&branch=master)

** Manual deployment (on Cloud Foundry) **
`git clone https://github.com/edshee/event-registration.git`
`cd event-registration/`
`cf create-service cloudantNoSQLDB Lite cloudant-event-db`
`cf push`