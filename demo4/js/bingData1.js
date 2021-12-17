var mychart = echarts.init(document.getElementById("bingData1"));
var data = [];
var option = {
    tooltip: {
        show: true
    },
    legend: {  
        // width:40,      //图行例组件的宽度,默认自适应
        // x : 'center',   //图例显示在右边
        // y: 'bottom',   //图例在垂直方向上面显示居中
        bottom:10,
        itemWidth:10,  //图例标记的图形宽度
        itemHeight:10, //图例标记的图形高度
        data:['断开','连接'],
        textStyle:{    //图例文字的样式
            color:'white', 
            fontSize:12    //文字大小
        }
    },
    series: [{
        name: "通断:",
        type: "pie",
        hoverAnimation: false,

        radius: ["40%", "42%"],
        center: ["50%", "50%"],
        label: {
            show: false
        },
        labelLine: {
            show: false
        },

        data: (function () {
            var arr = [];
            var arrduan=[];
            $.ajax({
                type: "get",
                async: false,
                url: "../show_site.php",
                data: {},
                dataType: "json",
                success: function (result) {
                    if (result) {
                        for (var sum0 = 0, sum1 = 0, i = 0; i <22; i++) {
                            if (result[i].connected == '0') {
                                sum0++;
                                arrduan.push({
                                    name:result[i].city_name
                                })
                            } else {
                                sum1++
                            }
                        }
                        arr.push({
                            value: sum0,
                            name: '断开',
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    shadowBlur: 20,
                                    borderRadius:20,
                                    borderColor: 'yellow',
                                    color: 'yellow',
                                    shadowColor: 'yellow'
                                }
                            }

                        }, {
                            value: sum1,
                            name: '连接',
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    shadowBlur: 20,
                                    borderRadius:20,
                                    borderColor: '#00ffff',
                                    color: '#00ffff',
                                    shadowColor: '#00ffff'
                                }
                            }

                        });
                    }
                },
            })
            console.log("arr:" + arr)
            return arr;
        })()
    }]
};
mychart.setOption(option);
