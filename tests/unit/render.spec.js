import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/Home'
import Symbols from '@/views/Symbols'

describe('HomeView.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = `The exciting Vue Stuff can he found 
              (here)`
    const wrapper = shallowMount(HomeView, {
      stubs: ['router-link']
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Symbols.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = `Symbols/ Tickers       
           Filter Logic  Symbol
                  Open
                  Close
                  Primary Exchange
                 Ascending Descending Remove Sort`
    const wrapper = shallowMount(Symbols, {
      stubs: ['router-link', 'loading']
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
