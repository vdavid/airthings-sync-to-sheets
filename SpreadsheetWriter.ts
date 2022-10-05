import AirthingsReading = Airthings.AirthingsReading
import Sheet = GoogleAppsScript.Spreadsheet.Sheet

namespace SpreadsheetWriter {
    export function addDataToSpreadsheet(data: AirthingsReading): void {
        SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/15ccFkUaWRUZtLk0C0dT8EN9qYWf_1aah0WoD4ii5rpQ/')
        const sheet = SpreadsheetApp.getActive().getSheetByName('Readings')
        const row = getFirstEmptyRowIndex(sheet)
        const range = sheet.getRange(`R${row}C1:R${row}C12`)
        range.setValues([convertReadingToRow(data)])
    }

// Note: Returns a 1-based index
    function getFirstEmptyRowIndex(sheet: Sheet): number {
        return sheet.getRange('A:A').getValues().findIndex(value => value[0] === '') + 1
    }

    function convertReadingToRow(data: AirthingsReading): (string | number)[] {
        const date = new Date(data.time * 1000)
        return [
            getISODateString(date), // Date
            getISOTimeString(date), // Time
            data.battery, // Battery
            data.co2, // CO2
            data.humidity, // Humidity
            data.pm1, // PM1
            data.pm25, // 2.5
            data.pressure, // Pressure
            data.radonShortTermAvg, // Radon (short-term avg)
            data.temp, // Temperature
            data.voc, // VOC
            data.relayDeviceType, // E.g. "hub"
        ]
    }

    function getISODateString(date) {
        return (date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2))
    }

    function getISOTimeString(date) {
        return (date.getHours() + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + ('0' + (date.getSeconds())).slice(-2))
    }
}
