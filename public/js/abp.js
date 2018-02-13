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
            width: 400,
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
            text: 'ABP',
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
            tickInterval: 100,
            min: 0,
            max: 200,
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