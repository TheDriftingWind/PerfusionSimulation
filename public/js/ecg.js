$(function() {

   var data = getData();

   // create the chart
   window.chart = new Highcharts.StockChart({
      chart: {
         renderTo: 'container',
         events: {
            load: function() {
               var chart = this;
               setTimeout(function () {
                     console.log(chart.xAxis[0].getExtremes())
                     var min = chart.xAxis[0].getExtremes().min;
                     chart.xAxis[0].setExtremes(min, min + 8 * 1000)
                 }, 1000);
            }
         },
         height: 150,
         width: 400
      },

      navigator: {
         enabled: false,
      },

      rangeSelector: {
         enabled: false
      },

      scrollbar: {
         enabled: false
      },

      title: {
         text: 'ECG'
      },

      xAxis: {
         labels: {
            enabled: false
         },
         startOnTick: false,
         endOnTick: false,
         min: 0,
         max: 1500,
         minRange: 1 * 1000
      },

      yAxis: {
         labels: {
            enabled: false
         }
      },

      series: [{
         type: 'spline',
         pointInterval: 4, // 250Hz
         data: data,
         dataGrouping: {
            enabled: true
         },
         enabled: true
      }]
   });

});


function getData() {

   return [
      995,
      995,
      995,
      995,
      995,
      999,
      996,
      994,
      993,
      992,
      989,
      987,
      991,
      990,
      988,
      987,
      993,
      995,
      987,
      981,
      979,
      975,
      973,
      969,
      969,
      971,
      972,
      969,
      966,
      966,
      966,
      966,
      963,
      968,
      969,
      968,
      964,
      965,
      967,
      966,
      962,
      960,
      955,
      947,
      946,
      935,
      927,
      935,
      961,
      997,
      1048,
      1121,
      1176,
      1187,
      1140,
      1045,
      965,
      937,
      945,
      958,
      958,
      955,
      958,
      960,
      962,
      958,
      956,
      957,
      957,
      958,
      958,
      959,
      958,
      955,
      955,
      959,
      962,
      960,
      957,
      957,
      956,
      954,
      953,
      957,
      958,
      957,
      954,
      959,
      958,
      958,
      957,
      956,
      957,
      954,
      953,
      955,
      958,
      958,
      958,
      957,
      957,
      956,
      955,
      954,
      956,
      957,
      955,
      954,
      956,
      957,
      956,
      953,
      954,
      955,
      957,
      953,
      952,
      952,
      952,
      949,
      949,
      952,
      952,
      949,
      950,
      951,
      952,
      951,
      951,
      957,
      959,
      958,
      956,
      963,
      964,
      966,
      966,
      968,
      972,
      974,
      972,
      973,
      976,
      975,
      974,
      973,
      976,
      973,
      975,
      974,
      974,
      971,
      972,
      971,
      971,
      971,
      968,
      966,
      970,
      972,
      968,
      967,
      969,
      970,
      970,
      966,
      968,
      968,
      968,
      964,
      963,
      965,
      963,
      962,
      964,
      967,
      967,
      965,
      963,
      965,
      964,
      962,
      959,
      963,
      966,
      961,
      958,
      962,
      963,
      962,
      959,
      959,
      961,
      963,
      963,
      964,
      964,
      965,
      964,
      963,
      966,
      967,
      963,
      962,
      965,
      966,
      969,
      969,
      970,
      974,
      974,
      978,
      981,
      984,
      983,
      979,
      980,
      979,
      979,
      978,
      976,
      978,
      981,
      982,
      971,
      967,
      963,
      958,
      958,
      961,
      960,
      960,
      956,
      956,
      956,
      954,
      953,
      958,
      958,
      959,
      954,
      956,
      958,
      958,
      953,
      952,
      946,
      936,
      928,
      919,
      923,
      951,
      989,
      1037,
      1110,
      1174,
      1207,
      1203,
      1147,
      1060,
      989,
      950,
      933,
      932,
      940,
      946,
      947,
      947,
      948,
      947,
      947,
      947,
      948,
      945,
      942,
      944,
      945,
      943,
      946,
      949,
      946,
      944,
      942,
      944,
      946,
      944,
      941,
      943,
      943,
      942,
      942,
      944,
      944,
      946,
      943,
      945,
      946,
      947,
      942,
      944,
      946,
      948,
      945,
      943,
      946,
      946,
      944,
      941,
      943,
      945,
      942,
      940,
      941,
      941,
      939,
      938,
      938,
      939,
      938,
      934,
      934,
      937,
      934,
      933,
      931,
      933,
      934,
      930,
      930,
      934,
      935,
      937,
      936,
      944,
      950,
      951,
      951,
      957,
      960,
      960,
      958,
      960,
      963,
      964,
      960,
      961,
      963,
      964,
      960,
      961,
      962,
      964,
      960,
      960,
      963,
      961,
      962,
      961,
      964,
      966,
      963,
      960,
      962,
      962,
      961,
      959,
      961,
      960,
      959,
      957,
      957,
      957,
      959,
      955,
      955,
      957,
      958,
      955,
      955,
      959,
      958,
      956,
      953,
      958,
      958,
      955,
      952,
      953,
      955,
      955,
      955,
      955,
      958,
      957,
      955,
      954,
      956,
      956,
      955,
      954,
      956,
      957,
      956,
      957,
      957,
      958,
      956,
      955,
      957,
      961,
      965,
      965,
      968,
      970,
      971,
      972,
      974,
      977,
      981,
      976,
      976,
      975,
      976,
      973,
      969,
      971,
      976,
      980,
      976,
      970,
      968,
      964,
      960,
      957,
      957,
      955,
      950,
      953,
      954,
      953,
      950,
      948,
      950,
      951,
      948,
      948,
      950,
      951,
      946,
      942,
      937,
      929,
      921,
      912,
      917,
      949,
      994,
      1053,
      1135,
      1199,
      1207,
      1139,
      1013,
      934,
      925,
      939,
      945,
      946,
      946,
      944,
      945,
      944,
      945,
      945,
      943,
      944,
      943,
      943,
      940,
      943,
      942,
      940,
      937,
      941,
      942,
      941,
      938,
      940,
      942,
      942,
      940,
      944,
      945,
      944,
      944,
      943,
      946,
      944,
      941,
      939,
      941,
      941,
      939,
      939,
      941,
      944,
      943,
      939,
      943,
      945,
      944,
      943,
      946,
      945,
      946,
      942,
      943,
      943,
      941,
      940,
      939,
      941,
      942,
      937,
      937,
      940,
      940,
      940,
      939,
      941,
      945,
      946,
      949,
      954,
      957,
      958,
      957,
      959,
      962,
      963,
      962,
      963,
      964,
      964,
      962,
      962,
      962,
      963,
      961,
      959,
      962,
      963,
      960,
      960,
      962,
      964,
      960,
      958,
      960,
      960,
      957,
      954,
      956,
      958,
      957,
      954,
      954,
      954,
      952,
      952,
      953,
      954,
      954,
      954,
      951,
      954,
      953,
      950,
      949,
      952,
      951,
      951,
      948,
      951,
      954,
      954,
      951,
      952,
      955,
      956,
      952,
      952,
      953,
      953,
      948,
      952,
      952,
      952,
      952,
      951,
      955,
      954,
      955,
      955,
      961,
      963,
      962,
      963,
      967,
      969,
      968,
      969,
      972,
      974,
      972,
      970,
      968,
      971,
      969,
      968,
      968,
      969,
      972,
      976,
      970,
      962,
      959,
      952,
      948,
      948,
      950,
      948,
      946,
      946,
      947,
      946,
      943,
      945,
      949,
      946,
      943,
      943,
      945,
      943,
      936,
      930,
      923,
      920,
      915,
      899,
      898,
      916,
      944,
      980,
      1032,
      1109,
      1173,
      1195,
      1147,
      1040,
      947,
      921,
      933,
      945,
      946,
      943,
      943,
      947,
      945,
      943,
      943,
      944,
      945,
      942,
      942,
      945,
      943,
      943,
      943,
      945,
      947,
      945,
      944,
      944,
      945,
      944,
      943,
      944,
      946,
      949,
      946,
      946,
      948,
      947,
      945,
      947,
      949,
      948,
      945,
      946,
      951,
      948,
      945,
      948,
      949,
      948,
      947,
      949,
      949,
      949,
      947,
      946,
      951,
      949,
      947,
      946,
      949,
      949,
      948,
      947,
      949,
      951,
      948,
      945,
      947,
      950,
      951,
      949,
      955,
      959,
      961,
      959,
      961,
      966,
      964,
      966,
      967,
      969,
      969,
      966,
      965,
      966,
      967,
      965,
      963,
      967,
      968,
      966,
      963,
      965,
      965,
      966,
      963,
      964,
      964,
      963,
      962,
      961,
      964,
      962,
      957,
      958,
      960,
      961,
      959,
      958,
      961,
      960,
      958,
      955,
      957,
      958,
      956,
      954,
      956,
      957,
      957,
      957,
      956,
      959,
      956,
      955,
      951,
      954,
      955,
      954,
      954,
      956,
      955,
      954,
      950,
      952,
      955,
      954,
      954,
      957,
      958,
      957,
      956,
      959,
      966,
      965,
      963,
      967,
      969,
      968,
      970,
      971,
      976,
      975,
      975,
      973,
      976,
      974,
      971,
      973,
      970,
      970,
      973,
      974,
      972,
      967,
      962,
      959,
      956,
      958,
      956,
      952,
      955,
      957,
      954,
      951,
      949,
      951,
      951,
      948,
      949,
      951,
      951,
      950,
      950,
      952,
      954,
      950,
      946,
      939,
      933,
      923,
      911,
      922,
      953,
      995,
      1055,
      1134,
      1182,
      1170,
      1081,
      980,
      932,
      928,
      937,
      944,
      946,
      945,
      942,
      939,
      943,
      944,
      943,
      942,
      946,
      946,
      945,
      945,
      946,
      946,
      945,
      940,
      943,
      945,
      944,
      940,
      941,
      943,
      943,
      942,
      943,
      941,
      942,
      942,
      941,
      943,
      945,
      945,
      944,
      945,
      943,
      941,
      937,
      942,
      945,
      944,
      943,
      943,
      945,
      945,
      941,
      941,
      945,
      944,
      941,
      939,
      939,
      939,
      934,
      934,
      937,
      933,
      933,
      933,
      937,
      939,
      936,
      934,
      937,
      940,
      941,
      940,
      945,
      950,
      951,
      951,
      955,
      960,
      963,
      962,
      962,
      962,
      962,
      961,
      961,
      963,
      964,
      962,
      961,
      961,
      965,
      963,
      964,
      968,
      966,
      964,
      959,
      963,
      964,
      961,
      958,
      959,
      960,
      957,
      957,
      959,
      959,
      961,
      957,
      956,
      957,
      959,
      961,
      957,
      958,
      958,
      957,
      956,
      959,
      961,
      958,
      953,
      955,
      957,
      960,
      956,
      958,
      961,
      958,
      958,
      957,
      958,
      958,
      956,
      956,
      959,
      959,
      955,
      955,
      958,
      960,
      963,
      964,
      970,
      973,
      972,
      972,
      975,
      977,
      979,
      977,
      980,
      979,
      977,
      974,
      976,
      978,
      975,
      973,
      976,
      983,
      984,
      978,
      970,
      968,
      966,
      959,
      956,
      955,
      954,
      955,
      953,
      955,
      956,
      955,
      951,
      953,
      953,
      956,
      950,
      951,
      955,
      954,
      952,
      947,
      945,
      936,
      929,
      919,
      916,
      929,
      958,
      997,
      1063,
      1143,
      1191,
      1185,
      1103,
      998,
      936,
      925,
      935,
      945,
      945,
      945,
      946,
      948,
      947,
      944,
      942,
      946,
      945,
      943,
      941,
      944,
      945,
      942,
      941,
      943,
      946,
      944,
      941,
      944,
      945,
      945,
      942,
      942,
      945,
      945,
      941,
      941,
      943,
      943,
      941,
      939,
      942,
      945,
      944,
      942,
      944,
      945,
      941,
      940,
      941,
      943,
      940,
      939,
      943,
      943,
      944,
      943,
      944,
      945,
      943,
      941,
      939,
      942,
      941,
      938,
      936,
      937,
      938,
      934,
      935,
      937,
      937,
      936,
      934,
      938,
      941,
      944,
      947,
      953,
      958,
      959,
      958,
      962,
      966,
      966,
      964,
      965,
      967,
      965,
      966,
      966,
      968,
      969,
      966,
      966,
      969,
      970,
      969,
      966,
      968,
      969,
      966,
      963,
      965,
      967,
      966,
      963,
      962,
      964,
      963,
      961,
      959,
      961,
      961,
      961,
      960,
      962,
      960,
      958,
      959,
      962,
      962,
      959,
      957,
      959,
      959,
      959,
      957,
      958,
      959,
      960,
      958,
      959,
      962,
      959,
      959,
      958,
      961,
      959,
      958,
      958,
      958,
      960,
      958,
      958,
      961,
      961,
      959,
      958,
      961,
      963,
      964,
      961,
      966,
      972,
      973,
      971,
      973,
      978,
      979,
      980,
      981,
      984,
      983,
      979,
      976,
      978,
      979,
      976,
      975,
      981,
      983,
      975,
      969,
      965,
      963,
      959,
      959,
      959,
      958,
      957,
      955,
      956,
      959,
      959,
      956,
      955,
      956,
      956,
      955,
      955,
      956,
      956,
      955,
      952,
      950,
      941,
      930,
      924,
      918,
      923,
      953,
      994,
      1052,
      1127,
      1191,
      1210,
      1174,
      1069,
      968,
      933,
      938,
      949,
      952,
      950,
      948,
      949,
      950,
      950,
      947,
      949,
      950,
      948,
      945,
      947,
      946,
      946,
      942,
      944,
      947,
      945,
      944,
      944,
      946,
      946,
      944,
      946,
      948,
      949,
      948,
      947,
      950,
      950,
      949,
      948,
      947,
      949,
      949,
      946,
      947,
      949,
      948,
      945,
      946,
      949,
      948,
      946,
      948,
      949,
      950,
      949,
      950,
      951,
      950,
      947,
      945,
      949,
      949,
      947,
      946,
      946,
      947,
      948,
      945,
      949,
      949,
      948,
      943,
      949,
      952,
      949,
      948,
      950,
      954,
      955,
      958,
      961,
      963,
      966,
      967,
      967,
      970,
      968,
      968,
      966,
      968,
      969,
      967,
      966,
      967,
      968,
      967,
      964,
      966,
      968,
      967,
      966,
      967,
      969,
      968,
      964,
      963,
      968,
      970,
      969,
      967,
      970,
      971,
      971,
      969,
      974,
      977,
      975,
      974,
      978,
      980,
      974,
      977,
      983,
      980,
      978,
      976,
      975,
      972,
      967,
      961,
      960,
      961,
      957,
      955,
      951,
      952,
      954,
      949,
      948,
      950,
      951,
      950,
      948,
      953,
      953,
      953,
      951,
      954,
      956,
      953,
      951,
      951,
      946,
      938,
      925,
      920,
      913,
      914,
      939,
      983,
      1031,
      1100,
      1167,
      1195,
      1177,
      1084,
      977,
      928,
      936,
      949,
      949,
      944,
      947,
      948,
      947,
      944,
      946,
      947,
      947,
      945,
      943,
      945,
      946,
      945,
      945,
      947,
      946,
      942,
      941,
      942,
      946,
      946,
      944,
      945,
      949,
      947,
      944,
      945,
      946,
      944,
      941,
      943,
      947,
      948,
      944,
      945,
      947,
      949,
      945,
      946,
      948,
      948,
      946,
      944,
      946,
      947,
      946,
      944,
      946,
      948,
      946,
      943,
      945,
      948,
      948,
      944,
      945,
      945,
      944,
      941,
      940,
      943,
      943,
      943,
      943,
      946,
      948,
      945,
      944,
      949,
      950,
      948,
      950,
      954,
      956,
      957,
      953,
      958,
      961,
      963,
      961,
      961,
      963,
      963,
      958,
      956,
      960,
      961,
      963,
      962,
      964,
      963,
      961,
      960,
      961,
      963,
      960,
      959,
      960,
      961,
      960,
      956,
      957,
      956,
      953,
      950,
      955,
      956,
      955,
      952,
      952,
      953,
      954,
      951,
      953,
      954,
      956,
      953,
      951,
      954,
      954,
      954,
      953,
      954,
      953,
      953,
      950,
      953,
      954,
      953,
      948,
      947,
      952,
      950,
      948,
      949,
      951,
      955,
      955,
      952,
      954,
      955,
      952,
      951,
      952,
      952,
      950,
      947,
      949,
      950,
      949,
      949,
      952,
      953,
      952,
      950,
      952,
      955,
      955,
      955,
      955,
      953,
      953,
      952,
      951,
      952,
      953,
      949,
      949,
      953,
      953,
      951,
      949,
      951,
      952,
      953,
      952,
      955,
      955,
      955,
      952,
      952,
      953,
      953,
      953,
      953,
      953,
      956,
      958,
      960,
      963,
      964,
      965,
      964,
      969,
      971,
      973,
      972,
      972,
      973,
      970,
      966,
      969,
      972,
      968,
      962,
      964,
      968,
      971,
      969,
      964,
      962,
      960,
      953,
      951,
      951,
      951,
      950,
      949,
      951,
      949,
      946,
      940,
      944,
      947,
      946,
      941,
      944,
      945,
      944,
      939,
      936,
      929,
      927,
      916,
      909,
      925,
      957,
      991,
      1049,
      1123,
      1179,
      1200,
      1165,
      1082,
      1000,
      948,
      923,
      916,
      924,
      932,
      934,
      938,
      942,
      942,
      940,
      939,
      939,
      938,
      935,
      934,
      938,
      938,
      935,
      936,
      939,
      938,
      939,
      935,
      937,
      937,
      936,
      935,
      938,
      939,
      938,
      936,
      939,
      939,
      938,
      936,
      938,
      940,
      939,
      936,
      935,
      936,
      938,
      936,
      937,
      938,
      941,
      939,
      939,
      942,
      943,
      941,
      939,
      941,
      943,
      943,
      939,
      941,
      941,
      937,
      932,
      932,
      933,
      932,
      929,
      925,
      928,
      925,
      924,
      923,
      927,
      926,
      924,
      925,
      928,
      932,
      931,
      932,
      937,
      939,
      942,
      944,
      947,
      952,
      954,
      954,
      956,
      959,
      963,
      960,
      963,
      964,
      963,
      961,
      960,
      961,
      961,
      959,
      959,
      961,
      962,
      960,
      958,
      959,
      961,
      959,
      957,
      959,
      960,
      959,
      957,
      959,
      960,
      960,
      957,
      955,
      956,
      956,
      953,
      953,
      955,
      957,
      955,
      954,
      957,
      958,
      956,
      954,
      955,
      957,
      955,
      953,
      956,
      955,
      954,
      949,
      950,
      955,
      954,
      952,
      952,
      955,
      954,
      952,
      953,
      953,
      956,
      953,
      953,
      955,
      956,
      952,
      950,
      956,
      960,
      963,
      963,
      965,
      966,
      970,
      970,
      971,
      973,
      975,
      972,
      972,
      973,
      973,
      968,
      969,
      967,
      970,
      975,
      974,
      968,
      966,
      961,
      957,
      954,
      953,
      951,
      947,
      949,
      954,
      952,
      950,
      950,
      952,
      951,
      949,
      947,
      951,
      949,
      947,
      945,
      947,
      947,
      939,
      928,
      922,
      917,
      909,
      921,
      959,
      1003,
      1067,
      1138,
      1191,
      1193,
      1124,
      1011,
      933,
      922,
      931,
      939,
      941,
      942,
      945,
      942,
      938,
      941,
      941,
      941,
      939,
      942,
      942,
      941,
      940,
      945,
      947,
      944,
      944,
      944,
      944,
      944,
      943,
      945,
      943,
      945,
      943,
      941,
      943,
      945,
      943,
      942,
      941,
      942,
      943,
      942,
      944,
      945,
      943,
      944,
      946,
      945,
      946,
      941,
      942,
      944,
      943,
      940,
      942,
      944,
      943,
      939,
      940,
      942,
      943,
      940,
      939,
      942,
      942,
      941,
      939,
      940,
      942,
      941,
      938,
      940,
      943,
      941,
      942,
      948,
      952,
      954,
      954,
      957,
      962,
      961,
      961,
      963,
      964,
      966,
      965,
      966,
      967,
      969,
      968,
      966,
      967,
      969,
      966,
      963,
      966,
      967,
      965,
      962,
      965,
      966,
      966,
      962,
      964,
      964,
      964,
      962,
      960,
      963,
      963,
      959,
      957,
      962,
      960,
      959,
      956,
      960,
      959,
      957,
      953,
      958,
      961,
      957,
      956,
      955,
      958,
      956,
      953,
      955,
      957,
      956,
      956,
      957,
      958,
      959,
      957,
      956,
      960,
      961,
      957,
      958,
      959,
      961,
      960,
      955,
      959,
      962,
      960,
      956,
      959,
      962,
      962,
      964,
      968,
      974,
      974,
      973,
      975,
      979,
      978,
      981,
      979,
      978,
      978,
      975,
      974,
      977,
      975,
      978,
      981,
      982,
      975,
      971,
      966,
      964,
      963,
      960,
      955,
      954,
      957,
      957,
      955,
      954,
      956,
      956,
      953,
      952,
      955,
      957,
      957,
      953,
      955,
      951,
      938,
      927,
      921,
      915,
      933,
      970,
      1024,
      1096,
      1169,
      1205,
      1178,
      1071,
      962,
      929,
      940,
      952,
      952,
      948,
      948,
      950,
      950,
      947,
      946,
      948,
      947,
      947,
      943,
      945,
      947,
      947,
      942,
      945,
      947,
      947,
      946,
      945,
      949,
      948,
      946,
      947,
      948,
      948,
      945,
      946,
      949,
      950,
      947,
      946,
      947,
      950,
      950,
      949,
      950,
      953,
      950,
      949,
      949,
      950,
      950,
      947,
      948,
      948,
      950,
      949,
      947,
      948,
      949,
      949,
      948,
      948,
      948,
      946,
      946,
      947,
      949,
      948,
      947,
      948,
      951,
      950,
      947,
      954,
      958,
      959,
      959,
      959,
      961,
      961,
      964,
      967,
      970,
      972,
      969,
      969,
      973,
      972,
      968,
      967,
      968,
      970,
      970,
      967,
      969,
      970,
      970,
      966,
      967,
      969,
      970,
      966,
      968,
      970,
      969,
      966,
      965,
      966,
      964,
      966,
      964,
      966,
      965,
      962,
      960,
      961,
      964,
      962,
      958,
      962,
      961,
      962,
      959,
      963,
      964,
      963,
      960,
      961,
      962,
      963,
      959,
      960,
      962,
      961,
      960,
      961,
      963,
      966,
      966,
      963,
      964,
      964,
      961,
      961,
      964,
      964,
      963,
      962,
      968,
      975,
      974,
      975,
      979,
      980,
      982,
      984,
      985,
      988,
      988,
      983,
      982,
      982,
      982,
      981,
      980,
      987,
      989,
      980,
      973,
      971,
      969,
      966,
      964,
      962,
      964,
      965,
      962,
      962,
      963,
      964,
      962,
      959,
      960,
      960,
      959,
      957,
      959,
      961,
      955,
      948,
      940,
      934,
      925,
      919,
      940,
      977,
      1023,
      1093,
      1166,
      1195,
      1160,
      1064,
      967,
      935,
      941,
      949,
      953,
      954,
      954,
      954,
      954,
      956,
      956,
      957,
      954,
      956,
      957,
      955,
      951,
      951,
      954,
      953,
      952,
      954,
      954,
      953,
      953,
      957,
      958,
      956,
      954,
      955,
      956,
      954,
      953,
      952,
      954,
      953,
      951,
      950,
      953,
      955,
      955,
      956,
      958,
      957,
      955,
      954,
      953,
      952,
      954,
      951,
      955,
      957,
      954,
      954,
      954,
      956,
      955,
      951,
      947,
      953,
      952,
      950,
      948,
      950,
      954,
      952,
      951,
      954,
      958,
      958,
      957,
      961,
      966,
      966,
      965,
      968,
      971,
      972,
      970,
      973,
      974,
      975,
      973,
      972,
      973,
      975,
      973,
      969,
      971,
      970,
      968,
      966,
      969,
      970,
      969,
      966,
      968,
      969,
      966,
      967,
      968,
      968,
      968,
      964,
      964,
      964,
      962,
      960,
      962,
      964,
      962,
      960,
      960,
      960,
      962,
      961,
      959,
      962,
      961,
      961,
      959,
      959,
      962,
      963,
      962,
      964,
      961,
      963,
      961,
      962,
      964,
      964,
      961,
      959,
      963,
      964,
      961,
      959,
      965,
      969,
      972,
      971,
      973,
      978,
      980,
      977,
      981,
      983,
      982,
      979,
      976,
      979,
      977,
      973,
      972,
      977,
      981,
      974,
      969,
      969,
      964,
      959,
      956,
      958,
      961,
      961,
      958,
      959,
      959,
      956,
      954,
      954,
      955,
      953,
      952,
      954,
      954,
      955,
      953,
      948,
      942,
      937,
      928,
      918,
      927,
      958,
      999,
      1061,
      1137,
      1183,
      1175,
      1097,
      998,
      941,
      930,
      936,
      946,
      950,
      949,
      947,
      944,
      947,
      947,
      947,
      950,
      951,
      949,
      948,
      949,
      950,
      950,
      947,
      946,
      947,
      947,
      946,
      944,
      945
   ];

}