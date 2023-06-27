import rendered from './_site/index.html?raw';
import b2c from './_site/index-b2c/index.html?raw';
import {withRunScript} from 'storybook-addon-run-script/html';


const runScript = `
var app = document.getElementById('app');
app.innerHTML = decodeURI('${encodeURI(b2c)}');
`;

export default {
    title: 'Index2',
    decorators: [
        withRunScript( runScript)
    ],

};

const Template = () => rendered;


export const Index = Template.bind({});