Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

window.myData.charts[$("#svo2Script").data('arg1')].svo2 = new Highcharts.chart('svo2Container', {
    chart: {
            defaultSeriesType: 'spline',
            events: {

            }, 
            height: 150,
            animation: {
                duration: 2000                        
            }
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'SVO2',
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            maxZoom: 20 * 1000,
            labels: {
                enabled: false
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            tickInterval: 25,
            min: 25,
            max: 100,
            title: {
                text: '%',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            showInLegend: false,  
            data: []
        }]
});

