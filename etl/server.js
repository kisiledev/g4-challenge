const fs = require('fs')
const parse = require('csv-parse')

var csvData = [];

const transformDataOne = (data) => {
    const [SignUpDate,First,Last,Email,Latitude,Longitude,IP] = data;
    let newData = {
        SignUpDate,
        First,
        Last,
        Email,
        Latitude,
        Longitude,
        IP
    }
    return newData;
}
const transformDataTwo = (data) => {
    const [createDatetime,ipAddress,geoLat,geoLong,firstName,lastName,emailAddress] = data;
    let newData = {
        SignUpDate: createDatetime,
        First: firstName,
        Last: lastName,
        Email: emailAddress,
        Latitude: geoLat,
        Longitude: geoLong,
        IP: ipAddress
    }
    return newData;
}

const getAllData = () => {
    fs.createReadStream('./data1.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', (csvrow) => {
        csvData.push(transformDataOne(csvrow))
    })
    .on('end', () => {
        console.log(`Added ${csvData.length} records`)
        csvData.shift()
        fs.writeFile('final-data.json', JSON.stringify(csvData, null, 2), (err) => {
            if (err) throw err;
        })
    })
    fs.createReadStream('./data2.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', (csvrow) => {
        csvData.push(transformDataTwo(csvrow))
    })
    .on('end', () => {
        console.log(`Added ${csvData.length} records`)
        csvData.shift()
        fs.readFile('final-data.json', (err, data) => {
            let json = JSON.parse(data);
            json.concat(csvData)
            fs.writeFile('final-data.json', JSON.stringify(json, null, 2),(err) => {
                if (err) throw err;
            })
        })

    })

}

getAllData()