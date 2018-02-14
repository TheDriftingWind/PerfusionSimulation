Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

Highcharts.chart('cvpContainer', {
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
            text: 'CVP',
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
            tickInterval: 5,
            min: 0,
            max: 20,
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