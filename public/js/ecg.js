Highcharts.chart('ecgContainer', {
      chart: {
            height: 150
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
  data: (function () {
            // generate an array of random data
            var data = [];

            for (i = 1; i <= 100; i++) {
               var y;

               if(i % 20 == 0){
                  y = 8;
               }else{
                  y = Math.random() * (3 - 1) + 1
               }

                data.push([y]);
            }
            return data;
        }())}]
});



