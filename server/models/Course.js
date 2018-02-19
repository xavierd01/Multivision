let mongoose = require('mongoose');

let courseSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required!'},
    featured: {type:Boolean, required:'{PATH} is required!'},
    published: {type:Date, required:'{PATH} is required!'},
    tags: [String]
});

let Course = mongoose.model('Course', courseSchema);

function createDefaultCourses () {
    Course.find({}).exec(function(err, collection) {
        // set up some test users.
        if (collection.length === 0) {
            Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('2017-10-5'), tags: ['C#']});
            Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('2017-10-12'), tags: ['C#']});
            Course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('2017-10-1'), tags: ['C#']});
            Course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('2017-7-12'), tags: ['VB']});
            Course.create({title: 'Pedantic C++', featured: true, published: new Date('2016-1-1'), tags: ['C++']});
            Course.create({title: 'JavaScript for People over 20', featured: true, published: new Date('2017-10-13'), tags: ['JS']});
            Course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('2016-10-1'), tags: ['Coding']});
            Course.create({title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2013-5-1'), tags: ['Coding']});
            Course.create({title: 'How to Job Hunt without Alerting your Boss', featured: true, published: new Date('2017-10-7'), tags: ['Misc']});
            Course.create({title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('2017-8-1'), tags: ['Management']});
            Course.create({title: 'Telling Recruiters to Leave you Alone', featured: false, published: new Date('2017-11-1'), tags: ['Misc']});
            Course.create({title: "Writing Code that Doesn't Suck", featured: true, published: new Date('2017-10-12'), tags: ['Coding']});
            Course.create({title: 'Code Reviews for Jerks', featured: false, published: new Date('2017-10-1'), tags: ['Coding']});
            Course.create({title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2005-5-1'), tags: ['Misc']});
            Course.create({title: 'Death March Coding for Fun and Profit', featured: true, published: new Date('2001-1-1'), tags: ['Coding', 'Misc']});
        }
    });
};

exports.createDefaultCourses = createDefaultCourses;