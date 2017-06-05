var myApp = angular.module('SalApp', []);
myApp.controller('MyCtrl', ['$scope', '$http', function($scope, $http) {
    var refresh = function(){

    $http.get('/memberslist').then(doneCallbacks, failCallbacks);


    function doneCallbacks(res) {
      console.log("Data received");
      $scope.memberslist = res.data;
      $scope.member = null;﻿
    }

    function failCallbacks(err) {
      console.log(err.message);
    }
  };
  refresh();
  $scope.teams=[
    {team:'Drupal'},
    {team:'eCRM'},
  ]

    $scope.addmember=function(){
      console.log($scope.member);
       $scope.member._id="";
      $http.post('/memberslist',$scope.member).then(function(response){
        console.log(response.data);
        refresh();
      });
    };
    $scope.removemember = function(id){
      console.log(id);
      $http.delete('/memberslist/' + id).then(function(response){
        refresh();
      });
    };
    $scope.editmember = function(id){
      console.log(id);
      $http.get('/memberslist/' + id).then(function(response){
        $scope.member = response.data;
      });
    };
    $scope.savemember = function(){
      console.log($scope.member._id);
      $http.put('/memberslist/' + $scope.member._id, $scope.member).then(function(response){
        refresh();
      });
    }
    $scope.currentTeam = null;
    function setCurrentTeam(team){
      $scope.currentTeam = team;
    }
    $scope.setCurrentTeam = setCurrentTeam;
    // column to sort


}]);
