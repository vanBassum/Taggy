import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle, MapPin, ChevronRight } from "lucide-react"

// Default messages
const DEFAULT_PROFILE_MESSAGE = "Thanks for finding this item! Please contact me below so we can arrange its return."
const DEFAULT_WHATSAPP_MESSAGE = "Hi, I found your luggage."

export type ProfileCardProps = {
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  country?: string
  className?: string
  message?: string
}

function normalizePhoneForTel(input: string) {
  const trimmed = input.trim()
  const hasPlus = trimmed.startsWith("+")
  const digits = trimmed.replace(/[^\d]/g, "")
  return hasPlus ? `+${digits}` : digits
}

function normalizePhoneForWa(input: string) {
  return input.replace(/[^\d]/g, "")
}

function ActionRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <Button
      variant="outline"
      className="h-auto w-full justify-start gap-3 px-3 py-3"
      asChild
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        <span className="grid h-9 w-9 place-items-center rounded-md border bg-background text-muted-foreground">
          {icon}
        </span>

        <span className="min-w-0 flex-1 text-left">
          <span className="block text-xs text-muted-foreground">{label}</span>
          <span className="block truncate text-sm font-medium">{value}</span>
        </span>

        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </a>
    </Button>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-md border bg-muted/30 px-3 py-3">
      <span className="grid h-9 w-9 place-items-center rounded-md border bg-background text-muted-foreground">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
    </div>
  )
}

export function ProfileCard({
  name,
  email,
  phone,
  whatsapp,
  country,
  className,
  message,
}: ProfileCardProps) {
  const emailVal = email?.trim()
  const phoneVal = phone?.trim()
  const waVal = whatsapp?.trim()
  const countryVal = country?.trim()
  const messageVal = message?.trim() || DEFAULT_PROFILE_MESSAGE // Use default if empty

  return (
    <Card className={["w-full max-w-sm", className].filter(Boolean).join(" ")}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <h3 className="mt-2 text-xl font-semibold">{name}</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{messageVal}</p>
        </div>

        <div className="mt-6 space-y-2">
          {emailVal ? (
            <ActionRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={emailVal}
              href={`mailto:${emailVal}`}
            />
          ) : null}

          {phoneVal ? (
            <ActionRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={phoneVal}
              href={`tel:${normalizePhoneForTel(phoneVal)}`}
            />
          ) : null}

          {waVal ? (
            <ActionRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              value="Message me"
              href={`https://wa.me/${normalizePhoneForWa(waVal)}?text=${encodeURIComponent(
                DEFAULT_WHATSAPP_MESSAGE // Use default WhatsApp message
              )}`}
              external
            />
          ) : null}

          {countryVal ? (
            <InfoRow
              icon={<MapPin className="h-4 w-4" />}
              label="Country"
              value={countryVal}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}