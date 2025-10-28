> [!NOTE]
> As of Tailwind CSS v4.0, container queries are supported in the framework by default and this plugin is no longer required.
> 
> You should only used this if you are using TailwindCSS v3.2+ and need to use max-width container queries.

# @tailwindcss/container-queries-extended

A plugin for Tailwind CSS v3.2+ that provides utilities for container queries, including **max-width container queries**.

This is an extended version of the official [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) plugin with additional features.

## What's New

This extended version adds support for:

- ✅ **Max-width container queries** (`@max-sm`, `@max-md`, `@max-lg`, etc.)
- ✅ **Container query ranges** (e.g., `@sm:@max-lg:flex-col`)
- ✅ **Arbitrary max-width values** (e.g., `@max-[500px]:hidden`)
- ✅ **Named containers with max-width** (e.g., `@max-md/main:flex-col`)


## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-container-queries-extended
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-container-queries-extended'),
    // ...
  ],
}
```

## Usage

Start by marking an element as a container using the `@container` class, and then applying styles based on the size of that container using the container variants like `@md:`, `@lg:`, and `@xl:`:

```html
<div class="@container">
  <div class="@lg:underline">
    <!-- This text will be underlined when the container is larger than `32rem` -->
  </div>
</div>
```

By default we provide [container sizes](#configuration) from `@xs` (`20rem`) to `@7xl` (`80rem`).

### Named containers

You can optionally name containers using a `@container/{name}` class, and then include that name in the container variants using classes like `@lg/{name}:underline`:

```html
<div class="@container/main">
  <!-- ... -->
  <div class="@lg/main:underline">
    <!-- This text will be underlined when the "main" container is larger than `32rem` -->
  </div>
</div>
```

### Max-width container queries

Use variants like `@max-sm` and `@max-md` to apply a style below a specific container size:

```html
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- This will be flex-col when the container is smaller than `28rem` -->
  </div>
</div>
```

### Container query ranges

Stack a regular container query variant with a max-width container query variant to target a specific range:

```html
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- This will be flex-col when the container is between `24rem` and `28rem` -->
  </div>
</div>
```

### Arbitrary container sizes

In addition to using one of the [container sizes](#configuration) provided by default, you can also create one-off sizes using any arbitrary value:

```html
<div class="@container">
  <div class="@[17.5rem]:underline">
    <!-- This text will be underlined when the container is larger than `17.5rem` -->
  </div>
</div>
```

You can also use arbitrary values with max-width container queries:

```html
<div class="@container">
  <div class="@max-[17.5rem]:underline">
    <!-- This text will be underlined when the container is smaller than `17.5rem` -->
  </div>
</div>
```

### Removing a container

To stop an element from acting as a container, use the `@container-normal` class.

<div class="@container xl:@container-normal">
  <!-- ... -->
</div>

### With a prefix

If you have configured Tailwind to use a prefix, make sure to prefix both the `@container` class and any classes where you are using a container query modifier:

```html
<div class="tw-@container">
  <!-- ... -->
  <div class="@lg:tw-underline">
    <!-- ... -->
  </div>
</div>
```

## Configuration

By default we ship with the following configured values:

| Name       | CSS                                          |
| ---------- | -------------------------------------------- |
| `@xs`      | `@container (min-width: 20rem /* 320px */)`  |
| `@sm`      | `@container (min-width: 24rem /* 384px */)`  |
| `@md`      | `@container (min-width: 28rem /* 448px */)`  |
| `@lg`      | `@container (min-width: 32rem /* 512px */)`  |
| `@xl`      | `@container (min-width: 36rem /* 576px */)`  |
| `@2xl`     | `@container (min-width: 42rem /* 672px */)`  |
| `@3xl`     | `@container (min-width: 48rem /* 768px */)`  |
| `@4xl`     | `@container (min-width: 56rem /* 896px */)`  |
| `@5xl`     | `@container (min-width: 64rem /* 1024px */)` |
| `@6xl`     | `@container (min-width: 72rem /* 1152px */)` |
| `@7xl`     | `@container (min-width: 80rem /* 1280px */)` |
| `@max-xs`  | `@container (max-width: 20rem /* 320px */)`  |
| `@max-sm`  | `@container (max-width: 24rem /* 384px */)`  |
| `@max-md`  | `@container (max-width: 28rem /* 448px */)`  |
| `@max-lg`  | `@container (max-width: 32rem /* 512px */)`  |
| `@max-xl`  | `@container (max-width: 36rem /* 576px */)`  |
| `@max-2xl` | `@container (max-width: 42rem /* 672px */)`  |
| `@max-3xl` | `@container (max-width: 48rem /* 768px */)`  |
| `@max-4xl` | `@container (max-width: 56rem /* 896px */)`  |
| `@max-5xl` | `@container (max-width: 64rem /* 1024px */)` |
| `@max-6xl` | `@container (max-width: 72rem /* 1152px */)` |
| `@max-7xl` | `@container (max-width: 80rem /* 1280px */)` |

You can configure which values are available for this plugin under the `containers` key in your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      containers: {
        '2xs': '16rem',
      },
    },
  },
}
```
