import './App.css';
import { useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import moment from 'moment';
import Popup from 'react-popup';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
function App() {
  var [dataPoints, setDataPoints] = useState([]);
  var [prodData, setProdData] = useState([]);
  var [product, setProduct] = useState('Product')
  var [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  var [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const containerProps = {
    height : "45vh"
  }
  const selectProduct = (id) => {
    setProduct('Product '+id);
    setDataPoints(prodData[id]);
  }

  const generateProdData = () => {
    if(startDate === '' || endDate === ''){
      Popup.alert('Start Date or End Date is missing');
      return;      
    }
    if(moment(startDate).isAfter(moment(endDate))){
      Popup.alert('End Date should be greater than Start Date');
      return;
    };
    var prodData = [[]];
    for(var n = 1; n<=2; n++) {
      var points = [];
      console.log(n);
      for (var i = moment(startDate); !i.isAfter(moment(endDate)); i.add(1,'days')) {
        console.log(i.format('YYYY-MM-DD'))
        if(i.isAfter(moment())){
          points.push({
            x: i.toDate(),
            y: Math.random() * 100,
            toolTipContent: "<span style='\"'color: #6d78ad;'\"'>{x}</span>:  {y} <span style='\"'color: red;'\"'>±5%</span>",
            color: "rgb(190, 76, 76)"
          })
        }
        else points.push({
          x: i.toDate(),
          y: Math.random() * 100
        });
      }
      prodData.push(points);
    }
    setProdData(prodData);
    setProduct('Product '+1);
    setDataPoints(prodData[1]);
  }

  const options = {
    theme: "dark2",
    title: {
      text: product+" Value"
    },
    axisY: {
      title: "Value in Rupees",
      prefix: "₹"
    },
    axisX : {
      title: "Date",
      valueFormatString : "YYYY-MM-DD"
    },
    data: [{
      type: "line",
      yValueFormatString: "₹#,##0.00",
      dataPoints: dataPoints
    }]
  }
  return (
    <div className="container">
    <Popup></Popup>
      <div className="dateSection">
        <div className="date">
          <label> Start Date </label>
          <input type='date' value={startDate} onChange= {(date) => setStartDate(date.target.value)}></input>
        </div>
        <div className="date">
          <label> End Date </label>
          <input type='date' value={endDate} onChange= {(date) => {setEndDate(date.target.value);console.log(date.target.value)}}></input>
        </div>
        <div>
          <button className="button" onClick={generateProdData}>Submit</button>
        </div>
      </div>
      <div className='dataSection'>
        <div className='data'>
          <CanvasJSChart containerProps={containerProps} options = {options}/>
        </div>
        <div className='data'>
          <div className="productTable">
            <table>
              <tr className="productsHead">
                <th>Select Product</th>
              </tr>
              <tr className="products" onClick={() => selectProduct(1)}>
                <th>Product 1</th>
              </tr>
              <tr className="products" onClick={() => selectProduct(2)}>
                <th>Product 2</th>
              </tr>
              <tr>
                <button className="button" onClick={generateProdData}>Randomize</button>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
