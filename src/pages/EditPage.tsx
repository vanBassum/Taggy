import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink } from "lucide-react"
import { ProfileCard } from "@/components/ProfileCard"
import { BASE_PATH } from "@/config"; // Import BASE_PATH

function buildUrl(params: Record<string, string>) {
  const qs = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    const val = v.trim()
    if (val) qs.set(k, val)
  }

  const base = `${window.location.origin}${BASE_PATH}`; // Use BASE_PATH
  const q = qs.toString()
  return q ? `${base}?${q}` : base
}

export default function EditPage() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [whatsapp, setWhatsapp] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [message, setMessage] = React.useState("")

  const generated = React.useMemo(
    () =>
      buildUrl({
        n: name,
        e: email,
        p: phone,
        w: whatsapp,
        c: country,
        m: message,
      }),
    [name, email, phone, whatsapp, country, message]
  )

  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(generated)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      window.prompt("Copy this URL:", generated)
    }
  }

  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
        
        {/* LEFT: FORM */}
        <Card>
          <CardHeader>
            <CardTitle>DogTag Link Generator</CardTitle>
            <CardDescription>
              Fill in your details and see the result live.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., john@doe.com"
              />
            </div>

            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., +1234567890"
              />
            </div>

            <div className="grid gap-2">
              <Label>WhatsApp (optional)</Label>
              <Input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Leave empty to use Phone number"
              />
            </div>

            <div className="grid gap-2">
              <Label>Country (code)</Label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g., US"
              />
            </div>

            <div className="grid gap-2">
              <Label>Message</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Hello, this is a sample message."
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="rounded-md border bg-background p-3">
                <p className="break-all font-mono text-xs">{generated}</p>
              </div>

              <div className="flex gap-2">
                <Button className="w-full" onClick={copy}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied" : "Copy"}
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <a href={generated} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="flex items-start justify-center">
          <ProfileCard
            name={name || "Anonymous"}
            email={email}
            phone={phone}
            whatsapp={whatsapp || phone}
            country={country}
            message={message}
          />
        </div>
      </div>
    </div>
  )
}