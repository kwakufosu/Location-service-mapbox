# MAPBOX API PROJECT

A project built with the MapBox API to explore how the location services work.

# Introduction
The tutorials provided by the MapBox documentaion uses  client-side javascript to demonstrate the various functionalities the MapBox API provides. As a result of this, I decided to do a project that implements the MapBox Directions API in the backend with Node.js.

 ## Pre-requisites
 1. You will need to create a MapBox Account
 
 2. Create a .env file that holds your environmental variables. The only environmental variable used was the MAPBOX_TOKEN 

 3. Create a config.js file in '/public/scripts' to hold the pubKey. The pubKey was created on the MapBox account page with restricted access rights since it can be exposed publicly.

 ## Installation
 In your project folder, run the following command in your terminal
 1. git clone git@github.com:kwakufosu/Location-service-mapbox.git
 2. cd Location-service-mapbox
 3. npm install

# Usage
Type your source and destination and submit.
The locations have been resticted to Ghana. To get the appropriate result, you may have to refine your search terms.An example is given below  
Eg. "Spintex Accra Ghana"

# Images
![Screenshot (212)](https://user-images.githubusercontent.com/79140311/209553295-2e36806a-10b0-4752-aa96-d11acef0b321.png)
![Screenshot (213)](https://user-images.githubusercontent.com/79140311/209553300-f6a2894d-cbde-4a09-888c-ae0c2f854288.png)

# Credits
https://docs.mapbox.com/api/overview/
