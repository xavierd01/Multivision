angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams) {
    mvCachedCourses.query().$promise.then((collection) => {
        collection.forEach((course) => {
            if (course._id === $routeParams.id) {
                $scope.course = course;
            }
        });
    });
});