const clientId = PropertiesService.getScriptProperties().getProperty('airthingsClientId')
const secret = PropertiesService.getScriptProperties().getProperty('airthingsSecret')
// Get the serial number from the Airthings dashboard: https://dashboard.airthings.com/devices
const viewPlusSerialNumber = PropertiesService.getScriptProperties().getProperty('airthingsViewPlusSerialNumber')
const plusSerialNumber = PropertiesService.getScriptProperties().getProperty('airthingsPlusSerialNumber')
const waqiToken = PropertiesService.getScriptProperties().getProperty('waqiToken')
const waqiLocation = PropertiesService.getScriptProperties().getProperty('waqiLocation')

function fetchReading() {
    const token = AirthingsApi.authenticate(clientId, secret)
    const viewPlusData = AirthingsApi.getLatestSamples(token, viewPlusSerialNumber)
    const plusData = AirthingsApi.getLatestSamples(token, plusSerialNumber)
    const waqiPm25 = WaqiApi.getPm25(waqiToken, waqiLocation)
    SpreadsheetWriter.addDataToSpreadsheet(viewPlusData, waqiPm25)
    SpreadsheetWriter.addDataToSpreadsheet(plusData, waqiPm25)
}

