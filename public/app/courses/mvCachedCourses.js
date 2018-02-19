angular.module('app').factory('mvCachedCourses', function(mvCourse) {
    let courseList;

    return {
        query: function() {
            if (!courseList) {
                courseList = mvCourse.query();
            }

            return courseList;
        }
    }
});