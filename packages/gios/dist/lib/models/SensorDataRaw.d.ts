/**
 * Format of the data acquired from sensor data resource
 * Sensor type ("key" prop) determines the sensor type
 *
 * @example
 * Sample output
 * {
 *  "key": "PM10",
 *  "values": [
 *  {
 *      "date": "2017-03-28 11:00:00",
 *      "value": 30.3018
 *  },
 *  {
 *      "date": "2017-03-28 12:00:00",
 *      "value": 27.5946
 *  }]
 * }
 */
export declare type SensorDataRaw = {
    key: string;
    values: Array<{
        date: string;
        value: number;
    }>;
};
