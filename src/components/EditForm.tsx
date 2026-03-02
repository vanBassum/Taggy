import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink } from "lucide-react"

type EditFormProps = {
  name: string
  email: string
  phone: string
  whatsapp: string
  country: string
  message: string
  generated: string
  copied: boolean
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onWhatsappChange: (value: string) => void
  onCountryChange: (value: string) => void
  onMessageChange: (value: string) => void
  onCopy: () => void
}

export function EditForm({
  name,
  email,
  phone,
  whatsapp,
  country,
  message,
  generated,
  copied,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onWhatsappChange,
  onCountryChange,
  onMessageChange,
  onCopy,
}: EditFormProps) {
  return (
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
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="e.g., john@doe.com"
          />
        </div>

        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="e.g., +1234567890"
          />
        </div>

        <div className="grid gap-2">
          <Label>WhatsApp (optional)</Label>
          <Input
            value={whatsapp}
            onChange={(e) => onWhatsappChange(e.target.value)}
            placeholder="Leave empty to use Phone number"
          />
        </div>

        <div className="grid gap-2">
          <Label>Country (code)</Label>
          <Input
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            placeholder="e.g., US"
          />
        </div>

        <div className="grid gap-2">
          <Label>Message</Label>
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="e.g., Hello, this is a sample message."
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="rounded-md border bg-background p-3">
            <p className="break-all font-mono text-xs">{generated}</p>
          </div>

          <div className="flex gap-2">
            <Button className="w-full" onClick={onCopy}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <a href={generated} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}