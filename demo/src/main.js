import Vue from 'vue'
import { Keyrune } from "@saeris/vue-keyrune"
import { Mana, symbols, icons, sizes } from "@saeris/vue-mana"
import { State } from './state'
import { Modal } from './modal'
import { Radio } from './radio'
import {
  Main,
  Header,
  Title,
  Subtitle,
  Package,
  Code,
  Section,
  Controls,
  Search,
  GroupTitle,
  Group,
  Setlist,
  SetlistItem,
  IconWrapper,
  Icon,
  IconDetails,
  IconName,
  IconCode,
  Preview,
  Row,
  Toggleables,
  Toggle,
  LoyaltyButton,
  RadioInput,
  CloseButton,
  Footer
} from './elements'
import '../public/fonts/index.scss'
import './registerServiceWorker'
import 'mana-font'
import 'keyrune'

Vue.config.productionTip = false

const isManaGroup = name =>
  [`Basic Mana`, `Phyrexian Mana`, `Hybrid Mana`, `Generic Mana`].includes(name)
const isMana = name =>
  [
    ...Object.keys(symbols[`Basic Mana`]),
    ...Object.keys(symbols[`Phyrexian Mana`]),
    ...Object.keys(symbols[`Hybrid Mana`]),
    ...Object.keys(symbols[`Generic Mana`])
  ].includes(name)
const isHybrid = name => Object.keys(symbols[`Hybrid Mana`]).includes(name)

const App = {
  functional: true,
  render(h) {
    return (
      <State
        initial={{
          filter: ``,
          modal: {
            activeIcon: null,
            size: `Normal`,
            loyaltyValue: 0,
            loyalty: false,
            fixed: false,
            cost: false,
            shadow: false,
            half: false
          }
        }}
      >
        {({ state, update, reset }) => {
          const {
            activeIcon,
            size,
            loyaltyValue,
            loyalty,
            fixed,
            cost,
            shadow,
            half
          } = state.modal
          return (
            <Main>
              <Header>
                <div>
                  <Title>
                    <a
                      href="https://www.github.com/saeris/vue-mana"
                      title="Vue Mana on GitHub"
                      target="_blank"
                      rel="noopener"
                    >
                      <Mana fixed symbol="g" />
                      Vue Mana
                    </a>
                  </Title>
                </div>
              </Header>
              <Package>
                <Code>{`yarn add @saeris/vue-mana mana-font`}</Code>
                <Code>{`import { Mana } from "@saeris/vue-mana"`}</Code>
              </Package>

              <Modal>
                {({
                  isOpen,
                  handleToggle,
                  ToggleModal,
                  ModalOverlay,
                  ModalContent
                }) => {
                  const Close = CloseButton(ToggleModal)
                  return (
                    <Section>
                      <Controls>
                        <Subtitle>Symbols:</Subtitle>
                        <Search
                          type="text"
                          placeholder="Search Symbols..."
                          value={state.filter}
                          onInput={e => {
                            e.preventDefault()
                            update({ filter: e.target.value })
                          }}
                        />
                      </Controls>
                      {Object.entries(symbols).map(
                        ([groupName, groupSymbols]) =>
                          (Object.entries(groupSymbols).filter(
                            ([symbol, name]) =>
                              (state.filter
                                ? `${name} ${symbol}`
                                  .toLowerCase()
                                  .includes(state.filter.toLowerCase())
                                : true)
                          ).length
                            ? (
                              <Group>
                                <GroupTitle>{groupName}:</GroupTitle>
                                <Setlist>
                                  {Object.entries(groupSymbols)
                                    .filter(
                                      ([symbol, name]) =>
                                        (state.filter
                                          ? `${name} ${symbol}`
                                            .toLowerCase()
                                            .includes(
                                              state.filter.toLowerCase()
                                            )
                                          : true)
                                    ).map(([symbol, name], i) => (
                                      <SetlistItem key={symbol}>
                                        <ToggleModal
                                          id={symbol}
                                          onClick={e => {
                                            update(({ modal }) => ({ modal: { ...modal, activeIcon: symbol } }))
                                          }}
                                        >
                                          <IconWrapper>
                                            <Icon>
                                              <Mana
                                                fixed
                                                symbol={symbol}
                                                cost={isManaGroup(groupName)}
                                                shadow={isManaGroup(groupName)}
                                                loyalty={groupName === `Loyalty Symbols` && [1, 2, 0, 3][i]}
                                                size={
                                                  symbol === `1000000`
                                                    ? null
                                                    : symbol === `100`
                                                      ? `3x`
                                                      : `4x`
                                                }
                                              />
                                            </Icon>
                                            <IconDetails>
                                              <IconName>{name}</IconName>
                                              <IconCode>({symbol})</IconCode>
                                            </IconDetails>
                                          </IconWrapper>
                                        </ToggleModal>
                                      </SetlistItem>
                                    ))}
                                </Setlist>
                              </Group>
                            ) : null)
                      )}
                      <ModalOverlay>
                        {isOpen ? (
                          <ModalContent>
                            <h3>
                              <span>{icons[activeIcon]}</span>
                              <span>{`(${activeIcon})`}</span>
                            </h3>
                            <Row>
                              <Preview
                                fixed
                                symbol={activeIcon}
                                cost={
                                  Object.keys(symbols[`Hybrid Mana`]).includes(activeIcon) || cost
                                }
                                shadow={shadow}
                                half={half}
                                loyalty={
                                  Object.keys(symbols[`Loyalty Symbols`]).includes(activeIcon) && loyalty
                                    ? loyaltyValue
                                    : null
                                }
                                size={
                                  activeIcon === `1000000`
                                    ? null
                                    : activeIcon === `100`
                                      ? `3x`
                                      : `4x`
                                }
                              />
                            </Row>
                            <Row>
                              <strong>JSX:</strong>
                              <code>
                                {`<Mana symbol="${activeIcon}" ${
                                  size === `Normal` ? `` : `size="${size}" `
                                }${!shadow && !half && cost ? `cost ` : ``}${
                                  shadow ? `shadow ` : ``
                                }${half ? `half ` : ``}${
                                  fixed ? `fixed ` : ``
                                }${
                                  Object.keys(symbols[`Loyalty Symbols`]).includes(activeIcon) && loyalty
                                    ? `loyalty={${loyaltyValue}}`
                                    : ``
                                }/>`}
                              </code>
                            </Row>
                            <Radio
                              name="size"
                              selected={size}
                              onChange={value => {
                                update(({ modal }) => ({
                                  modal: { ...modal, size: value }
                                }))
                              }}
                            >
                              {[`Normal`, ...sizes].map(value => (
                                <RadioInput key={value} value={value} />
                              ))}
                            </Radio>
                            <Toggleables>
                              {!isHybrid(activeIcon) && isMana(activeIcon) ? (
                                <Toggle
                                  checked={half || shadow || cost}
                                  disabled={half || shadow}
                                  onChange={e => {
                                    update(({ modal }) => ({ modal: { ...modal, cost: !cost } }))
                                  }}
                                >
                                  Cost
                                </Toggle>
                              ) : null}
                              {isMana(activeIcon) ? (
                                <Toggle
                                  checked={shadow}
                                  onChange={e => {
                                    update(({ modal }) => ({ modal: { ...modal, shadow: !shadow } }))
                                  }}
                                >
                                  Shadow
                                </Toggle>
                              ) : null}
                              {[`w`, `u`, `b`, `r`, `g`].includes(activeIcon) ? (
                                <Toggle
                                  checked={half}
                                  onChange={e => {
                                    update(({ modal }) => ({ modal: { ...modal, half: !half } }))
                                  }}
                                >
                                  Half
                                </Toggle>
                              ) : null}
                              <Toggle
                                checked={fixed}
                                onChange={e => {
                                  update(({ modal }) => ({ modal: { ...modal, fixed: !fixed } }))
                                }}
                              >
                                Fixed
                              </Toggle>
                            </Toggleables>
                            {Object.keys(symbols[`Loyalty Symbols`]).includes(activeIcon) ? (
                              <Row>
                                <LoyaltyButton
                                  onClick={e => {
                                    update(({ modal }) => ({ modal: { ...modal, loyalty: !loyalty } }))
                                  }}
                                >
                                  <Mana
                                    fixed
                                    symbol="loyalty-start"
                                    loyalty={loyalty ? loyaltyValue : null}
                                    size="3x"
                                  />
                                  Toggle Loyalty
                                </LoyaltyButton>
                                <LoyaltyButton
                                  disabled={!loyalty || loyaltyValue === 20}
                                  onClick={e => {
                                    update(({ modal }) => ({ modal: { ...modal, loyaltyValue: loyaltyValue + 1 } }))
                                  }}
                                >
                                  <Mana
                                    fixed
                                    symbol="loyalty-up"
                                    loyalty={1}
                                    size="3x"
                                  />
                                  Increase Loyalty
                                </LoyaltyButton>
                                <LoyaltyButton
                                  disabled={!loyalty || loyaltyValue === 0}
                                  onClick={e => {
                                    update(({ modal }) => ({ modal: { ...modal, loyaltyValue: 0 } }))
                                  }}
                                >
                                  <Mana
                                    fixed
                                    symbol="loyalty-zero"
                                    loyalty={0}
                                    size="3x"
                                  />
                                  Reset Loyalty
                                </LoyaltyButton>
                                <LoyaltyButton
                                  disabled={!loyalty || loyaltyValue === 0}
                                  onClick={e => {
                                    update(({ modal }) => ({ modal: { ...modal, loyaltyValue: loyaltyValue - 1 } }))
                                  }}
                                >
                                  <Mana
                                    fixed
                                    symbol="loyalty-down"
                                    loyalty={1}
                                    size="3x"
                                  />
                                  Decrease Loyalty
                                </LoyaltyButton>
                              </Row>
                            ) : null}
                            <Close onClick={reset}>
                              <Keyrune title="Close Modal" fixed set="10e" />
                            </Close>
                          </ModalContent>
                        ) : null}
                      </ModalOverlay>
                    </Section>
                  )
                }}
              </Modal>
              <Footer>
                <div>
                  <span>
                    <a
                      href="https://www.github.com/saeris/vue-mana"
                      title="GitHub Repository"
                      target="_blank"
                      rel="noopener"
                    >
                      GitHub
                    </a>
                  </span>
                  <span>
                    {`Coded with 💚 by `}
                    <a
                      href="https://www.github.com/saeris"
                      title="Drake Costa (@Saeris) on GitHub"
                      target="_blank"
                      rel="noopener"
                    >
                      Drake Costa
                    </a>
                  </span>
                </div>
              </Footer>
            </Main>
          )
        }}
      </State>
    )
  }
}

new Vue({ render: h => h(App) }).$mount(`#app`)
