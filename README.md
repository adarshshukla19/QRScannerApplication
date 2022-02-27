# QRScannerApplication

 A basic QR code scanning application developed as a submission for a UI test. 
 
 This application is developed using Ionic platform in Angular framework, used for developing Hybrid cross platform applications. 
 This app can be run in desktop as a PWA, and also can be run in  Android and iOS devices. 

Assumptions - 
1. During testing, I used QR codes for URL's mostly. That is the reason, the toast message in the app has an option to view the URL in a new window. All kind of QR codes can be scanned and their data element displayed, only URL type QR codes open in a new window.

Setup -
For this tutorial, you need to have set up the current versions of Ionic, Cordova and Node/NPM on the machine you are using. In case these tools aren't ready, please see the links below in the respective order-
1. NPM - https://nodejs.org/en/download/
2. Ionic - ```npm i -g @ionic/cli```
3. Cordova - ```npm install -g cordova```

After all of the above are installed, we can now Run and Test the application -
1. In CMD or Terminal, run ```git clone https://github.com/adarshshukla19/QRScannerApplication.git``` in the folder in which you'd like to contain the project.
2. In the home directory, navigate to the folder named - QRScanningApplication using 
  ```cd .\QRScannerApplication\QRScanningApplication\```
4. Next you will need to get all your node_modules back into your application. All these modules are based on your package.json file. Run 
  ```npm install```

4. Now you will need to serve the app. Run this command in the terminal -
  ```ionic serve```

This should open a browser window for http://localhost:8100/home where you can test the QR Scanner App. 

Application Walkthrough -
1. This is a Single Page Application. 
2. QR Code Scanner Section - This section is on the top half of the screen and has four main functionalities. 

    a. Upload Image - To upload an image file with the QR code. Clicking this button opens a Window Dialog to select the QR image file.

    b. Scan - Use the camera to capture QR code. Clicking this button opens the camera to capture the QR. 
    
    c. Stop Scan - Below the Video element, a Stop button appears, this stops the Camera access. 
    
    d. Reset - After a successful scan, the QR code data element is displayed in the bottom section and the Reset button can be used to clear this for a new scan. 

3. Scanned Items - This section displays a list of scanned items with their data element. 

**Note** - in case of any issues while testing the app, please reach out to me.

Author - Adarsh Shukla

email -  adarshshukla19@gmail.com
