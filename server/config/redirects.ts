// QR code redirect mappings
// Key: short code used in /go/<code> URLs (printed on QR codes)
// Value: destination URL to redirect to
//
// To change where a QR code points, update the value and redeploy.
// The printed QR codes never need reprinting.
export const redirects: Record<string, string> = {
  'special': '/me/offers/3m-free',
}
