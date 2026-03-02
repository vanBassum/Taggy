import * as React from "react"
import { ProfileCard } from "@/components/ProfileCard"
import { EditForm } from "@/components/EditForm"
import { SvgCard } from "@/components/SvgCard"
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
        <EditForm
          name={name}
          email={email}
          phone={phone}
          whatsapp={whatsapp}
          country={country}
          message={message}
          generated={generated}
          copied={copied}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onWhatsappChange={setWhatsapp}
          onCountryChange={setCountry}
          onMessageChange={setMessage}
          onCopy={copy}
        />

        {/* RIGHT: LIVE PREVIEW */}
        <div className="flex flex-col items-center gap-6">
          <ProfileCard
            name={name || "Anonymous"}
            email={email}
            phone={phone}
            whatsapp={whatsapp || phone}
            country={country}
            message={message}
          />
          <SvgCard
            name={name}
            email={email}
            phone={phone}
            whatsapp={whatsapp}
            country={country}
            generatedUrl={generated}
          />
        </div>
      </div>
    </div>
  )
}