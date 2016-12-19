var assert = require("assert")
var fixTime = require('../index.js');
describe('时间测试', function(){
    it('2014／12／06 07:10', function(){
        assert.equal('2014-12-06 07:10', fixTime(new Date(2014,11,06,07,10).getTime(), [{separate: -Infinity, formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}'}]));
    });
    it('2年前', function(){
        assert.equal('2年前', fixTime(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000, [{separate: -Infinity, formateStyle: '#{{year}}年前'}]));
    });
    it('刚刚', function(){
        assert.equal('刚刚', fixTime(new Date().getTime() - 59 * 60 * 1000, [{separate: -60 * 60 *1000, formateStyle: '刚刚'}]));
    });
    it('2小时前', function(){
        assert.equal('2小时前', fixTime(new Date().getTime() - 2 * 60 * 60 * 1000 - 6000, [{separate: -3 * 60 * 60 *1000, formateStyle: '#{{hour}}小时前'}]));
    });
    it('2周前', function(){
        assert.equal('2周前', fixTime(new Date().getTime() - 14 * 24 * 60 * 60 * 1000 - 6000, [{separate: -21 * 24 * 60 * 60 *1000, formateStyle: '#{{week}}周前'}]));
    });
});