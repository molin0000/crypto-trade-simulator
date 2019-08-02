import React from 'react';
import { Table } from 'antd';
import './App.css';
import $ from 'jquery';

let url = "http://localhost:8000"
let path = "/info"

function makeColumsFromObj(obj) {
  let colums = []
  let names = Object.getOwnPropertyNames(obj)
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    colums.push({
      title: name,
      key: name,
      dataIndex: name,
      // sorter: (a, b) => Number(a.close) - Number(b.close),
    })
  }
  return colums;
}

export default class App extends React.Component {
  state = {
    dataSource: [],
    columns: []
  }

  componentDidMount() {
    console.log('update')
    $.get((url + path), function (result) {
      console.log(result)
      if (!result) { return }

      this.setState({
        dataSource: result.dataSource,
        columns: makeColumsFromObj(result.dataSource[0])
      })
    }.bind(this));
  }



  render() {
    return (<Table
      className='myTable'
      columns={this.state.columns}
      dataSource={this.state.dataSource}
      pagination={{ pageSize: 3000 }}
      scroll={{ y: 800 }}
    // size="small"
    />);
  }
}
