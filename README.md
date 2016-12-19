# formattime #

时间转换
 
☝️:npm install

✌️:npm test(测试用例)

👌: fixTime使用

 *  @param originTime

    ```
    (String/Number)
    ```
 *  @param  format

    ```
    时间间隔按照从小到大顺序
    (Array)
      format:[{
         separate: -60*60*1000,
         formateStyle: '刚刚'
      }, {
         separate: -24*60*60*1000,
         formateStyle: '#{{hour}}小时前'
      }, {
         separate: -30*24*60*60*1000,
         formateStyle: '#{{day}}天前',
      },{
         separate: -Infinity,
         formateStyle: '#{{YYYY}}-#{{MM}}-#{{DD}} #{{HH}}:#{{mm}}',
      }]
    ```

🙋:自己试试吧！
