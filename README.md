# Event Registration

A [Node.js](https://nodejs.org/en/) app to help you publish events and manage registrations for those events. Built using [Vue.js](https://vuejs.org/).

[Live Demo](https://event-registration.eu-gb.mybluemix.net/)

## Set Up

The quickest and easiest way is to click the button below to deploy to IBM Cloud for free.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/edshee/event-registration.git&branch=master)

To change the admin password just add an environment variable for `admin_password` in the IBM Cloud UI.

**Manual deployment (on Cloud Foundry)**

1. `git clone https://github.com/edshee/event-registration.git`
2. `cd event-registration/`
3. `cf create-service cloudantNoSQLDB Lite cloudant-event-db`
4. `cf push --random-route`

This will create an app with a random route. If you want to specify the route use `cf push -n <unique hostname>`.

Wait for your application to deploy then:

5. `cf set-env event-registration admin_password <your_new_admin_password>`

If you ignore step 5 the default admin password is **events**

### Supported Regions

- US South
- United Kingdom
- Germany
- Australia
- China

### Email Notifications

Coming soon...

## Usage

Before people can register for your events you need to configure your app. To do this:
1. Go to `<your-app-url>/admin`

You will be prompted to log in. If you have not specified your own admin password (see setup instructions above for how) then the password will be **events**

2. Give your application a name and (optional) tagline
3. Create at least one event
4. Create one or more instances for each event

**Note** Instances are for each time you run your event - these are what your attendees will register for.

Attendees can now register for your events at your application homepage.

To view registrations for your events go to `<your-app-url>/registrations`.

