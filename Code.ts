const clientId = PropertiesService.getScriptProperties().getProperty('airthingsClientId')
const secret = PropertiesService.getScriptProperties().getProperty('airthingsSecret')
const serialNumber = PropertiesService.getScriptProperties().getProperty('airthingsDeviceSerialNumber')

function fetchReading() {
    const token = Airthings.authenticate(clientId, secret)
    const data = Airthings.getLatestSamples(token, serialNumber)
    SpreadsheetWriter.addDataToSpreadsheet(data)
}

