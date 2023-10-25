import React from 'react'
import Input from './Input';
import Dropdown from './Dropdown';
import Data from './export29913.csv'
import Papa from 'papaparse'
import Table from './Table';

class Form extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
            startTime: '',
            endTime: '',
            totalHoursWorked: undefined,
            ratePerHour: undefined,
            supplierName: '',
            purchaseOrder: '',
            CsvData: [],
            supplierData: [],
            POData:[],
            FinalData: []
          }
    }

    componentDidMount(){
      const fetchData = async() =>{
        const response = await fetch(Data);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8")
        const csvData = decoder.decode(result.value);
        const parsedData = Papa.parse(csvData,{
          header: true,
          skipEmptyLines: true,
        }).data;
        if(parsedData.length > 0){
          const data1 = []
          parsedData.map(parsed =>{
            const newObj = { ...parsed, "PO_Number": parsed["PO Number"] };
            delete newObj["PO Number"];
            data1.push(newObj)
            return data1
          })
        this.setState({CsvData: data1})
        }

      const {CsvData} = this.state
      const PO =[]
      if(CsvData.length > 0){
        CsvData.map(po=>{  
          if(po.Supplier !== '' && po.Supplier !== undefined && po.Supplier !== null){
            PO.push(po.Supplier )
          }
          return PO
        })
      }
      if(PO.length > 0){
        this.setState({supplierData: PO})
      }
      }
      fetchData()
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        const {purchaseOrder, CsvData} = this.state
        CsvData.map(Supplier=>{
          if(purchaseOrder !== '' && purchaseOrder !==undefined && purchaseOrder !== null){
            if(Supplier.Description === purchaseOrder ) {
              const data = [...this.state.FinalData, Supplier];
              this.setState({FinalData: data})
            }
          }
        })
        this.setState({
          name: '',
          startTime: '',
          endTime: '',
          totalHoursWorked: undefined,
          ratePerHour: undefined,
          supplierName: '',
          purchaseOrder: '',
        })
      };

    render() {
      const {CsvData, supplierName, FinalData} = this.state
      let po_num 
      let po_desc = []
      if (supplierName !== '' && supplierName!== undefined && supplierName !== null){
        CsvData.map(Supplier=>{
          if(Supplier.Supplier === supplierName){
            po_num = Supplier.PO_Number
          }
          if(po_num !== '' && po_num !==undefined && po_num !== null){
            if(Supplier.PO_Number === po_num ) {
              po_desc.push(Supplier.Description)
            }
          }
        })
      }

      return (
        <div style={{marginTop: '1rem'}}>
          <Input label="Name" type="text" name="name" value={this.state.name}  onChange={this.handleChange}  />

          <Input  label="Start Time" type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/>

          <Input label="End Time" type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange}/>

          <Input label="No of Hours Worked" type="number" name="totalHoursWorked" value={this.state.totalHoursWorked} onChange={this.handleChange}/>
            
          <Input label= "Rate per Hour" type="number" name="ratePerHour" value={this.state.ratePerHour} onChange={this.handleChange}/>
      
          <Dropdown label= 'Supplier Name' name="supplierName" value={this.state.supplierName} options={this.state.supplierData} onChange={this.handleChange}/>

          <Dropdown label= 'Purchase Order' name="purchaseOrder" value={this.state.purchaseOrder} options={po_desc} onChange={this.handleChange}/>
        
          <div style={{ display:"flex",width:"30rem",justifyContent:'center', marginTop: '2rem'}}>
            <button style ={{height : '2rem', width : '6rem', fontWeight:'bold'}}onClick={this.handleSubmit}>Submit</button>
          </div>
          <hr />
          <div >
            <h2>Docket Data:</h2>
            <Table data={FinalData} />
          </div>
        </div>

      );
    }
  }
  
  export default Form;
