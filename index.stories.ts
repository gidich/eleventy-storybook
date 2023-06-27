import rendered from './_site/index.html?raw';
import b2c from './_site/index-b2c/index.html?raw';
import {withRunScript} from 'storybook-addon-run-script/html';
import localScript from './index-script.js?raw';
import {withHtml}   from 'storybook-addon-html/html';


const runScript = `
var app = document.getElementById('app');
app.innerHTML = decodeURI('${encodeURI(b2c)}');
`  + localScript ;

export default {
    title: 'Index',
    decorators: [
        withRunScript( runScript),
     //  withHtml("<div>hey</div>")
    ],

};

const Template = () =>  rendered;


export const Index = Template.bind({});