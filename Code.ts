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

