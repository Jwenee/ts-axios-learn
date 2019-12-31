import { getAjaxRequest } from './helper'
import axios from '../src/index'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () =>{
    const progressSpy = jest.fn()

    axios('/foo', { onDownLoadProgress: progressSpy })

    return getAjaxRequest().then((request) => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })

  test('should add a upload progress handler', () => {
    const progressSpy = jest.fn()

    axios('/foo', { onUpLoadProgress: progressSpy })

    return getAjaxRequest().then((request) => {

      // expect(progressSpy).toHaveBeenCalled()
    })
  })
})
