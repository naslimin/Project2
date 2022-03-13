import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
const initialState = {
  labels: moment.months(),
  datasets: [
    {
      label: 'ลากิจส่วนตัว',
      backgroundColor: '#A21A1A',
      borderColor: '#A21A1A',
      borderWidth: 0,
      maxBarThickness: 10,
      data: Array(12).fill(0)
    },
    {
      label: 'ลาป่วย',
      backgroundColor: '#999595',
      borderColor: '#999595',
      borderWidth: 0,
      maxBarThickness: 10,
      data: Array(12).fill(0)
    },
    {
      label: 'ลาคลอดบุตร',
      backgroundColor: '#dbab00',
      borderColor: '#dbab00',
      borderWidth: 0,
      maxBarThickness: 10,
      data: Array(12).fill(0)
    }
  ],
};


const options = {
  responsive: true,
  legend: {
    align: 'end',
    title: {
      display: true,
      text: 'Legend Title',
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false
      }
    }],
    yAxes: [{
      gridLines: {
        drawOnChartArea: false
      }
    }]
  }
}



class Graph extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.data) {
      this.props.data.forEach(element => {
        Object.entries(element).forEach(e=>{
          var month = e[0]
          Object.entries(e[1]).forEach(ee=>{
            initialState.datasets[initialState.datasets.findIndex(f=>f.label == ee[0])].data[month] = ee[1]
          })
        })
      });

      this.setState(initialState)
    }
  }

  render() {
    return (
      <Bar data={this.state} options={options} />
    );
  }
}


export default ({ data }) => <Graph data={data} />;