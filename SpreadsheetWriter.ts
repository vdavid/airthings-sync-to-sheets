import AirthingsReading = AirthingsApi.AirthingsReading
import Sheet = GoogleAppsScript.Spreadsheet.Sheet

namespace SpreadsheetWriter {
    export function addDataToSpreadsheet(data: AirthingsReading, waqiPm25: number): void {
        SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/15ccFkUaWRUZtLk0C0dT8EN9qYWf_1aah0WoD4ii5rpQ/')
        const sheet = SpreadsheetApp.getActive().getSheetByName('Readings')
        const row = getFirstEmptyRowIndex(sheet)
        const range = sheet.getRange(`R${row}C1:R${row}C13`)
        range.setValues([convertReadingToRow(data, waqiPm25)])
    }

// Note: Returns a 1-based index
    function getFirstEmptyRowIndex(sheet: Sheet): number {
        return sheet.getRange('A:A').getValues().findIndex(value => value[0] === '') + 1
    }

    function convertReadingToRow(data: AirthingsReading, waqiPm25: number): (string | number)[] {
        const date = new Date(data.time * 1000)
        return [
            getISODateString(date), // Date
            getISOTimeString(date), // Time
            data.battery, // Battery
            data.co2, // CO2
            data.humidity, // Humidity
            data.pm1, // PM1
            data.pm25, // 2.5
            waqiPm25, // Outdoors PM2.5 from WAQI
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
