import { ProfileCard } from "./components/ProfileCard"

export function App() {
  const urlParams = new URLSearchParams(window.location.search)

  // Helper: short key → long key → default
  const getParam = (shortKey: string, longKey: string, def: string = "") =>
    urlParams.get(shortKey) ??
    urlParams.get(longKey) ??
    def

  const name = getParam("n", "name", "Anonymous")
  const email = getParam("e", "email", "")
  const phone = getParam("p", "phone", "")
  const whatsapp =
    getParam("w", "whatsapp", "") || phone

  const countryRaw = getParam("c", "country", "")

  // 🌍 Expand country code → full name
  const expandCountry = (code: string) => {
    if (!code) return ""
    try {
      const regionNames = new Intl.DisplayNames(
        [navigator.language || "en"],
        { type: "region" }
      )
      return regionNames.of(code.toUpperCase()) || code
    } catch {
      return code
    }
  }

  const country = expandCountry(countryRaw)

  const message = getParam(
    "m",
    "message",
    "Thanks for finding my luggage! Please contact me below so we can arrange its return."
  )

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ProfileCard
          name={name}
          email={email}
          phone={phone}
          whatsapp={whatsapp}
          country={country}
          message={message}
        />
      </div>
    </div>
  )
}

export default App