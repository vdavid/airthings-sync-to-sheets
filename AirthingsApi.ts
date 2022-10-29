// Using a namespace because https://github.com/google/clasp/blob/master/docs/typescript.md#modules-exports-and-imports
namespace AirthingsApi {
    export type AirthingsReading = {
        'battery': number // (100)
        'co2': number // (955.0)
        'humidity': number // (48.0)
        'pm1': number // (7.0)
        'pm25': number // (7.0)
        'pressure': number // (1014.8)
        'radonShortTermAvg': number // (0.0)
        'temp': number // (23.3)
        'time': number // (1664971186)
        'voc': number // (46.0)
        'relayDeviceType': string // ("hub")
    }

    export function authenticate(clientId: string, secret: string): string {
        const response = UrlFetchApp.fetch('https://accounts-api.airthings.com/v1/token', {
            method: 'post',
            payload: {
                'grant_type': 'client_credentials',
                'client_id': clientId,
                'client_secret': secret,
                'scope': 'read:device:current_values'
            },
        })

        if (response.getResponseCode() !== 200) {
            throw new Error(`Failed to authenticate with Airthings API, got: ${response.getResponseCode()} and “${response.getContentText()}”.`)
        }

        return JSON.parse(response.getContentText())['access_token']
    }

    export function getLatestSamples(token: string, serialNumber: string): AirthingsReading {
        let response
        try {
            response = UrlFetchApp.fetch(`https://ext-api.airthings.com/v1/devices/${serialNumber}/latest-samples`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
        } catch (e) {
            throw new Error(`Failed to get response from Airthings API. Error: ${e}`)
        }

        if (response.getResponseCode() !== 200) {
            throw new Error(`Failed to get latest samples from the Airthings API, got: ${response.getResponseCode()} and “${response.getContentText()}”.`)
        }

        return JSON.parse(response.getContentText())['data']
    }
}
