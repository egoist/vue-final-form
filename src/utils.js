export const getChildren = children => {
  return Array.isArray(children) ? children : [children]
}

export const composeValidators = validators => (...args) =>
  validators.reduce((error, validator) => error || validator(...args), undefined)
