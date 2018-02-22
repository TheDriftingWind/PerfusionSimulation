Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

// Create the chart
Highcharts.stockChart('container', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                console.log(series)
                var index = 101;
                setInterval(function () {
                  for(let i = index; i <= index + 9; i++){
                     var x = i * .1;
                     var y;

                     if(x % 1 == 0){
                        console.log(x)
                        y = Math.round(Math.random() * (100-85) + 85)
                     }else{
                        y = Math.round(Math.random() * (30))
                     }

                    series.addPoint([x, y], true, true);
                  }
                  index += 10;
                }, 1000);
            }
        },
        height: 150,
        width: 400
    },

    plotOptions: {
        series: {
            animation: false
        }
    },

    rangeSelector: {
        enabled: false
    },

    navigator: {
        enabled: false
    },

    scrollbar: {
        enabled: false
    },

    title: {
        text: 'Live random data'
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
      labels: {
         enabled: false
      }
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = 1; i <= 100; i += 1) {
               var x = i * .1;
               var y;

               if(x % 1 == 0){
                  console.log(x)
                  y = Math.round(Math.random() * (100-85) + 85)
               }else{
                  y = Math.round(Math.random() * (30))
               }

                data.push([
                    x,
                    y
                ]);
            }
            return data;
        }())
    }]
});
