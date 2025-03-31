export function desencriptCurrency( maskedValue: string ): number {
  let numericValue = maskedValue.replace( 'R$ ', '' ).replace( /\./g, '' );
  numericValue = numericValue.split(',')[0];
  return parseFloat( numericValue );
}