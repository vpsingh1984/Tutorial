var appController = angular.module('appControllers', []);

appController.controller('HomeController', ['$scope', 'Api', function($scope, Api) {
	$scope.items = Api.query();
	$scope.sortBy = 'name'
}]);

appController.controller('ItemController', ['$scope', '$routeParams', 'Api', 'FileUploader', function($scope, $routeParams, Api, FileUploader) {
	Api.get({id: $routeParams.id}, function(data, header){
		$scope.item = data;
		console.log($scope.item._id);
	});
	// console.log($scope.item.pictures);

	var uploader = new FileUploader();
	uploader.onAfterAddingFile = function(item) {
		var reader = new FileReader();
		reader.onload = function(e){
			var preview = document.getElementById('preview');
			preview.setAttribute('src', e.target.result);
		}
		reader.readAsDataURL(item._file);
	};

	$scope.uploader = uploader;

	$scope.uploadFile = function(){
		if($scope.uploader.queue.length > 0 ){
			var url = '/items/' + $scope.item._id + '/add_image.json';
			$scope.uploader.url = url;
			var item = $scope.uploader.queue[0];
			item.url = url;

			item.onSuccess = function(res, status, header){
				$scope.item = res;
				$scope.uploader.clearQueue();
				var preview = document.getElementById('preview');
				preview.setAttribute('src', "");
				preview.value= "";
			};

			item.upload();
		}else {
			alert('Please select image');
		}
	}
}]);

appController.controller('EditItemController', ['$scope', '$routeParams', 'Api', function($scope, $routeParams, Api) {
	$scope.item = Api.get({id: $routeParams.id});
}]);

appController.controller('NewItemController', ['$scope', '$routeParams', '$location', 'Api', function($scope, $routeParams, $location, Api) {
	$scope.categoryOptions = [
		"Electronics",
		"Appliances",
		"Men",
		"Women",
		"Kids",
		"Sports",
		"Others"
	]

	$scope.item = {
		availability: true
	};

	$scope.saveItem = function() {
		Api.save($scope.item, function(response){
			if(response.status == 200){
				$location.path('/');
			}else{
				alert('something went wrong');
			}
		});
	}
}]);