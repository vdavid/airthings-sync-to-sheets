import AirthingsReading = AirthingsApi.AirthingsReading
import Sheet = GoogleAppsScript.Spreadsheet.Sheet

namespace SpreadsheetWriter {
    export function addDataToSpreadsheet(reading: AirthingsReading, waqiPm25: number): void {
        SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/15ccFkUaWRUZtLk0C0dT8EN9qYWf_1aah0WoD4ii5rpQ/')
        const sheet = SpreadsheetApp.getActive().getSheetByName('Readings')
        let row = getFirstEmptyRowIndex(sheet, 32000)
        if (row === 0) {
            insert100Rows(sheet)
            row = getFirstEmptyRowIndex(sheet, 32000)
        }
        const range = sheet.getRange(`R${row}C1:R${row}C13`)
        range.setValues([convertReadingToRow(reading, waqiPm25)])
    }

    function insert100Rows(sheet: Sheet): void {
        sheet.insertRowsAfter(sheet.getMaxRows(), 100)
    }

    // Note: Returns a 1-based index
    // Note: sheet.getLastRow() might be a built-in alternative, but this works, plus it supports startAt which I need
    //       because over 32000 rows, execution just failed.
    function getFirstEmptyRowIndex(sheet: Sheet, startAt: number = 1): number {
        return sheet.getRange('A' + startAt + ':A').getValues().findIndex(value => value[0] === '') + startAt
    }

    function convertReadingToRow(reading: AirthingsReading, waqiPm25: number): (string | number)[] {
        const date = new Date(reading.time * 1000)
        return [
            getISODateString(date), // Date
            getISOTimeString(date), // Time
            reading.battery, // Battery
            reading.co2, // CO2
            reading.humidity, // Humidity
            reading.pm1, // PM1
            reading.pm25, // 2.5
            waqiPm25, // Outdoors PM2.5 from WAQI
            reading.pressure, // Pressure
            reading.radonShortTermAvg, // Radon (short-term avg)
            reading.temp, // Temperature
            reading.voc, // VOC
            reading.device.name, // E.g. "View Plus"
        ]
    }

    function getISODateString(date: Date) {
        return (date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2))
    }

    function getISOTimeString(date: Date) {
        return (date.getHours() + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + ('0' + (date.getSeconds())).slice(-2))
    }
}
