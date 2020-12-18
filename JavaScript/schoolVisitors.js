var viewDiv=document.getElementById("viewDiv");
var btnVisitors=document.getElementById("btnVisitors");
var dataDiv=document.getElementById("dataDiv");

btnVisitors.onclick=function(){
    if(dataDiv==null){
       showVisitors();
    }else{
        viewDiv.removeChild(dataDiv);
        dataDiv=null;
    }
}
    

function showVisitors() {
    dataDiv=document.createElement("div")
    dataDiv.id="SchoolPeopleDataDiv";
    dataDiv.className="dataDiv";
    FuncMoveDiv(dataDiv)
    viewDiv.appendChild(dataDiv);
        Highcharts.setOptions({
		global: {
				useUTC: false
		}
            });
            function activeLastPointToolip(chart) {
                    var points = chart.series[0].points;
                    chart.tooltip.refresh(points[points.length -1]);
            }
            var chart = Highcharts.chart('SchoolPeopleDataDiv', {
                    chart: {
                            type: 'spline',
                            marginRight: 10,
                            events: {
                                    load: function () {
                                            var series = this.series[0],
                                                    chart = this;
                                            activeLastPointToolip(chart);
                                            setInterval(function () {
                                                    var x = (new Date()).getTime();// 当前时间
                                                    var flag=Math.round(Math.random());
                                                    var y=randomY();
                                                   
                                                    series.addPoint([x, y], true, true);
                                                    activeLastPointToolip(chart);
                                            }, 1000);
                                    }
                            }
                    },
                    title: {
                            text: '校园实时人数'
                    },
                    xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150
                    },
                    yAxis: {
                            title: {
                                    text: "人数(单位:人)"
                            }
                    },
                    tooltip: {
                            formatter: function () {
                                    return '<b>' + this.series.name + '</b><br/>' +
                                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                            Highcharts.numberFormat(this.y, 2);
                            }
                    },
                    legend: {
                            enabled: false
                    },
                    series: [{
                            name: '校园人数',
                            data: (function () {
                                    // 生成随机值
                                    var data = [],
                                            time = (new Date()).getTime(),
                                            i;
                                    for (i = -19; i <= 0; i += 1) {
                                            data.push({
                                                    x: time + i * 1000,
                                                    y: randomY(),
                                            });
                                    }
                                    return data;
                            }())
                    }]
            });
}

function randomY() {
        var flag=Math.round(Math.random());
        var y;
        if(flag){
            y=2400+Math.round(Math.random()*5);
        }else{
            y=y=2400-Math.round(Math.random()*5);
        }// 随机值
        return y;
}