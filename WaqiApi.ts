// API docs: https://aqicn.org/json-api/doc/

namespace WaqiApi {
    export function getPm25(token: string, location: string): number | null {
        const url = `https://api.waqi.info/feed/${location}/?token=${token}`
        try {
            const response = UrlFetchApp.fetch(url)
            return JSON.parse(response.getContentText()).data.iaqi.pm25.v
        } catch (e) {
            console.log('Waqi error:', e)
            return null
        }
    }
}
