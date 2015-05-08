/* mightygumball.js */
/*
 * get the content of a JSON file using JSONP
 * update every 3 seconds.
 *
 */
var lastReportTime = 0;

window.onload = init;
//how often the data is retrieved
function init() {
    var interval = setInterval(handleRefresh, 3000);
    handleRefresh();
}

//gets the data

function handleRefresh() {
    console.log("here");
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime();
    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");
    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

//outputs the data in HTML
function updateSales(sales) {
    //var salesDiv = document.getElementById("sales");
    //loop for outputting data
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    //draw circle properties
    function makeCircle(x, y, r) {
        //function makeCircle(d) {
        ctx.beginPath();
        ctx.arc(x, y, (r * 5), 0, 2 * Math.PI);
        //ctx.arc((d * 10), (d * 5), 50, 0, 2 * Math.PI);
        ctx.fillstyle = c;
        ctx.stroke();
        ctx.fill();
    }



    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i]; //sales array

        var dataFromJson = sale.sales;
        var dataOutput = document.getElementById("data");
        dataOutput.innerHTML = dataFromJson;

        function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            } //new number each loop

        var xPos = getRandomArbitrary(10, 200);
        var yPos = getRandomArbitrary(20, 170);


        makeCircle(xPos, yPos, dataFromJson); //feed in the interger

        //var div = document.createElement("div");
        //div.setAttribute("class", "saleItem");
        //div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);

        //order the output divs
        if (salesDiv.childElementCount == 0) {
            salesDiv.appendChild(div);
        } else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
        }
    }

    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}
