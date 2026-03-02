import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateTagSvg } from "@/lib/svg"
import { Download } from "lucide-react"
import QRCode from "qrcode"

type SvgCardProps = {
  name: string
  email: string
  phone: string
  whatsapp: string
  country: string
  generatedUrl: string
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function SvgCard({ name, email, phone, whatsapp, country, generatedUrl }: SvgCardProps) {
  const [qrDataUrl, setQrDataUrl] = React.useState("")

  React.useEffect(() => {
    let canceled = false

    QRCode.toDataURL(generatedUrl, {
      margin: 0,
      width: 512,
      errorCorrectionLevel: "M",
    })
      .then((dataUrl) => {
        if (!canceled) setQrDataUrl(dataUrl)
      })
      .catch(() => {
        if (!canceled) setQrDataUrl("")
      })

    return () => {
      canceled = true
    }
  }, [generatedUrl])

  const svg = React.useMemo(
    () =>
      generateTagSvg({
        name,
        email,
        phone,
        whatsapp,
        country,
        url: generatedUrl,
        qrDataUrl,
      }),
    [name, email, phone, whatsapp, country, generatedUrl, qrDataUrl]
  )

  function downloadSvg() {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    const baseName = toSlug(name || "taggy") || "taggy"
    a.href = objectUrl
    a.download = `${baseName}.svg`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>SVG Generator</CardTitle>
        <CardDescription>Two-sided tag: QR front and contact lines back.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-md border bg-background p-3">
          <div
            className="h-48 w-full rounded bg-white"
            aria-label="SVG preview"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
        <Button className="w-full" onClick={downloadSvg}>
          <Download className="mr-2 h-4 w-4" />
          Download SVG
        </Button>
      </CardContent>
    </Card>
  )
}
