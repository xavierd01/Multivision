angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            let dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(response) {
                if (response.data.success) {
                    let user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function(role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute: function() {
            if (mvIdentity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        createUser: function(newUserData) {
            let newUser = new mvUser(newUserData);
            let dfd = $q.defer();
            
            newUser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        logoutUser: function() {
            let dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve(true);
            });
            return dfd.promise;
        },

        updateCurrentUser: function(newUserData) {
            let dfd = $q.defer();

            let clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        
    }
});