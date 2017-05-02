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
    it('昨天', function(){
        assert.equal('昨天', fixTime(new Date().getTime() - 24 * 60 * 60 * 1000 - 1, [{
          separate: +1*1000,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
        },{
          separate: -60*60*1000,
          formateStyle: '刚刚',
        }, {
          separate: -24*60*60*1000,
          formateStyle: '#{{hour}}小时前'
        }, {
          separate: -1*24*60*60*1000,
          formateStyle: '昨天',
          byDay: true
        }, {
          separate: -2*24*60*60*1000,
          formateStyle: '前天 #{{HH}}:#{{mm}}',
          byDay: true
        }, {
          separate: -3*24*60*60*1000,
          formateStyle: '大前天 #{{HH}}:#{{mm}}',
          byDay: true
        }, {
          separate: -Infinity,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
          byDay: true
        }]));
    });
    it('前天', function(){
        var time = new Date(+new Date() - 3 * 24 * 60 * 60 * 1000);
        assert.equal('大前天 00:29', fixTime(+new Date(time.getFullYear(), time.getMonth(), time.getDate(), 00, 29), [{
          separate: +1*1000,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
          byDay: true
        },{
          separate: -60*60*1000,
          formateStyle: '刚刚',
          byDay: true
        }, {
          separate: -24*60*60*1000,
          formateStyle: '#{{hour}}小时前',
          byDay: true
        }, {
          separate: -1*24*60*60*1000,
          formateStyle: '昨天 #{{HH}}:#{{mm}}',
          byDay: true
        }, {
          separate: -2*24*60*60*1000,
          formateStyle: '前天 #{{HH}}:#{{mm}}',
          byDay: true
        }, {
          separate: -3*24*60*60*1000,
          formateStyle: '大前天 #{{HH}}:#{{mm}}',
          byDay: true
        }, {
          separate: -Infinity,
          formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
          byDay: true
        }]));
    });
});