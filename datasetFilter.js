import { parse, transform, stringify } from 'csv'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'

pipeline(
    createReadStream(`./journey-data/2021-06.csv`),
    parse(),
    transform((data) => (data[6] > 9 && data[7] > 9 ? data : null)),
    stringify({}),
    createWriteStream(`./2021-06_filtered.csv`),
    (err) =>
        err
            ? console.error('Pipeline failed.', err)
            : console.log('Pipeline succeeded.')
)
