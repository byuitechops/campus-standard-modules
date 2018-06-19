const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /************************************
     * START HERE
     ************************************/

    // TODO: Get the modules from the Brightspace course

    // Get the modules from the Canvas course
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules`, (err, modules) => {
        if (err) {
            console.log(err);
            stepCallback(null, course);
            return;
        }
        var titles = modules.map(module => {
            return module.name;
        });
        if (titles.includes('Instructor Resources (DO NOT PUBLISH)') && titles.includes('Instructor Resources (DO NOT PUBLISH)')) {
            course.log({
                'Course Code': 'Placeholder',
                'Old Instructor Resources': 'Kept',
                'Old Student Resources': 'Kept'
            });
        } else {
            titles = titles.map(title => {
                return title.toLowerCase();
            });
            console.log(titles);
            // TODO: Check to see if an instructor/student resources module exists
            // TODO: Add the necessary modules
        }
    });

};