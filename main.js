const canvas = require('canvas-api-wrapper');

async function main(courseId) {
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
            })
            course.modules[i].setTitle('Instructor Resources (DO NOT PUBLISH)');
            course.modules[i].published = false;
            await course.modules.update();
        } else {
            var studentModule = await course.modules.create({
                name: "Instructor Resources (DO NOT PUBLISH)",
                position: 2
            });
        }
    }
    titles = titles.map(title => {
        return title.toLowerCase();
    });
    if (!titles.includes('student resources')) {
        var studentModule = await course.modules.create({
            name: "Student Resources"
        });

        studentModule.published = true;
        await studentModule.update();
    }
    return 1;
}

module.exports = (course, stepCallback) => {

    /************************************
     * START HERE
     ************************************/

    main(course.info.canvasOU)
        .then(() => stepCallback)
        .catch(err => {
            console.log(err);
            stepCallback();
        })
};
