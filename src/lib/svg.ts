export type SvgTagData = {
  name: string
  url: string
  phone?: string
  email?: string
  whatsapp?: string
  country?: string
  qrDataUrl?: string
}

function safeText(value: string, max = 64) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max)
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

const TAG_PATH = "M6 0 H54 C57.3 0 60 2.7 60 6 V28 C60 31.9 56.9 35 53 35 H7 C3.1 35 0 31.9 0 28 V6 C0 2.7 2.7 0 6 0 Z"

export function generateTagSvg({ name, url, phone, email, whatsapp, country, qrDataUrl }: SvgTagData) {
  const title = escapeXml(safeText(name || "Taggy", 28))
  const phoneVal = escapeXml(safeText(phone || "", 28))
  const emailVal = escapeXml(safeText(email || "", 28))
  const waVal = escapeXml(safeText(whatsapp || "", 28))
  const countryVal = escapeXml(safeText(country || "", 28))
  const urlVal = escapeXml(safeText(url, 80))

  const rows = [
    { label: "Name", value: title || "-" },
    { label: "Phone", value: phoneVal || "-" },
    { label: "Email", value: emailVal || "-" },
    { label: "WhatsApp", value: waVal || "-" },
    { label: "Country", value: countryVal || "-" },
  ]

  const backRows = rows
    .map((row, idx) => {
      const y = 8 + idx * 5
      return [
        `<text x="72" y="${y - 0.8}" font-family="Arial, Helvetica, sans-serif" font-size="2" fill="#333">${row.label}</text>`,
        `<line x1="82" y1="${y}" x2="124" y2="${y}" stroke="#222" stroke-width="0.35" />`,
        `<text x="83" y="${y - 0.8}" font-family="Arial, Helvetica, sans-serif" font-size="1.9" fill="#111">${row.value}</text>`,
      ].join("\n")
    })
    .join("\n")

  const qrImage = qrDataUrl
    ? `<image href="${qrDataUrl}" x="16" y="9" width="28" height="28" preserveAspectRatio="none" />`
    : `<rect x="16" y="9" width="28" height="28" fill="#e5e7eb" stroke="#111" stroke-width="0.4" />`

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128mm" height="35mm" viewBox="0 0 128 35">
  <defs>
    <clipPath id="front-clip">
      <path d="${TAG_PATH}" />
    </clipPath>
    <clipPath id="back-clip">
      <path d="${TAG_PATH}" transform="translate(68 0)" />
    </clipPath>
  </defs>

  <!-- Front side (QR) -->
  <path d="${TAG_PATH}" fill="white" stroke="black" stroke-width="0.6" />
  <circle cx="30" cy="4.5" r="1.6" fill="none" stroke="black" stroke-width="0.45" />
  <g clip-path="url(#front-clip)">
    ${qrImage}
  </g>
  <text x="30" y="32" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="2.2" fill="#111">Scan for contact details</text>

  <!-- Back side (contact lines) -->
  <path d="${TAG_PATH}" transform="translate(68 0)" fill="white" stroke="black" stroke-width="0.6" />
  <circle cx="98" cy="4.5" r="1.6" fill="none" stroke="black" stroke-width="0.45" />
  <g clip-path="url(#back-clip)">
    ${backRows}
    <text x="72" y="32" font-family="Arial, Helvetica, sans-serif" font-size="1.8" fill="#333">URL</text>
    <text x="82" y="32" font-family="Arial, Helvetica, sans-serif" font-size="1.8" fill="#111">${urlVal}</text>
  </g>
</svg>`
}
