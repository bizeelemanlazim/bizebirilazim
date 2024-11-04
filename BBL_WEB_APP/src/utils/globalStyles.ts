export const twistLayoutStyle = (matches: boolean) => ({
  display: 'flex',
  flexDirection: matches ? 'row' : 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: matches ? 2 : 0,
  width: '100%',
});