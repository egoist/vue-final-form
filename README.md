
# vue-finalform

[![NPM version](https://img.shields.io/npm/v/vue-finalform.svg?style=flat)](https://npmjs.com/package/vue-finalform) [![NPM downloads](https://img.shields.io/npm/dm/vue-finalform.svg?style=flat)](https://npmjs.com/package/vue-finalform) [![CircleCI](https://circleci.com/gh/egoist/vue-finalform/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-finalform/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

## Install

```bash
yarn add final-form vue-finalform
```

## Usage

This library exports two components:

```js
import { FinalForm, FinalField } from 'vue-finalform'
```

The first component you'll need is the `FinalForm` component:

```vue
<FinalForm :submit="submit">
  <!-- ignore the children for now -->
</FinalForm>
```

The only required prop is `submit`, it defines how to submit the form data, maybe simply log the form state:

```js
function submit(state) {
  console.log(state)
}
```

The rendered output is:

```html
<div></div>
```

As you can see it does nothing for now, you need to feed it a `<form>`:

```vue
<FinalForm :submit="submit">
  <form slot-scope="props" @submit="props.handleSubmit">
    <!-- ignore the children for now -->
  </form>
</FinalForm>
```

Now it renders:

```html
<div><form></form></div>
```

Here it uses the [`scoped slots`](https://vuejs.org/v2/guide/components.html#Scoped-Slots) feature from Vue.js (>=2.1.0), `props.handleSubmit` is the actual method  it will run to submit data.

Next let's define a form field with `<FinalField>` component:

```vue
<FinalForm :submit="submit">
  <form slot-scope="props" @submit="props.handleSubmit">
    <FinalField 
      name="username" 
      :validate="v => v ? null : 'this is required'">
      <div slot-scope="props">
        <input v-on="props.events" :name="props.name">
        <span v-if="props.meta.error && props.meta.touched">
          {{ props.meta.error }}
        </span>
      </div>
    </FinalField>
  </form>
</FinalForm>
```

Things got a bit more complex, but it's easy if you try to understand:

The only prop that is required by `FinalField` is `name`, it tells the field where to store the field data in the form state, here we stores it as `state.username`.

The `validate` prop is used to validate the field data, it could be a function that returns an error message or `null`, `undefined` when it's considered valid.

The data that `FinalField` passed to its children contains `props.events` which is required to be bound with the `input` element in order to properly track events. And `props.name` is  the `name` you gave `FinalField`, `props.meta` is some infomation about this field.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-finalform** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/vue-finalform/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
