
export const DOMAIN = ""
export function sha512(str) {
  return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
  });
}
export async function makeApiRequest(method, uri, payload) {
  const result = {}
  const _result = await fetch(uri, {
  method: method,
  body: JSON.stringify(payload),
  headers: {"Content-Type": "application/json"}
})
  .then(response => {
    result.status =   response.status
    return response.json()}
  )
  .then(data => {
    return data
  })
  if (_result) {
    result.data = _result
  }
  return result
}

