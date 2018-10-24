/*var app = angular.module('mbg-app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'index.html'
	})
	.when('/link',{
		templateUrl: 'link.html'
	});
});

var app = require('electron').remote;

var dialog = app.dialog;

var fs = require('fs');

document.getElementById('createButton').onclick = () =>{
	dialog.showSaveDialog((fileName)=>{
		if(fileName === undifined){
			alert("You didn't save the file");
			return;
		}
		var content = document.getElementById('content').value;

		fs.writeFile(fileName,content, (err)=>{
			if(err){
				console.log(err);
			}
			alert("The file has been succesfully be saved")
		})
	});
};*/
'use strict'
window.$ = window.jQuery = require('jquery')
window.Bootstrap = require('bootstrap')