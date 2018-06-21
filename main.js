const canvas = require('canvas-api-wrapper');

async function main(courseObj, courseId) {
    const course = canvas.getCourse(courseId);
    await course.modules.get();
    var titles = course.modules.map(module => {
        return module.name;
    });
    if (!titles.includes('Instructor Resources (DO NOT PUBLISH)')) {
        titles = titles.map(title => {
            return title.toLowerCase();
        });
        // TODO: Check to see if an instructor resources module exists, but is named differently than the Canvas standard
        if (titles.includes('instructor resources')) {
            var i = course.modules.findIndex(module => {
                return module.name.toLowerCase() === 'instructor resources';
            });
            var oldModuleName = course.modules[i].getTitle();
            course.modules[i].setTitle('Instructor Resources (DO NOT PUBLISH)');
            course.modules[i].published = false;
            await course.modules.update();
            courseObj.log('Modules Spelling Updated', {
                'Old Module\'s Name': oldModuleName,
                'New Module\'s Name': course.modules[i].name,
                'Module ID': course.modules[i].id

            });
        } else {
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
    titles = titles.map(title => {
        return title.toLowerCase();
    });
    if (!titles.includes('student resources')) {
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