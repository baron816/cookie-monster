import parseCookies, {removeCookieValue} from './parseCookies';

it('returns a new string with updated values', () => {
  expect(parseCookies({
    oldCookie: 'WEB50321-A_Control&WEB49000-B_ShowModal',
    delimiter: '&',
    kvSeparator: '-'
  }, 'WEB50321-B_Redesign'))
  .toBe('WEB50321-B_Redesign&WEB49000-B_ShowModal')
});

it('handles undefined old cookies', () => {
  expect(parseCookies({
    delimiter: '&',
    kvSeparator: '-'
  }, 'WEB50321-B_Redesign'))
  .toBe('WEB50321-B_Redesign')
});

it('removes a cookie value', () => {
  expect(removeCookieValue({
    oldCookie: 'WEB50321-A_Control&WEB51824-C_ShowValueProps&WEB49000-B_ShowModal',
    delimiter: '&',
    kvSeparator: '-'
  }, 'WEB51824'))
  .toBe('WEB50321-A_Control&WEB49000-B_ShowModal')
})
