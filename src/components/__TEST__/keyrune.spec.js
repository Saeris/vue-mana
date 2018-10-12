import { mount } from '@vue/test-utils'
import { Mana } from '../mana.js'

describe(`Mana`, () => {
  describe(`valid`, () => {
    it(`renders an i element`, () => {
      const container = mount(Mana)
      expect(container.contains(`i`)).toBe(true)
    })

    it(`has the 'ms' class`, () => {
      const container = mount(Mana)
      expect(container.classes()).toContain(`ms`)
    })

    it(`has the 'ms-w' class when the 'symbol' prop is set to 'w'`, () => {
      const container = mount(Mana, { context: { props: { symbol: `w` } } })
      expect(container.classes()).toContain(`ms-w`)
    })

    it(`has the 'ms-fw' class when the 'fixed' prop is set to true`, () => {
      const container = mount(Mana, { context: { props: { fixed: true } } })
      expect(container.classes()).toContain(`ms-fw`)
    })

    it(`has the 'ms-cost' class when the 'cost' prop is set to true`, () => {
      const container = mount(Mana, { context: { props: { cost: true } } })
      expect(container.classes()).toContain(`ms-cost`)
    })

    it(`has the 'ms-cost' and '.ms-shadow' classes when the 'shadow' prop is set to true`, () => {
      const container = mount(Mana, { context: { props: { shadow: true } } })
      expect(container.classes()).toContain(`ms-cost`)
      expect(container.classes()).toContain(`ms-shadow`)
    })

    it(`has a 'ms-[2-6]x' class when the 'size' prop has a valid size value`, () => {
      [`2x`, `3x`, `4x`, `5x`, `6x`].forEach(size => {
        const container = mount(Mana, { context: { props: { size } } })
        expect(container.classes()).toContain(`ms-${size}`)
      })
    })

    it(`has the 'ms-loyalty' class when the 'loyalty' prop has a numerical value between 0 and 20`, () => {
      for (let i = 0; i <= 20; i++) {
        const container = mount(Mana, { context: { props: { symbol: `loyalty-up`, loyalty: i } } })
        expect(container.classes()).toContain(`ms-loyalty-${i}`)
      }
    })

    it(`includes a custom class when passed in via the 'className' prop`, () => {
      const container = mount(Mana, { context: { class: `custom` } })
      expect(container.classes()).toContain(`custom`)
    })
  })

  describe(`invalid`, () => {
    it(`does not have additional classes when passed an invalid 'symbol' prop`, () => {
      const container = mount(Mana, { context: { props: { symbol: `INVALID SYMBOL` } } })
      expect(container.classes()).toHaveLength(1)
    })

    it(`does not have additional classes when the 'size' prop has a invalid size value`, () => {
      const container = mount(Mana, { context: { props: { size: `INVALID SIZE` } } })
      expect(container.classes()).toHaveLength(1)
    })

    it(`does not have a 'ms-loyalty-[0-9]+' class when the 'loyalty' prop has a numerical value outside of 0 and 20`, () => {
      [-1, 21, NaN, Infinity].forEach(loyalty => { // eslint-disable-line
        const container = mount(Mana, { context: { props: { symbol: `loyalty-up`, loyalty } } })
        expect(container.classes().some(c => (/ms-loyalty-.[0-9]+/).test(c))).toBeFalsy()
      })
    })
  })
})
