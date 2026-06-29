import { AirthingsApi } from './AirthingsApi'
import { WaqiApi } from './WaqiApi'
import { SpreadsheetWriter } from './SpreadsheetWriter'

const clientId = PropertiesService.getScriptProperties().getProperty('airthingsClientId')
const secret = PropertiesService.getScriptProperties().getProperty('airthingsSecret')
// Get the serial number from the Airthings dashboard: https://dashboard.airthings.com/devices
const viewPlusSerialNumber = PropertiesService.getScriptProperties().getProperty('airthingsViewPlusSerialNumber')
const plusSerialNumber = PropertiesService.getScriptProperties().getProperty('airthingsPlusSerialNumber')
const waqiToken = PropertiesService.getScriptProperties().getProperty('waqiToken')
const waqiLocation = PropertiesService.getScriptProperties().getProperty('waqiLocation')

const knownDevices: AirthingsApi.Device[] = [{
    'name': 'View Plus',
    'serialNumber': viewPlusSerialNumber,
}, {
    'name': 'Plus',
    'serialNumber': plusSerialNumber,
}]

function fetchReading() {
    Logger.log('1: Fetching readings...')
    const token = AirthingsApi.authenticate(clientId, secret)
    Logger.log('2: Authenticated, fetching data...')
    const readings = knownDevices.map(device => AirthingsApi.getLatestSamples(token, device))
    Logger.log('3: Got readings, writing to spreadsheet...')
    const waqiPm25 = WaqiApi.getPm25(waqiToken, waqiLocation)
    Logger.log('4: Got PM2.5 from WAQI, writing to spreadsheet...')
    SpreadsheetWriter.addDataToSpreadsheet(readings, waqiPm25)
    Logger.log('5: Done!')
}

// GAS only sees top-level function declarations. esbuild bundles everything into an IIFE, so we expose the
// entry point on `global` (set to the GAS global scope by esbuild-gas-plugin's banner); the plugin emits a
// matching top-level stub so the function shows up in the Apps Script UI and triggers.
declare const global: Record<string, unknown>
global.fetchReading = fetchReading

