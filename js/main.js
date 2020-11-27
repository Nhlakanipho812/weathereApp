var classApp = angular.module("wetherApp", []);

classApp.controller("weatherCtrl", function ($scope, $http) {
  var vm = $scope;
  vm.list = JSON.parse(localStorage.getItem("array"));
  //object
  let localData = {};
  //get location

  $http.get("http://ip-api.com/json/").then(function (data) {
    vm.lat = data.data.lat;
    vm.lon = data.data.lon;
    vm.timezone = data.data.timezone;
    vm.regionName = data.data.regionName;

    //define api key
    const apiKey = "16bc5b8417e08791e0952c54b306cd45";

    //define weather url
    let weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${data.data.city},${data.data.countryCode}&appid=${apiKey}`;

    //call weather url
    $http.get(weatherApiUrl).then(function (res) {
      vm.name = res.data.name;
      vm.description = res.data.weather[0].description;
      vm.temp = res.data.main.temp;
      vm.ftemp = (vm.temp * (9 / 5) - 459.67).toFixed(0);
      vm.ctemp = (vm.temp - 273).toFixed(0);
      vm.icon = `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`;
      vm.country = res.data.sys.country;

      //create data to store
      let jsonData = JSON.parse(localStorage.getItem("array"));
      let array = [];
      if (jsonData !== null) array = jsonData;

      localData = {
        timezone: vm.timezone,
        regionName: vm.regionName,
        name: vm.name,
        description: vm.description,
        ftem: vm.ftemp,
        ctemp: vm.ctemp,
        icon: vm.icon,
        country: vm.country,
        date: new Date(),
      };

      //save to local storage

      array.push(localData);
      localStorage.setItem("array", JSON.stringify(array));

      //console.log(JSON.parse(localStorage.getItem("results")));
    });
  });
  vm.save = function () {
    location.reload();
  };
  vm.project = {
    heading: "Weather Logger",
    description:
      "Create an AngularJS web application to save weather conditions for your current location",
  };
});
