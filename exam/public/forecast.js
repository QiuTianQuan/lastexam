// var tdweather = document.querySelectorAll('.sun');
var tdtemp = document.getElementById('tdtemp');
var todaywt = document.getElementById('todaywt');
var Interval = document.getElementById('Interval');
var temp = document.querySelectorAll('.temp');
var weather = document.querySelectorAll('.weather');
var max = document.querySelectorAll('.max');
var min = document.querySelectorAll('.min');
var canvas = document.getElementById("canvas");
var date = document.getElementById('date');
var ctx = canvas.getContext("2d");
var arr = new Array();
var sum = new Array();

//获取时间
var d = new Date()
var day = d.getDate()
var month = d.getMonth() + 1
var year = d.getFullYear()
date.innerHTML = year + "." + month + "." + day;

//获取数据
function GetData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/ajaxget", true); //用ajax 发送get请求
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            arr = JSON.parse(xhr.responseText); //将jsonz转化为数组
            //把数据放进html里
            tdtemp.innerHTML = (parseInt(arr[0].max_temp) + parseInt(arr[0].min_temp)) * 0.5 + "°";
            todaywt.innerHTML = arr[0].weather;
            Interval.innerHTML = Math.round(arr[0].min_temp) + "°" + "~" + Math.round(arr[0].max_temp) + "°";

            for (let i = 0; i < temp.length; i++) {
                temp[i].innerHTML = (parseInt(arr[i].max_temp) + parseInt(arr[i].min_temp)) * 0.5 + "°";
                weather[i].innerHTML = arr[i].weather;
                max[i].innerHTML = Math.round(arr[i].max_temp) + "°";
                min[i].innerHTML = Math.round(arr[i].min_temp) + "°";
            }

            for (let i = 0; i < temp.length; i++) {
                sum[i] = (parseInt(arr[i].max_temp) + parseInt(arr[i].min_temp)) * 0.5;
            }
            //绘制温度变化图
            ctx.translate(0, canvas.height);
            ctx.scale(1, -1);
            var m = 50
            ctx.beginPath();
            //这个我试了很多循环的方法都没法画出来，所以只有一个一个画
            ctx.moveTo(0, m + sum[0]);
            ctx.lineTo(50, m + sum[1]);
            ctx.moveTo(50, m + sum[1]);
            ctx.lineTo(100, m + sum[2]);
            ctx.moveTo(100, m + sum[2]);
            ctx.lineTo(150, m + sum[3]);
            ctx.moveTo(150, m + sum[3]);
            ctx.lineTo(200, m + sum[4]);
            ctx.moveTo(200, m + sum[4]);
            ctx.lineTo(250, m + sum[5]);
            ctx.moveTo(250, m + sum[5]);
            ctx.lineTo(300, m + sum[6]);
            ctx.strokeStyle = "white"; //设置轮廓颜色
            ctx.strokeWidth = 3;
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath(); // 开启绘制路径

            for (let i = 0; i < temp.length; i++) {
                sum[i] = (parseInt(arr[i].max_temp) + parseInt(arr[i].min_temp)) * 0.5;

                ctx.arc(i * 50, m + sum[i], 2, 0, 2 * Math.PI); // 绘制圆 参数依次为 圆的横坐标/纵坐标/半径/绘制圆的起始位置/绘制圆的弧度大小
                ctx.fillStyle = "rgba(255,255,255,.8)"; // 设置填充颜色
                ctx.fill(); // 填充颜色
                ctx.closePath(); // 关闭绘制路径
            }
        }
    }
    xhr.send(null);
}
GetData();