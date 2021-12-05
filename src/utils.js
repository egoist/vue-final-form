export const getChildren = children =>
  Array.isArray(children) ? children : [children]

const composeValidators = (validators, ...args) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  validators.reduce((error, validator) => error || validator(...args), undefined)

export const composeFormValidators = validators => (...args) =>
  composeValidators(validators, ...args)

export const composeFieldValidators = validators => () => (...args) =>
  composeValidators(validators, ...args)

export const makeSubscriptionObject = subscriptionItems =>
  // eslint-disable-next-line no-use-extend-native/no-use-extend-native
  Object.fromEntries(subscriptionItems.map(key => [key, true]))
