angular.module('app').controller('mvMainCtrl', function($scope) {
    $scope.courses = [
        {name: 'C# for Sociopaths', featured: true, published: new Date('2017-10-5')},
        {name: 'C# for Non-Sociopaths', featured: true, published: new Date('2017-10-12')},
        {name: 'Super Duper Expert C#', featured: false, published: new Date('2017-10-1')},
        {name: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('2017-7-12')},
        {name: 'Pedantic C++', featured: true, published: new Date('2016-1-1')},
        {name: 'JavaScript for People over 20', featured: true, published: new Date('2017-10-13')},
        {name: 'Maintainable Code for Cowards', featured: true, published: new Date('2016-10-1')},
        {name: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2013-5-1')},
        {name: 'How to Job Hunt without Alerting your Boss', featured: true, published: new Date('2017-10-7')},
        {name: 'How to Keep your Soul and go into Management', featured: false, published: new Date('2017-8-1')},
        {name: 'Telling Recruiters to Leave you Alone', featured: false, published: new Date('2017-11-1')},
        {name: "Writing Code that Doesn't Suck", featured: true, published: new Date('2017-10-12')},
        {name: 'Code Reviews for Jerks', featured: false, published: new Date('2017-10-1')},
        {name: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2005-5-1')},
        {name: 'Death March Coding for Fun and Profit', featured: true, published: new Date('2001-1-1')}
    ]
});