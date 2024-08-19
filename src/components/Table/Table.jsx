import React,{useState} from 'react';
import { Space, Switch, Table } from 'antd';
import Dropdown from './Dropdown/DropDown';
import DropdownComponent from './Dropdown/DropDown';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
    sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      }
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };



  
const TableComponent = () => {
    const [checkStrictly, setCheckStrictly] = useState(false);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
  
    return (
        <>
        
        <div>
            <DropdownComponent></DropdownComponent>
            <DropdownComponent></DropdownComponent>
            </div>
           
        <Space
            align="center"
            style={{
                marginBottom: 16,
            }}
        >

           <div>
           <p>
            Liste des rapports
           </p>
           </div>
          
        </Space><Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    ...rowSelection,
                    checkStrictly,
                }}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 240,
                }} 
                onChange={onChange}
                /></>
    );
 
}
    
export default TableComponent;