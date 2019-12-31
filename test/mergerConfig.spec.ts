import axios from '../src/index'
import mergerConfig from '../src/core/mergeConfig'

describe('mergeConfig', () => {
  const defaults = axios.defaults

  test('should accept undefined for second argument', () => {
    expect(mergerConfig(defaults, undefined)).toEqual(defaults)
  })

  test('should accept an object for second argument', () => {
    expect(mergerConfig(defaults, {})).toEqual(defaults)
  })

  test('should not leave references', () => {
    const merged = mergerConfig(defaults, {})
    expect(merged).not.toBe(defaults)
    expect(merged.headers).not.toBe(defaults.headers)
  })

  test('should allow setting request options', () => {
    const config = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }

    const merged = mergerConfig(defaults, config)
    expect(merged.url).toBe(config.url)
    expect(merged.params).toBe(config.params)
    expect(merged.data).toEqual(config.data)
  })

  test('should not inherit request options', () => {
    const localDefaults = {
      url: '__sample url__',
      params: '__sample params__',
      data: { foo: true }
    }
    const merged = mergerConfig(localDefaults, {})
    expect(merged.url).toBeUndefined()
    expect(merged.params).toBeUndefined()
    expect(merged.data).toBeUndefined()
  })

  test('should return default headers if pass config2 with undefined', () => {
    expect(mergerConfig({ headers: 'x-mock-header' }, undefined)).toEqual({ headers: 'x-mock-header' })
  })

  test('should merge auth, headers with defaults', () => {
    expect(mergerConfig({ auth: undefined }, { auth: { username: 'foo', password: 'test' } }))
      .toEqual({ auth: { username: 'foo', password: 'test' }})

    expect(mergerConfig({ auth: { username: 'foo', password: 'test' } }, { auth: { username: 'baz', password: 'foobar' } }))
      .toEqual({ auth: { username: 'baz', password: 'foobar' }})
  })

  test('should overwrite auth, headers with a non-object value', () => {
    expect(
      mergerConfig(
        { headers: { common: { Accept: 'application/json, text/plain, */*' } } },
        { headers: null }
      )
    ).toEqual({ headers: null })
  })

  test('should allow setting other options', () => {
    const merged = mergerConfig(defaults, { timeout: 123 })
    expect(merged.timeout).toBe(123)
  })
})
