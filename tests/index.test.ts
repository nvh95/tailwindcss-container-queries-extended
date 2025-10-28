import { expect } from '@jest/globals'
import { html, css, run } from './run'

it('container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div
            class="@container @container-normal @container/sidebar @container-normal/sidebar @container-[size] @container-[size]/sidebar"
          >
            <div class="@md:underline"></div>
            <div class="@md/container1:underline"></div>
            <div class="@md/container2:underline"></div>
            <div class="@md/container10:underline"></div>

            <div class="@sm:underline"></div>
            <div class="@sm/container1:underline"></div>
            <div class="@sm/container2:underline"></div>
            <div class="@sm/container10:underline"></div>

            <div class="@lg:underline"></div>
            <div class="@lg/container1:underline"></div>
            <div class="@lg/container2:underline"></div>
            <div class="@lg/container10:underline"></div>
            <div class="@[1024px]:underline"></div>
            <div class="@[1024px]/container1:underline"></div>
            <div class="@[1024]/container1:underline"></div>

            <div class="@[312px]:underline"></div>
            <div class="@[200rem]:underline"></div>
            <div class="@[123px]:underline"></div>
          </div>
        `,
      },
    ],
    theme: {
      containers: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
      },
    },
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .\@container {
        container-type: inline-size;
      }

      .\@container-\[size\] {
        container-type: size;
      }

      .\@container-\[size\]\/sidebar {
        container: sidebar / size;
      }

      .\@container-normal {
        container-type: normal;
      }

      .\@container-normal\/sidebar {
        container: sidebar;
      }

      .\@container\/sidebar {
        container: sidebar / inline-size;
      }

      @container (width >= 123px) {
        .\@\[123px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 200rem) {
        .\@\[200rem\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 312px) {
        .\@\[312px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width >= 320px) {
        .\@sm\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width >= 320px) {
        .\@sm\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width >= 320px) {
        .\@sm\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 320px) {
        .\@sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width >= 768px) {
        .\@md\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width >= 768px) {
        .\@md\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width >= 768px) {
        .\@md\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 768px) {
        .\@md\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width >= 1024px) {
        .\@lg\/container1\:underline,
        .\@\[1024px\]\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width >= 1024px) {
        .\@lg\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width >= 1024px) {
        .\@lg\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 1024px) {
        .\@lg\:underline,
        .\@\[1024px\]\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('should be possible to use default container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div>
            <div class="@md:underline"></div>
            <div class="@lg:underline"></div>
            <div class="@sm:underline"></div>
            <div class="@xs:underline"></div>
            <div class="@7xl:underline"></div>
            <div class="@6xl:underline"></div>
            <div class="@3xl:underline"></div>
            <div class="@5xl:underline"></div>
          </div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      @container (width >= 20rem) {
        .\@xs\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 24rem) {
        .\@sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 28rem) {
        .\@md\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 32rem) {
        .\@lg\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 48rem) {
        .\@3xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 64rem) {
        .\@5xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 72rem) {
        .\@6xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width >= 80rem) {
        .\@7xl\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('max-width container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div class="@container">
            <div class="@max-md:underline"></div>
            <div class="@max-md/container1:underline"></div>
            <div class="@max-md/container2:underline"></div>
            <div class="@max-md/container10:underline"></div>

            <div class="@max-sm:underline"></div>
            <div class="@max-sm/container1:underline"></div>
            <div class="@max-sm/container2:underline"></div>
            <div class="@max-sm/container10:underline"></div>

            <div class="@max-lg:underline"></div>
            <div class="@max-lg/container1:underline"></div>
            <div class="@max-lg/container2:underline"></div>
            <div class="@max-lg/container10:underline"></div>
            <div class="@max-[1024px]:underline"></div>
            <div class="@max-[1024px]/container1:underline"></div>

            <div class="@max-[312px]:underline"></div>
            <div class="@max-[200rem]:underline"></div>
            <div class="@max-[123px]:underline"></div>
          </div>
        `,
      },
    ],
    theme: {
      containers: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
      },
    },
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .\@container {
        container-type: inline-size;
      }

      @container (width <= 123px) {
        .\@max-\[123px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 200rem) {
        .\@max-\[200rem\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 312px) {
        .\@max-\[312px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width <= 320px) {
        .\@max-sm\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width <= 320px) {
        .\@max-sm\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width <= 320px) {
        .\@max-sm\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 320px) {
        .\@max-sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width <= 768px) {
        .\@max-md\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width <= 768px) {
        .\@max-md\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width <= 768px) {
        .\@max-md\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 768px) {
        .\@max-md\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (width <= 1024px) {
        .\@max-lg\/container1\:underline,
        .\@max-\[1024px\]\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (width <= 1024px) {
        .\@max-lg\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (width <= 1024px) {
        .\@max-lg\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 1024px) {
        .\@max-lg\:underline,
        .\@max-\[1024px\]\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('should be possible to use default max-width container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div>
            <div class="@max-md:underline"></div>
            <div class="@max-lg:underline"></div>
            <div class="@max-sm:underline"></div>
            <div class="@max-xs:underline"></div>
            <div class="@max-7xl:underline"></div>
            <div class="@max-6xl:underline"></div>
            <div class="@max-3xl:underline"></div>
            <div class="@max-5xl:underline"></div>
          </div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      @container (width <= 20rem) {
        .\@max-xs\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 24rem) {
        .\@max-sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 28rem) {
        .\@max-md\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 32rem) {
        .\@max-lg\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 48rem) {
        .\@max-3xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 64rem) {
        .\@max-5xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 72rem) {
        .\@max-6xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width <= 80rem) {
        .\@max-7xl\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('container query ranges with min and max', () => {
  let config = {
    content: [
      {
        raw: html`
          <div class="@container">
            <div class="@sm:@max-lg:underline"></div>
            <div class="@md:@max-xl:underline"></div>
            <div class="@sm/main:@max-lg/main:underline"></div>
          </div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .\@container {
        container-type: inline-size;
      }

      @container main (width >= 24rem) {
        @container main (width <= 32rem) {
          .\@sm\/main\:\@max-lg\/main\:underline {
            text-decoration-line: underline;
          }
        }
      }

      @container (width >= 24rem) {
        @container (width <= 32rem) {
          .\@sm\:\@max-lg\:underline {
            text-decoration-line: underline;
          }
        }
      }

      @container (width >= 28rem) {
        @container (width <= 36rem) {
          .\@md\:\@max-xl\:underline {
            text-decoration-line: underline;
          }
        }
      }
    `)
  })
})
