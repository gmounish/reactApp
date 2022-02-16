import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import axios from 'axios'
// import * as $ from 'jquery'
import collection from './data/collection.json';
import samsung from './data/samsung.json';
import apple from './data/apple.json';
import Select from 'react-select'

const { createProxyMiddleware } = require("http-proxy-middleware");

function App() {

  createProxyMiddleware({
    target: "https://rdd-qa-east1.ebiz.verizon.com",
    changeOrigin: true,
    headers: {
      Authorization: "Basic ZXBzdXNlcjpFcHN1JEVy",
    },
  })

  const [imei, setimei] = useState('test');
  const [dataLoading, setDataLoading] = useState(true);
  const operators = collection.item;
  const [selectedOperator, setSelectedOperator] = useState('Select Device');
  const [deviceData, setDeviceData] = useState([]);
  const [warrantyData, setwarrantyData] = useState([]);
  const [activationData, setActivationData] = useState([]);
  const [productData, setProductData] = useState([]);

  const renderMobileData = () => {
    // axios.get('data.json').then((res) => {
    //   console.log(res);
    // }).then(() => {
    //   setDataLoading(false);
    // })
    console.log(selectedOperator);
    if (selectedOperator === 'samsung') {
      console.log(samsung);
      const deviceData = samsung.DeviceConfig[0].rawdata
      console.log(deviceData);
      setDeviceData([
        { key: 'Device Model & Description', value: deviceData.MODEL },
        { key: 'Material', value: deviceData.Material },
        { key: 'OEM', value: deviceData.OEM },
        { key: 'Mac Address', value: deviceData.MACAddress },
        { key: 'IMEI', value: deviceData.IMEI },
        { key: 'IMEI SND', value: deviceData.IMEI_SND },
        { key: 'MEIDHex', value: deviceData.MEIDHex },
        { key: 'MEIDDec', value: deviceData.MEIDDec },
        { key: 'CUSTOMERSKU', value: deviceData.CUSTOMERSKU }
      ]);
      setwarrantyData([])
      setActivationData([])
      setProductData([])
    }
    else if (selectedOperator === 'AppleConfigAndActivationDetails') {
      console.log(apple)
      const deviceData = apple.IphoneConfig[0].fetchUnitDetailsResponse.device;
      setDeviceData([
        { key: 'Serial', value: deviceData.identifiers.serial },
        { key: 'IMEI', value: deviceData.identifiers.imei },
        { key: 'MEID', value: deviceData.identifiers.meid },
      ])
      setProductData([
        { key: 'Product Line', value: deviceData.productLine },
        { key: 'Config Code', value: deviceData.configCode },
        { key: 'Config Desicription', value: deviceData.configDescription },
        { key: 'Sold To Name', value: deviceData.soldToName }
      ])
      const warrantyDetails = deviceData.warrantyInfo;
      setwarrantyData([
        { key: "warranty Status Code", value: warrantyDetails.warrantyStatusCode },
        { key: "warranty Status Description", value: warrantyDetails.warrantyStatusDescription },
        { key: "daysRemaining", value: warrantyDetails.daysRemaining },
        { key: "purchase Date", value: warrantyDetails.purchaseDate },
        { key: "Purchase Country Code", value: warrantyDetails.purchaseCountryCode },
        { key: "registration Date", value: warrantyDetails.registrationDate },
        { key: "onsiteCoverage", value: warrantyDetails.onsiteCoverage ? 'true' : 'false' },
        { key: "Labor Covered", value: warrantyDetails.laborCovered ? 'true' : 'false' },
        { key: "limitedWarranty", value: warrantyDetails.limitedWarranty ? 'true' : 'false' },
        { key: "partCovered", value: warrantyDetails.partCovered ? 'true' : 'false' },
        { key: "personalized", value: warrantyDetails.personalized ? 'true' : 'false' },
        { key: "purchaseCountryDesc", value: warrantyDetails.purchaseCountryDesc },
        { key: "registration Date", value: warrantyDetails.registrationDate },
        { key: "deviceCoverageDetails", value: warrantyDetails.deviceCoverageDetails },
        //{ key: "warranty Status Description", value: warrantyDetails.warrantyStatusDescription },
      ])
      const activationDetails = deviceData.activationDetails;
      setActivationData([
        //{ key: 'Product Description', value: data.configDescription },
        //{ key: 'IMEI', value: data.imei },
        { key: 'First Activation Date', value: activationDetails.appliedActivationPolicyID },
        { key: 'last Restore Date', value: activationDetails.lastRestoreDate },
        { key: 'AppliedActivationPolicyID', value: activationDetails.appliedActivationPolicyID },
        // { key: 'bluetoothMacAddress', value: activationDetails.bluetoothMacAddress },
        { key: 'AppliedActivationDetails', value: activationDetails.appliedActivationDetails },
        { key: 'InitialActivationPolicyDetails', value: activationDetails.initialActivationPolicyDetails },
        { key: 'UnlockDate', value: activationDetails.unlockDate },
        //{ key: 'Unbricked', value: activationDetails.unbricked },
        // { key: 'LastUnbrickDate', value: activationDetails.lastUnbrickDate },
        { key: 'LastUnbrickOsBuild', value: activationDetails.lastUnbrickOsBuild },
        { key: 'Carrier Name', value: activationDetails.carrierName },
        { key: 'Lock Status (carrier locked or not)', value: activationDetails.unlocked },
        { key: 'next Tether PolicyIDr', value: activationDetails.nextTetherPolicyID },
        { key: 'next Tether Policy Details', value: activationDetails.nextTetherPolicyDetails },
        { key: 'Mac Address', value: activationDetails.macAddress },
        { key: 'Product Version', value: activationDetails.productVersion },
      ])
    }
    setDataLoading(false);
  }

  return (
    <div className="App d-flex align-items-center flex-column">
      <div className='w-75 pt-5 pb-5'>
        <div className='row d-flex align-items-stretch'>
          <div className='col d-flex align-items-stretch'>
            <input type="text" className='w-100' placeholder='imei' value={imei} onChange={(event) => setimei(event.target.value)} />
          </div>
          <div className='col d-flex align-items-stretch'>
            <Select name="" id="" className='w-100'
              onChange={(event) => { setSelectedOperator(event.name) }}
              options={operators}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
            ></Select>
          </div>
          <div className='col'>
            <button onClick={renderMobileData} className='btn btn-primary w-100'>Submit</button>
          </div>
        </div>
      </div>
      {dataLoading === true ? ('') :
        (<div className='w-75'>
          <div className='row'>
            {deviceData.length > 0 ?
              (<div className='col'><table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Device</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {deviceData.map((item, i) => <tr><td>{item.key}</td><td>{item.value}</td></tr>)}
                </tbody>
              </table></div>
              ) : ("")
            }
            {productData.length > 0 ?
              (<div className='col'><table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((item, i) => <tr><td>{item.key}</td><td>{item.value}</td></tr>)}
                </tbody>
              </table></div>
              ) : ("")}
          </div>
          <div className='row'>
            {warrantyData.length > 0 ?
              (<div className='col'><table className='table table-striped'>
                <thead>
                  <tr>
                    <th>warranty</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {warrantyData.map((item, i) => <tr><td>{item.key}</td><td>{item.value}</td></tr>)}
                </tbody>
              </table></div>
              ) : ("")
            }
            {activationData.length > 0 ?
              (<div className='col'><table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Activation</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activationData.map((item, i) => <tr><td>{item.key}</td><td>{item.value}</td></tr>)}
                </tbody>
              </table></div>
              ) : ("")}
          </div>
        </div>)
      }
    </div>
  )
}
export default App;
