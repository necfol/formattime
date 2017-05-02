/**
 * Created by Necfol on 2016/12/19.
 */
"use strict";
/**
 *
 * @param originTime
 * 需要转换的时间
 * @param (Array) format
 * format:[{
 *  separate: -60*60*1000,
 *  formateStyle: '刚刚'
 * }, {
 *  separate: -24*60*60*1000,
 *  formateStyle: '#{{hour}}小时前'
 * }, {
 *  separate: -Infinity,
 *  formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
 * }
 * ]
 */
function calc(now, originTime, num) {
    return Math.floor((now - originTime) / num);
}
function isArray(a) {
    return Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
}
function _n2(n) {
    return (100 + n).toString().substr(1, 2);
}
function substitute(tmpl, originTime, now) {
    var evaluate = /#{{([\s\S]+?)}}/,
        patt = new RegExp(evaluate).exec(tmpl) ? new RegExp(evaluate).exec(tmpl)[1] : '',
        toTime = '';
    if(!new RegExp(evaluate).exec(tmpl)) {
        return tmpl;
    }
    switch (patt) {
        case 'year':
            toTime += calc.apply(null, [now, originTime, 365 * 24 * 60 * 60 * 1000]);
            break;
        case 'month':
            toTime += calc.apply(null, [now, originTime, 30 * 24 * 60 * 60 * 1000]);
            break;
        case 'week':
            toTime += calc.apply(null, [now, originTime, 7 * 24 * 60 * 60 * 1000]);
            break;
        case 'day':
            toTime += calc.apply(null, [now, originTime, 24 * 60 * 60 * 1000]);
            break;
        case 'hour':
            toTime += calc.apply(null, [now, originTime, 60 * 60 * 1000]);
            break;
        case 'minute':
            toTime += calc.apply(null, [now, originTime, 60 * 1000]);
            break;
        case 'second':
            toTime += calc.apply(null, [now, originTime, 1000]);
            break;
        case 'millisecond':
            toTime += calc.apply(null, [now, originTime, 1]);
            break;
        case 'YYYY':
            toTime += new Date(originTime).getFullYear();
            break;
        case 'YY':
            toTime += (new Date(originTime).getFullYear() + "").slice(-2);
            break;
        case 'MM':
            toTime += _n2(new Date(originTime).getMonth() + 1);
            break;
        case 'DD':
            toTime += _n2(new Date(originTime).getDate());
            break;
        case 'HH':
            toTime += _n2(new Date(originTime).getHours());
            break;
        case 'mm':
            toTime += _n2(new Date(originTime).getMinutes());
            break;
        default:
            toTime += Math.floor((now - originTime) / (60 * 60 * 1000));
    }
    return substitute(tmpl.replace(evaluate, toTime), originTime, now);
}
function fixTime(originTime, format) {
    var now, nowByDay;
    if (arguments.length !== 2) {
        throw new Error('入参错误');
    }
    if (isNaN(originTime) || String(originTime).length !== 13) {
        throw new Error(originTime + '请输入正确的时间戳');
    }
    if (!isArray(format) || format.length < 1) {
        throw new Error(format + '转换格式错误');
    }
    originTime = Number(originTime);
    now = +new Date();
    nowByDay = +new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    for (var i = 0; i < format.length; i++) {
        if (!format[i].separate || !format[i].formateStyle) {
            throw  new Error('no seprate or no formateStyle');
        }
        if (typeof format[i].separate != 'number') {
            throw  new Error(format[i].separate + ' not number');
        }
        if(format[i].byDay) {
            if(originTime >= nowByDay + format[i].separate) {
                return substitute(format[i].formateStyle, originTime, nowByDay)
            } else {
                continue;
            }
        } else if (originTime >= now + format[i].separate) {
            return substitute(format[i].formateStyle, originTime, now)
        } else {
            continue;
        }
    }
}
module.exports = fixTime;