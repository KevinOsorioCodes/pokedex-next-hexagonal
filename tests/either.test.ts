import { Left, Right } from '~/shared/either'

describe('Left', () => {
  it('should create a new instance of Left with a value and correctly assign the value', () => {
    const value = 'test'
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })

  it('should return true when calling isLeft()', () => {
    const left = new Left('test')
    expect(left.isLeft()).toBe(true)
  })

  it('should return false when calling isRight()', () => {
    const left = new Left('test')
    expect(left.isRight()).toBe(false)
  })

  it('should create a new instance of Left with a null value and correctly assign the value', () => {
    const value = null
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })

  it('should create a new instance of Left with an undefined value and correctly assign the value', () => {
    const value = undefined
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })
})

describe('Right', () => {
  it('should set the value property correctly when given a value', () => {
    const value = 'test'
    const right = new Right(value)
    expect(right.value).toBe(value)
  })

  it('should return false when calling isLeft()', () => {
    const right = new Right(null)
    expect(right.isLeft()).toBe(false)
  })

  it('should return true when calling isRight()', () => {
    const right = new Right(null)
    expect(right.isRight()).toBe(true)
  })

  it('should set the value property to null when given a null value', () => {
    const right = new Right(null)
    expect(right.value).toBeNull()
  })

  it('should set the value property to undefined when given an undefined value', () => {
    const right = new Right(undefined)
    expect(right.value).toBeUndefined()
  })

  it('should handle complex objects for the value property', () => {
    const value = { a: 1, b: 'test' }
    const right = new Right(value)
    expect(right.value).toEqual(value)
  })
})
