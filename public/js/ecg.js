Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

Highcharts.chart('container', {
    chart: {
            defaultSeriesType: 'spline',
            events: {

            }, 
            height: 150,
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
            text: 'Cap',
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
            tickInterval: 15,
            min: 0,
            max: 60,
            title: {
                text: 'mmHg',
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