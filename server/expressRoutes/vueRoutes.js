const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    const data: {
        otherData: 'Something Else'
    };
    const vueOptions: {
        head: {
            title: 'Page Title',
            meta: [
                { property:'og:title', content: 'Page Title'},
                { name:'twitter:title', content: 'Page Title'},
            ]
        }    
    }
    res.renderVue('Test', data, vueOptions);
})