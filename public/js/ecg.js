window.myData.charts[$("#ecgScript").data('arg1')].ecg = new Highcharts.chart('ecgContainer', {
      chart: {
            height: 150,
            animation: {
                duration: 50                        
            }
      },
      title: {
            text: 'ECG',
            align: 'left'
  },
  credits: {
      enabled: false
  },
  exporting: {
      enabled: false
  },
  xAxis: {
      labels: {
            enabled: false
      }
  },
  yAxis: {
      title: {
          text: 'mm',
      },
      min: 0,
      max: 10,
      labels: {
            enabled: false
      }
},
plotOptions: {
  series: {
      label: {
          enable: false
    },
}
},

series: [{
showInLegend: false,
  data: []
}]
});

