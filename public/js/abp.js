Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

window.myData.charts[$("#abpScript").data('arg1')].abp = new Highcharts.chart('abpContainer', {
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
