const express                           = require('express');
const Logger = require('cpclog');

const router = express.Router();
const logger = Logger.createWrapper('tag', Logger.LEVEL_DEBUG);
 
router.post('/:name', function (req, res) {
    logger.debug('user router:', req.params, req.body);
    //res.send('' + req.body.greeting + req.params.name);
    res.json({result: 'ok', greetingBack: req.body.greeting, greetingBackName: req.params.name});
});
 
module.exports = router;