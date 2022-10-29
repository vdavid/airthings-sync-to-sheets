const clientId = PropertiesService.getScriptProperties().getProperty('airthingsClientId')
const secret = PropertiesService.getScriptProperties().getProperty('airthingsSecret')
const serialNumber = PropertiesService.getScriptProperties().getProperty('airthingsDeviceSerialNumber')
const waqiToken = PropertiesService.getScriptProperties().getProperty('waqiToken')
const waqiLocation = PropertiesService.getScriptProperties().getProperty('waqiLocation')

function fetchReading() {
    const token = AirthingsApi.authenticate(clientId, secret)
    const data = AirthingsApi.getLatestSamples(token, serialNumber)
    const waqiPm25 = WaqiApi.getPm25(waqiToken, waqiLocation)
    SpreadsheetWriter.addDataToSpreadsheet(data, waqiPm25)
}

