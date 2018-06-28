const canvas = require('canvas-api-wrapper');

async function main(courseObj, courseId) {
    const course = canvas.getCourse(courseId);
    await course.modules.get();

    // Get all the titles from the modules
    var titles = course.modules.map(module => {
        return module.name;
    });
    // Get all the lowercase titles from the modules
    var lcTitles = titles.map(title => {
        return title.toLowerCase();
    });
    // Create the necessary variables for the child to behave properly
    var i,
        oldModuleName;

    // Create/Modify the Instructor Resources Module
    if (!titles.includes('Instructor Resources (DO NOT PUBLISH)')) {
        if (lcTitles.includes('instructor resources') || lcTitles.includes('instructor resources (do not publish)')) {
            // The module is there, we just need to change the spelling
            i = course.modules.findIndex(module => {
                return module.name.toLowerCase() === 'instructor resources';
            });
            oldModuleName = course.modules[i].getTitle();
            course.modules[i].setTitle('Instructor Resources (DO NOT PUBLISH)');
            course.modules[i].published = false;
            await course.modules.update();
            courseObj.log('Modules Spelling Updated', {
                'Old Module\'s Name': oldModuleName,
                'New Module\'s Name': course.modules[i].name,
                'Module ID': course.modules[i].id
            });
        } else {
            // The module isn't there, create it, but DO NOT PUBLISH
            var instructorModule = await course.modules.create({
                name: 'Instructor Resources (DO NOT PUBLISH)',
                position: 2
            });
            courseObj.log('Modules Created', {
                'Module Name': instructorModule.name,
                'Module ID': instructorModule.id
            });
        }
    }

    // Create/Modify the Student Resources Module
    if (!titles.includes('Student Resources')) {
        if (lcTitles.includes('student resources')) {
            // The module is there, we just need to change the spelling
            i = course.modules.findIndex(module => {
                return module.name.toLowerCase() === 'student resources';
            });
            oldModuleName = course.modules[i].getTitle();
            course.modules[i].setTitle('Student Resources');
            course.modules[i].published = true;
            await course.modules.update();
            courseObj.log('Modules Spelling Updated', {
                'Old Module\'s Name': oldModuleName,
                'New Module\'s Name': course.modules[i].name,
                'Module ID': course.modules[i].id
            });

        } else {
            // The module isn't there, create it and publish it
            var studentModule = await course.modules.create({
                name: 'Student Resources'
            });
            courseObj.log('Modules Created', {
                'Module Name': studentModule.name,
                'Module ID': studentModule.id
            });
            studentModule.published = true;
            await studentModule.update();
            courseObj.log('Modules Published', {
                'Module Name': studentModule.name,
                'Module ID': studentModule.id
            });
        }
    }
}

module.exports = (course, stepCallback) => {

    /************************************
     * START HERE
     ************************************/

    main(course, course.info.canvasOU)
        .then(() => stepCallback(null, course))
        .catch(err => {
            console.log(err);
            stepCallback(err, course);
        });
};