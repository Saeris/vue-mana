import { symbols } from "./symbols"

export const sizes = [`2x`, `3x`, `4x`, `5x`, `6x`]

export const icons = Object.values(symbols).reduce((hash, group) => ({ ...hash, ...group }), {})

export const Mana = {
  functional: true,
  props: {
    symbol: { type: String, default: `` },
    size: { type: String, default: `` },
    cost: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    half: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    loyalty: { type: [Number, Boolean], default: false }
  },
  render(h, { props, data }) {
    const { symbol, size, cost, shadow, half, fixed, loyalty, ...rest } = props
    const classNames = data.class || {}
    return (
      <i
        title={icons[symbol]}
        alt={icons[symbol]}
        aria-hidden
        {...data}
        class={{
          ...classNames,
          "ms": true,
          [`ms-${symbol}`]: Object.keys(icons).includes(symbol),
          [`ms-${size}`]: sizes.includes(size),
          "ms-cost": half || shadow || cost,
          "ms-shadow": shadow,
          "ms-half": half,
          "ms-fw": fixed,
          [`ms-loyalty-${parseInt(loyalty, 10)}`]:
            Object.keys(symbols[`Loyalty Symbols`]).includes(symbol) &&
            typeof loyalty === `number` &&
            loyalty >= 0 &&
            loyalty <= 20
        }}
        {...rest}
      />
    )
  }
}
