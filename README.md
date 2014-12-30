IBM-Bluemix-UM-Starter
======================

Get started with IBM Bluemix and User Modeling service

After creating an IBM Bluemix free account, build a small Node app to connect to Bluemix Watson’s User Modeling service and run this Proof of Concept.

##Bluemix requirements
* [Sign-up for an IBM ID](https://www.ibm.com/account/profile/us?page=reg) to get access to your Bluemix account. You will be able to run your application from the IBM Bluemix cloud platform.
* You will need to get your account confirmed before having access to your Bluemix account. This can take 24 hours right now.

##Dev Environment setup:
This tutorial assumes you are familiar with Node.js basics. We will use the Cloud Foundry CLI to communicate with IBM Bluemix and setup your application. Follow these steps to get up and running fast:

* Download and install the [Cloud Foundry CLI](https://github.com/cloudfoundry/cli) for your system. Scroll down through the readme file to the Installers section for your platform
* Create a local Node.js app with Express
* Add a manifest.yml to the root of the Node app. Copy and paste the following snippet
```
applications:
# the URL for the application will be <host>.<domain>
# in this example, that's <unique-host-name>.mybluemix.net
# Set the host to a unique URL for your app
- host: <unique-host-name>
 # this is the domain for codename:bluemix
 domain: mybluemix.net
 # list services to access
 services:
   - um-service
 # the name of the application that you will see if you type 'cf apps'
 name: <YourApplicationName>
 # look for the files to 'push' in the current directory
 path: .
 # run this command to initiate the application (path to your server.js or app.js or ./bin/www)
 command: node ./bin/www
 # create 1 server instance
 instances: 1
```

##Setup service and publish
Using command line set to the root of app:

* Set API endpoint:

```$ cf api https://api.ng.bluemix.net```

* Authenticate to Bluemix:

```$ cf login```

* Create service for accessing User Modeling on your Bluemix account:

```$ cf create-service user_modeling user_modeling_free_plan um-service```

* Get your Service Credentials - replace <Application Name> with yours

```$ cf env <Application Name>```

* Push your app to Bluemix to get it published:

```$ cf push```

##Access your Node.js App on Cloud Foundry
After publishing, your app will be available at <unique-host-name>.mybluemix.net based on the value of <unique-host-name> set in your manifest.yml file.

