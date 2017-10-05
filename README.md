# Summit Library sample project
## Introduction
This repository contains the code from the presentation I made at Dynamicweb Summit 2017.

The project is the client part of the client-server example solution that was made into an app using Cordova. The server part of the solution is not provided in this repository, so it is necessary to create a server backend to serve the client or strip the server calls from the client. If a server backend is implemented, the choice of technology to use is completely optional. The following is a selection of possibilities, but this repository does not include any sample code for any of these.
- Express.js (node)
- WebAPI (.NET)
- PHP

The take-away from this is, basically any web technology that can handle requests and serve responses can be a suitable backend for this project.

## Approach to the project
It's important to know how the different parts of the project work together. The repository contains the code for a single page application (SPA) which is used in a Cordova app. The SPA is a javascript project written in [TypeScript](https://www.typescriptlang.org/) using [React](https://reactjs.org/) as the UI framework. It is encouraged to familiarize yourself with these technologies for a better understanding of the structure of the project. It is also recommended to use this project as inspiration only. This is __not__ production-ready code.

Many aspects of deployment of the finished app will not be discussed here. The basics of deploying using Cordova are briefly mentioned, but this is not intended as a full guide on how to deploy apps to either Android or iOS devices or stores.

The code is provided as-is.

## Getting started
Start by cloning this repository to your local machine. Once the the repository has been cloned, you need to run `npm install`. All required packages will be downloaded and once the process has concluded, you're almost ready to run the project.

**NOTE:** You need to copy the provided **resources/i-f7-ios.png** image file to **node_modules/framework7-react/dist/umd/img**, as it unfortunately is missing from the original package.

These tasks will get you up and running
1. `git clone https://github.com/jeppeagger/dw-summit-2017.git`
2. `npm install`
3. Copy `resources/i-f7-ios.png` to `node_modules/framework7-react/dist/umd/img`

## Running the project
Getting the repository cloned and all packages installed makes you ready to actually run the project. To start the development server with the project run `npm start`. The development server allows for hot module swapping where changes made to the code will trigger a rebuild of the project and then refreshes the project in the browser. This allows for fast development, testing and bug fixing. This comes courtesy of [webpack](https://webpack.github.io/) which is used as the build tool / bundler.

The SPA requires a `<span id="root">` element in the host web environment. It serves as the app container. The web environment that gets loaded in the development server is the file **public/index.html**. Inside this file you'll find the required DOM element, but not much else. All other required assets get referenced automatically by the development build process that starts when running the development server.

Running the project
1. `npm start`

## Building the project
Once the project has been tested and verified in the browser, you need to make a production build. The build results in a .js file and a .css file. These files are the actual SPA that can be hosted in any web environment with the required DOM element. The build is started by running `npm run build`.

Unlike the development build, the production build produces an output that serves as a stand-alone product. The output resides inside the **build** folder and contains, among other files, a web environment (**build/index.html**), a .js file (**build/statis/js/main.[hash].js**) and a .css (**build/static/css/main.[hash].css**) file. The important files are the .js and the .css files.

Building the project
1. `npm run build`

## Creating the app
Now that we have a production build of the SPA, it's time to make it into an app. To to this, we need to use Cordova. If you do not already have Cordova installed, please refer to the [Tools](#tools) section in this document for installation instructions.

In order to create a new app project, run `cordova create app` where *app* is the name of the folder in which Cordova should create the app project. Once the project has been created, we need to do a little cleaning. In the **www** folder, remove the **css**, **img** and **js** folders. Now, we need to make a few changes to the **index.html** file. Replace the `<div class="app">` element with the element required by the SPA, namely the `<span id="root">` element.

If you plan on using a backend server to provide data and resources to the app, you need to make an additional change to **index.html**. In order for host environment to allow communication outside the app itself, it's required to explicitly state that intent. This is done by modifying the Content Security Policy (CSP) settings in the **index.html** file. To allow API calls, change `default-src 'self'` to `default-src *` or any specific source. In the same vein, if you need to allow images from the server, you need to change `img-src 'self'` to `img-src *` or any specific source.

The last step involves copying the app assets from the productions build folder (**build**) into the Cordova app folders. We need to copy the .css file to **app/www/css/index.css** and the .js file to **app/www/js/index.js**. You can do this manually, but included with the project is a small node script that does this automatically -- provided you created your Cordova app in a folder called **app**. You can run the script by typing `node build-app`. There's even a webpack command that can create a production build and copy the files into the Cordova project in one go. Simply type `npm run build-app` to do this.

At this point, the Cordova app ready to go. The web environment has been modified to use our SPA and will load this once Cordova starts executing the app. If the idea is to release our app at some point, we also need to modify the Cordova config file. We need to lock in the name of the app and the bundle identifier as these cannot easily be changed later. The file we need to change is **config.xml**. Insert your bundle id in `<widget id="[your bundle id]">` and change the app name with your app name `<name>[Your app name]</name>`.

To start the Cordova app, a *platform* is required. In the Cordova context, a platform is basically a target for the app. Platforms could be iOS, Android or [others](https://cordova.apache.org/docs/en/latest/#develop-for-platforms). To add a platform, simply type `cordova platforms add ios` where **ios** is the name of the platform. Then type `cordova run ios` where **ios** is the platform to run.

Once the device testing phase is done and your app is ready for deployment, simply run `cordova build ios --release --device` where **ios** is the platform to build to. This will create a distribution build of the app that can then be distributed through the App store or the Google Play store.

Creating the app
1. `cordova create app`
2. Remove **css**, **img** and **js** folder from **www**
3. Replace `<div class="app">` with `<span id="root">` in **index.html**
4. (Optional) Change the CSP to allow content and images to come from outside the app
5. Run `node build-app` or `npm run build-app`
6. Change bundle identifier and app name in **config.xml**
7. Install the desired platforms, e.g. `cordova platforms add ios`
8. Run the app in the desired platform, e.g. `cordova run ios`
9. (Optional) Create a distribution build for the desired platform, e.g. `cordova build ios --release --device`

## Tools
These tools are necessary for the most part in order to use the project. Some are optional, but are recommended to have on your development machine. If you use MacOS or Linux, you need to invoke npm with *sudo* in order to authorize any global installation using npm. The command then becomes `sudo npm install -g <package-name>`.

Required tools
- Node ([Get it here](https://nodejs.org/en/))
- TypeScript (`npm install -g typescript`)
- Cordova (`npm install -g cordova`)

Optional tools
- Android Studio ([Get it here](https://developer.android.com/studio/index.html)) (Required if building for Android)
- Xcode ([Get it here](https://developer.apple.com/download/)) (Required if building for iOS. Requires MacOS. Can be downloaded through Mac AppStore)
- ios-sim (`npm install -g ios-sim`) (Required if deploying to iOS simulator)
- ios-deploy (`npm install -g ios-deploy`) (Required if deploying to an physical iOS device)
- Visual Studio Code ([Get it here](https://code.visualstudio.com/)) (Rich text editor that supports TypeScript. Available for Windows, Mac and Linux)