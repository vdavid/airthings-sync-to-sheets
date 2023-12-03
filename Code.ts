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
    const token = AirthingsApi.authenticate(clientId, secret)
    const readings = knownDevices.map(device => AirthingsApi.getLatestSamples(token, device))
    const waqiPm25 = WaqiApi.getPm25(waqiToken, waqiLocation)
    readings.forEach(reading => SpreadsheetWriter.addDataToSpreadsheet(reading, waqiPm25))
}

