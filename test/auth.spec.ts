import { getAjaxRequest } from './helper'
import axios from '../src/index'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with unsername/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladding',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then((request) => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbmc6b3BlbiBzZXNhbWU=')
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latinl characters', () => {
    return axios('/foo', {
      auth: {
        username: 'AladΘまding',
        password: 'open sesame'
      }
    }).then(() => {
      throw new Error('Should not succeed to make a HTTP Basic auth request with non-latinl chars in credentials')
    }).catch((error) => {
      expect(/character/i.test(error.message)).toBeTruthy()
    })
  })
})
