# Problemator React

Problemator React is the port of Problemator App for React Native. It has already
been done with Phonegap + Framework7 and good old HTML version. With RN it should
run smoother with all (especially older) devices and offer a better user
experience alltogether.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

You have to delete the .babelrc which comes with react-native upgrade (because
that command will create ios and android -projects)

```
rm .babelrc
```

Then run react-native link to add all the links to Android and IOS which
are automated... 

```
react-native link
```

Then you have to add React Native Navigation v2 by Wix. It needs some manual
work as described in https://wix.github.io/react-native-navigation/#/docs/Installing

React Native Vector Fonts need also some manual labour for Android and IOS in 
order to make them work.

https://github.com/oblador/react-native-vector-icons#installation

Also ART-framework has to be added for Android and IOS manually. It comes with
react-native, but it's not installed by default for performance reasons.

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

# ProblematorReact

## Steps to make the project work
    1.  When you create a new project, be sure to delete .babelrc which is created by default
    when you run react-native update. There's babel.config.js in stead.

    2.  You have to install React Native Navigation v2, and it needs some changes with XCode and Android Studio. https://wix.github.io/react-native-navigation/#/docs/Installing


# Tests will fail until you do this:

Going to the preprocessor.js file inside react-native jest folder, normally located in this path <rootDir>/node_modules/react-native/jest/preprocessor.js and
Change the inlineRequires: true to inlineRequires: false