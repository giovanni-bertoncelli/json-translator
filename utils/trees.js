async function countLeaves (object) {
  let result = 0
  await forInNested(object, () => {
    result++
  })
  return result
}

function forInNested (object, handler) {
  return forInNestedRec(object, handler)
}

async function forInNestedRec (step, handler, treePath = []) {
  for (const key in step) {
    if (step[key] !== null && typeof (step[key]) === 'object') {
      // going one step down in the object tree!!
      await forInNestedRec(step[key], handler, [...treePath, key])
    } else {
      const returnedVal = handler(step[key], key, [...treePath, key])
      if (returnedVal && returnedVal.then) {
        await returnedVal
      }
    }
  }
}

function getNested (target, treePath) {
  return getNestedRec(target, treePath)
}

function getNestedRec (target, treePath) {
  if (!target[treePath[0]]) {
    return undefined
  }

  if (treePath.length === 1) {
    return target[treePath[0]]
  }

  return getNestedRec(target[treePath[0]], treePath.slice(1))
}

function setNested (target, value, treePath) {
  setNestedRec(target, value, treePath)
}

function setNestedRec (target, value, treePath) {
  if (!target[treePath[0]]) {
    target[treePath[0]] = {}
  }

  if (treePath.length === 1) {
    target[treePath[0]] = value
    return
  }
  setNestedRec(target[treePath[0]], value, treePath.slice(1))
}

module.exports = {
  forInNested,
  setNested,
  countLeaves,
  getNested
}
