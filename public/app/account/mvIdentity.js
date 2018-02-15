angular.module('app').factory('mvIdentity', function($window, mvUser) {
    let currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});