
// External modules
import { assert, expect, should }   from 'chai'

// Internal modules
import {filterArrayOrObject} from '../../src/util/attributeUtil'


describe('filterArrayOrObject - non owner', function(){

  const isOwner = false

  it('should only keep allowed attributes in req.body if it is a single object', function(){

    const filters = {
      allowed : ['name', 'email', 'password'],
      private : []
    }

    const body = {
      name           : 'test',
      email          : 'email',
      adminAttribute : 123
    }

    expect(filterArrayOrObject(body, filters, isOwner)).to.eql({
      name           : 'test',
      email          : 'email'
    })

  })


  it('should only keep allowed attributes in req.body if it is an array', function(){

    const filters = {
      allowed : ['name', 'email', 'password'],
      private : ['shouldNotAppear']
    }

    const body = [{
      name           : 'test',
      email          : 'email',
      adminAttribute : 123,
      shouldNotAppear: 123
    },{
      name           : 'test',
      email          : 'email',
      adminAttribute : 123,
      shouldNotAppear: 123
    }]

    expect(filterArrayOrObject(body, filters, isOwner)).to.eql([
      {
        name  : 'test',
        email : 'email'
      },{
        name  : 'test',
        email : 'email'
      }
    ])

  })
})


describe('filterArrayOrObject - owner', function(){

  const isOwner = true

  it('should keep allowed and private attributes in req.body if it is an array', function(){

    const filters = {
      allowed : ['name'],
      private : ['email']
    }

    const body = [{
      name           : 'test',
      email          : 'email',
      adminAttribute : 123
    },{
      name           : 'test',
      email          : 'email',
      adminAttribute : 123
    }]

    expect(filterArrayOrObject(body, filters, isOwner)).to.eql([{
      name           : 'test',
      email          : 'email',
    },{
      name           : 'test',
      email          : 'email',
    }])

  })

  it('should keep allowed and private attributes in req.body if it is a single object', function(){

    const filters = {
      allowed : ['name'],
      private : ['email']
    }

    const body = {
      name           : 'test',
      email          : 'email',
      adminAttribute : 123
    }

    expect(filterArrayOrObject(body, filters, isOwner)).to.eql({
      name           : 'test',
      email          : 'email',
    })

  })
})
