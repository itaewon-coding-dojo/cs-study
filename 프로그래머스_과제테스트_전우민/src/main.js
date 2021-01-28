import App from './App.js';
import InitialSetting from './InitialSetting.js';

const app = new App(document.querySelector("#App"));

new InitialSetting({ app });
