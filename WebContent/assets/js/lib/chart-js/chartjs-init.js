( function ( $ ) {
    "use strict";
   
    //Temperature
    var ctx1 = document.getElementById( "team-chart" );
    ctx1.height = 150;
    var humiditydps=[];
    var tempdps=[];
    var myChart = new CanvasJS.Chart( ctx1, {
        type: 'line',
        data: {
            //labels: [ "2010", "2011", "2012", "2013", "2014", "2015", "2016" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data:tempdps,
                //label: "Expense",
                backgroundColor: 'rgba(0,103,255,.15)',
                borderColor: 'rgba(0,103,255,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,103,255,0.5)',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Time'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
    } );

    //humidity
   var ctx2 = document.getElementById( "sales-chart" );
    ctx2.height = 150;
    var myChart = new CanvasJS.Chart( ctx2, {
        type: 'line',
        data: {
           // labels: [ "2010", "2011", "2012", "2013", "2014", "2015", "2016" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: humiditydps,
                //label: "Expense",
                backgroundColor: 'rgba(0,103,255,.15)',
                borderColor: 'rgba(0,103,255,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,103,255,0.5)',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
    } );
    
    var xVal = 0;
	var yVal = 0;
	var val;
	var updateValueInterval = 1000;
	var dataLength = 20; // number of dataPoints visible at any point

	var updateValueChart = function (count) {
		while (humiditydps.length > dataLength) {
			humiditydps.shift();
			
		}
		while (tempdps.length > dataLength) {
			tempdps.shift();
			
		}
		ctx1.render();
		ctx2.render();
	};
	var updateValue=function(){
		var dbref = firebase.database().ref().child('HUMIDITY');
		dbref.on('value',function(snap){
			val=snap.val();
			for (var j in val) {
				yVal = val[j];
				//console.log(j);
				xVal=new Date(parseFloat(j));
				
				//console.log(yVal);
				console.log(xVal);
				humiditydps.push({
					x: xVal,
					y: yVal
				});
				
			}
		});
		var dbref = firebase.database().ref().child('TEMPERATURE');
		dbref.on('value',function(snap){
			val=snap.val();
			for (var j in val) {
				yVal = val[j];//yval=val[j].('humidity')
				xVal=new Date(parseFloat(j));
				if(yVal>50){
					window.alert("going to blast");
				}
				//console.log(yVal);
				//console.log(xVal);
				tempdps.push({
					x: xVal,
					y: yVal
				});
				
			}
		});
	};

updateValue();
	updateValueChart(dataLength);
	setInterval(function(){updateValueChart()}, updateValueInterval);
}

 )( jQuery );