/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-api-wrapper');
canvas.oncall = e => console.log(e.method, e.url, e.body);

async function main(courseId) {
    console.log('Hello there');
    const course = canvas.getCourse(courseId);
    await course.modules.get();
    console.log(course.modules);

}

module.exports = (course, callback) => {
    /************************************
     * START HERE
     ************************************/
    tap.test('child-template', (test) => {
        main(course.info.canvasOU)
            .then(() => {
                test.pass('potatooooo');
                test.end();
            })
            .catch(err => {
                console.log(err);
                callback();
            });



    });
    // Always call the callback in your childTests with just null
    callback(null);
};