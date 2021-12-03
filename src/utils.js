export const getChildren = children =>
  Array.isArray(children) ? children : [children]

const composeValidators = (validators, ...args) =>
  validators.reduce((error, validator) => error || validator(...args), undefined)

export const composeFormValidators = validators => (...args) =>
  composeValidators(validators, ...args)

export const composeFieldValidators = validators => () => (...args) =>
  composeValidators(validators, ...args)

export const makeSubscriptionObject = subscriptionItems => subscriptionItems.reduce(
  (result, key) => {
    result[key] = true
    return result
  },
  {},
)
