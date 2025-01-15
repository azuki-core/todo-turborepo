// graphql-iso-dateのserializeがいまいちだったので、微修正したバージョン

import { Kind } from 'graphql'
import { scalarType } from 'nexus'

import { parseDateTime, serializeDateTime, serializeDateTimeString, serializeUnixTimestamp } from './dateFormatter'
import { validateDateTime, validateJSDate, validateUnixTimestamp } from './dateValidator'

// TODO
export const DateTimeScalar = scalarType({
  name: 'DateTime',
  description:
    'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
    'compliant with the `date-time` format outlined in section 5.6 of ' +
    'the RFC 3339 profile of the ISO 8601 standard for representation ' +
    'of dates and times using the Gregorian calendar.',
  asNexusMethod: 'datetime',
  sourceType: 'Date',

  serialize(value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDateTime(value)
      }
      throw new TypeError('DateTime cannot represent an invalid Date instance')
    } else if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return serializeDateTimeString(value)
      }
      throw new TypeError(`DateTime cannot represent an invalid date-time-string ${value}.`)
    } else if (typeof value === 'number') {
      if (validateUnixTimestamp(value)) {
        return serializeUnixTimestamp(value)
      }
      throw new TypeError(`DateTime cannot represent an invalid Unix timestamp ${value}`)
    } else {
      throw new TypeError(
        `DateTime cannot be serialized from a non string non numeric or non Date type ${JSON.stringify(value)}`,
      )
    }
  },
  parseValue(value) {
    if (!(typeof value === 'string')) {
      throw new TypeError(`DateTime cannot represent non string type ${JSON.stringify(value)}`)
    }

    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new TypeError(`DateTime cannot represent an invalid date-time-string ${value}.`)
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        // `DateTime cannot represent non string type ${String(ast.value != null ? ast.value : null)}`
        `DateTime cannot represent non string type`,
      )
    }
    const { value } = ast
    if (validateDateTime(value)) {
      return parseDateTime(value)
    }
    throw new TypeError(`DateTime cannot represent an invalid date-time-string ${String(value)}.`)
  },
})
